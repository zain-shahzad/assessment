import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClinicService } from './clinic.service';

@Controller('clinics')
export class ClinicController {
  constructor(private readonly clinicService: ClinicService) {}

  @Get()
  findAll() {
    return this.clinicService.findAll();
  }

  @Post()
  create(@Body() body) {
    return this.clinicService.create(body);
  }
}
