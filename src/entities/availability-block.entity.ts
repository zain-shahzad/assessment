import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Physician } from './physician.entity';
import { Clinic } from './clinic.entity';

@Entity()
export class AvailabilityBlock {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Physician, physician => physician.availabilityBlocks)
  physician: Physician;

  @ManyToOne(() => Clinic, clinic => clinic.availabilityBlocks)
  clinic: Clinic;

  @Column()
  day_of_week: number; // 0 (Sunday) to 6 (Saturday)

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;
}

export default AvailabilityBlock;