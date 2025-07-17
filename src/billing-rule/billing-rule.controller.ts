import { Controller, Get, Post, Body } from '@nestjs/common';
import { BillingRuleService } from './billing-rule.service';
import { BillingRule } from 'src/entities';

@Controller('billing-rules')
export class BillingRuleController {
  constructor(private readonly billingRuleService: BillingRuleService) {}

  @Get()
  findAll(): Promise<BillingRule[]> {
    return this.billingRuleService.findAll();
  }

  @Post()
  create(@Body() body: Partial<BillingRule>): Promise<BillingRule> {
    return this.billingRuleService.create(body);
  }
}
