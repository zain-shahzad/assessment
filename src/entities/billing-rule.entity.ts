import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Clinic } from './clinic.entity';

@Entity()
export class BillingRule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Clinic, clinic => clinic.billingRules)
  clinic: Clinic;

  @Column({ type: 'int' })
  gap_minutes: number;

  @Column({ type: 'int' })
  min_slot_duration: number;
}

export default BillingRule;