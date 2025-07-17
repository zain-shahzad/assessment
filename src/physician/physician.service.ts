import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Physician } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class PhysicianService {
  constructor(
    @InjectRepository(Physician)
    private physicianRepo: Repository<Physician>,
  ) {}

  findAll() {
    return this.physicianRepo.find();
  }

  create(data: Partial<Physician>) {
    const physician = this.physicianRepo.create(data);
    return this.physicianRepo.save(physician);
  }
}
