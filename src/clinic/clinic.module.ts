import { Module } from '@nestjs/common';
import { ClinicService } from './clinic.service';
import { ClinicController } from './clinic.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic])],
  providers: [ClinicService],
  controllers: [ClinicController],
  exports: [ClinicService],
})
export class ClinicModule {}
