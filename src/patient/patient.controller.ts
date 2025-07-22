import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { PatientService } from './patient.service';
import { Patient } from 'src/entities';
import { CreatePatientDto, PatientResponseDto } from './dto';
import { ResponseViewModel } from 'src/common/response-view-model';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @Get()
  AllPatients(): Promise<PatientResponseDto[]> {
    return this.patientService.findAll();
  }

  @Post()
  creatPatient(@Body() body: CreatePatientDto): Promise<Patient> {
    return this.patientService.create(body);
  }
  @Patch(':id')
  async updatePatient(
    @Param('id') id: string,
    @Body() data: CreatePatientDto,
  ): Promise<Patient> {
    return this.patientService.update(id, data);
  }

  @Delete(':id')
  removePatient(@Body('id') id: string): Promise<ResponseViewModel<string>> {
    return this.patientService.remove(id);
  }
}
