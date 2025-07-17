import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  exports: [AppointmentService],
  providers: [AppointmentService],
  controllers: [AppointmentController],
})
export class AppointmentModule {}
