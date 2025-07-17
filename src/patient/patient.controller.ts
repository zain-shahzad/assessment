import { Controller, Get, Post, Body } from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from 'src/entities';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  findAll(): Promise<Patient[]> {
    return this.patientService.findAll();
  }

  @Post()
  create(@Body() body: Partial<Patient>): Promise<Patient> {
    return this.patientService.create(body);
  }
}
