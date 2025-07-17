import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicModule } from './clinic/clinic.module';
import { AppointmentModule } from './appointment/appointment.module';
import { AvailabilityBlockModule } from './availability-block/availability-block.module';
import { BillingRuleModule } from './billing-rule/billing-rule.module';
import { PatientModule } from './patient/patient.module';
import { PatientService } from './patient/patient.service';
import { PatientController } from './patient/patient.controller';
import { PhysicianModule } from './physician/physician.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity.{ts,js}'],
      synchronize: true,
    }),
    ClinicModule,
    AppointmentModule,
    AvailabilityBlockModule,
    BillingRuleModule,
    PatientModule,
    PhysicianModule,
  ],
})
export class AppModule {}
