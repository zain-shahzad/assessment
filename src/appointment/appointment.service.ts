import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Appointment, AvailabilityBlock, BillingRule } from 'src/entities';
import { RecommendAppointmentDto } from './dto';
import dayjs from 'dayjs';
import {
  addMinutes,
  isAfter,
  isBefore,
  isSameOrBefore,
} from 'src/helpers/functions';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepo: Repository<Appointment>,
    @InjectRepository(AvailabilityBlock)
    private readonly availabilityBlockRepo: Repository<AvailabilityBlock>,
    @InjectRepository(BillingRule)
    private readonly billingRuleRepo: Repository<BillingRule>,
  ) {}

  findAll(): Promise<Appointment[]> {
    return this.appointmentRepo.find();
  }

  create(data: Partial<Appointment>): Promise<Appointment> {
    const appt = this.appointmentRepo.create(data);
    return this.appointmentRepo.save(appt);
  }

  async recommendSlots(
    dto: RecommendAppointmentDto,
  ): Promise<{ status: string; recommendedSlots: string[] }> {
    const { physicianId, clinicId, preferredDate, durationMinutes } = dto;

    const availability: AvailabilityBlock[] =
      await this.availabilityBlockRepo.find({
        where: {
          physician: { id: physicianId },
          clinic: { id: clinicId },
        },
      });

    const appointments: Appointment[] = await this.appointmentRepo.find({
      where: {
        physician: { id: physicianId },
        clinic: { id: clinicId },
        startTime: Between(
          `${preferredDate}T00:00:00`,
          `${preferredDate}T23:59:59`,
        ),
      },
    });

    const billingRule: BillingRule | null = await this.billingRuleRepo.findOne({
      where: { clinic: { id: clinicId } },
    });

    const availableSlots: string[] = this.calculateSlots({
      availability,
      appointments,
      billingRule,
      preferredDate,
      durationMinutes,
    });

    return {
      status: 'success',
      recommendedSlots: availableSlots.slice(0, 10),
    };
  }

  private calculateSlots({
    availability,
    appointments,
    billingRule,
    preferredDate,
    durationMinutes,
  }: {
    availability: AvailabilityBlock[];
    appointments: Appointment[];
    billingRule: BillingRule | null;
    preferredDate: string;
    durationMinutes: number;
  }): string[] {
    const dayOfWeek = dayjs(preferredDate).day();
    const slots: string[] = [];

    const appointmentIntervals = appointments.map((app) => ({
      start: dayjs(app.startTime),
      end: dayjs(app.endTime),
    }));

    availability
      .filter((av) => av.day_of_week === dayOfWeek)
      .forEach((av) => {
        let start = dayjs(`${preferredDate}T${av.startTime}`).toDate();
        const end = dayjs(`${preferredDate}T${av.endTime}`).toDate();

        while (isSameOrBefore(start, end)) {
          const proposedEnd = addMinutes(start, durationMinutes);

          const hasConflict = appointmentIntervals.some(
            (app) =>
              isBefore(start, app.end.toDate()) &&
              isAfter(proposedEnd, app.start.toDate()),
          );

          if (!hasConflict) {
            slots.push(start.toISOString());
          }

          start = addMinutes(start, billingRule?.gap_minutes || 5);
        }
      });

    return slots;
  }
}
