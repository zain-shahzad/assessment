import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AvailabilityBlock } from 'src/entities';

@Injectable()
export class AvailabilityBlockService {
  constructor(
    @InjectRepository(AvailabilityBlock)
    private readonly abRepo: Repository<AvailabilityBlock>,
  ) {}

  findAll() {
    return this.abRepo.find();
  }

  create(data: Partial<AvailabilityBlock>) {
    const ab = this.abRepo.create(data);
    return this.abRepo.save(ab);
  }
}
