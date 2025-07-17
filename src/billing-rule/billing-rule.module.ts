import { Module } from '@nestjs/common';
import { BillingRuleService } from './billing-rule.service';
import { BillingRuleController } from './billing-rule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillingRule } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([BillingRule])],
  exports: [BillingRuleService],
  providers: [BillingRuleService],
  controllers: [BillingRuleController]
})
export class BillingRuleModule {}
