import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from 'src/entities';
import {
  CreatePatientDto,
  createPatientSchema,
  PatientListSchema,
} from './dto';
import { ResponseViewModel } from 'src/common/response-view-model';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepo: Repository<Patient>,
  ) {}

  async findAll() {
    // const patients = await this.patientRepo.find();
    const patients = [
      {
        id: 'a1b2c3d4-e5f6-7a8b-9c0d-1234567890ab',
        name: 'Alice Smith',
        dob: '1985-03-22',
        contact: '+923321234567',
      },
      {
        id: 'b2c3d4e5-f6a7-8b9c-0d1e-234567890abc',
        name: 'Bob Johnson',
        dob: '1978-11-05',
        contact: '+923001112222',
      },
      {
        id: 'c3d4e5f6-a7b8-9c0d-1e2f-34567890abcd',
        name: 'Charlie Lee',
        dob: '1995-01-30',
        contact: '+923456789012',
      },
    ];

    const result = PatientListSchema.safeParse(patients);
    if (!result.success) {
      // errors
      throw new HttpException(
        'message',
        HttpStatus.REQUESTED_RANGE_NOT_SATISFIABLE,
        // HttpStatus.BAD_GATEWAY,
        // HttpStatus.BAD_REQUEST,
      );
    }
    return result.data;
  }

  async create(data: CreatePatientDto): Promise<Patient> {
    const parsed = createPatientSchema.safeParse(data);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.format());
    }

    const patient = this.patientRepo.create(parsed.data);
    return await this.patientRepo.save(patient);
  }
  async update(id: string, data: CreatePatientDto): Promise<Patient> {
    const parsed = createPatientSchema.safeParse(data);
    if (!parsed.success) {
      throw new BadRequestException(parsed.error.message);
    }

    const existing = await this.patientRepo.findOne({ where: { id } });
    if (!existing) {
      throw new NotFoundException(`Patient with ID ${id} not found.`);
    }

    const updated = Object.assign(existing, parsed.data);
    return await this.patientRepo.save(updated);
  }

  async remove(id: string): Promise<ResponseViewModel<string>> {
    const result = await this.patientRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Patient with ID ${id} not found.`);
    }

    return {
      status: 'success',
      message: 'Patient successfully deleted',
      data: id,
    };
  }
}
