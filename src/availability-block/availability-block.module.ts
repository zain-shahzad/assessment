import { Module } from '@nestjs/common';
import { AvailabilityBlockService } from './availability-block.service';
import { AvailabilityBlockController } from './availability-block.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilityBlock } from 'src/entities';

@Module({
  imports: [TypeOrmModule.forFeature([AvailabilityBlock])],
    exports: [AvailabilityBlockService],
  providers: [AvailabilityBlockService],
  controllers: [AvailabilityBlockController]
})
export class AvailabilityBlockModule {}
