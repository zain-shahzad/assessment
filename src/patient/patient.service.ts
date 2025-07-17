import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/entities';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  findAll() {
    return this.patientRepo.find();
  }

  create(data: Partial<Patient>) {
    const patient = this.patientRepo.create(data);
    return this.patientRepo.save(patient);
  }
}
