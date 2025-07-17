import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from 'src/entities';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly apptRepo: Repository<Appointment>,
  ) {}

  findAll() {
    return this.apptRepo.find();
  }

  create(data: Partial<Appointment>) {
    const appt = this.apptRepo.create(data);
    return this.apptRepo.save(appt);
  }
}
