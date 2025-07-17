import { Body, Controller, Get, Post } from '@nestjs/common';
import { Physician } from 'src/entities';
import { PhysicianService } from './physician.service';

@Controller('physicians')
export class PhysicianController {
  constructor(private readonly physicianService: PhysicianService) {}

  @Get()
  findAll() {
    return this.physicianService.findAll();
  }

  @Post()
  create(@Body() body: Partial<Physician>) {
    return this.physicianService.create(body);
  }
}
