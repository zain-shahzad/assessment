import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from 'src/entities';
import { RecommendAppointmentDto } from './dto';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  findAll(): Promise<Appointment[]> {
    return this.appointmentService.findAll();
  }

  @Post()
  create(@Body() body: Partial<Appointment>): Promise<Appointment> {
    return this.appointmentService.create(body);
  }
  @Post('recommend')
  recommend(@Body() dto: RecommendAppointmentDto) {
    return this.appointmentService.recommendSlots(dto);
  }
}
