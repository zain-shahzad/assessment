import { Controller, Get, Post, Body } from '@nestjs/common';
import { AvailabilityBlockService } from './availability-block.service';
import { AvailabilityBlock } from 'src/entities';

@Controller('availability-blocks')
export class AvailabilityBlockController {
  constructor(private readonly abService: AvailabilityBlockService) {}

  @Get()
  findAll(): Promise<AvailabilityBlock[]> {
    return this.abService.findAll();
  }

  @Post()
  create(@Body() body: Partial<AvailabilityBlock>): Promise<AvailabilityBlock> {
    return this.abService.create(body);
  }
}
