import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BillingRule } from 'src/entities';

@Injectable()
export class BillingRuleService {
  constructor(
    @InjectRepository(BillingRule)
    private readonly billingRuleRepo: Repository<BillingRule>,
  ) {}

  findAll() {
    return this.billingRuleRepo.find();
  }

  create(data: Partial<BillingRule>) {
    const rule = this.billingRuleRepo.create(data);
    return this.billingRuleRepo.save(rule);
  }
}
