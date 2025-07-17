import { Module } from '@nestjs/common';
import { PhysicianService } from './physician.service';
import { PhysicianController } from './physician.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Physician } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Physician])],
  exports: [PhysicianService],
  providers: [PhysicianService],
  controllers: [PhysicianController]
})
export class PhysicianModule {}
