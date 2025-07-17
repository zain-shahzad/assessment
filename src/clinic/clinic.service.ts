import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from '../entities/clinic.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ClinicService {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepo: Repository<Clinic>,
  ) {}

  async findAll() {
    return this.clinicRepo.find({ relations: ['physicians'] });
  }

  async create(data: Partial<Clinic>) {
    const newClinic = this.clinicRepo.create(data);
    return this.clinicRepo.save(newClinic);
  }
}
