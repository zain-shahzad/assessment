import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { Appointment } from 'src/entities';

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly apptService: AppointmentService) {}

  @Get()
  findAll(): Promise<Appointment[]> {
    return this.apptService.findAll();
  }

  @Post()
  create(@Body() body: Partial<Appointment>): Promise<Appointment> {
    return this.apptService.create(body);
  }
}
