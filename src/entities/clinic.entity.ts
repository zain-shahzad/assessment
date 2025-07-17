import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Physician } from './physician.entity';
import { Appointment } from './appointment.entity';
import { AvailabilityBlock } from './availability-block.entity';
import { BillingRule } from './billing-rule.entity';

@Entity()
export class Clinic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @OneToMany(() => Physician, physician => physician.clinic)
  physicians: Physician[];

  @OneToMany(() => Appointment, appointment => appointment.clinic)
  appointments: Appointment[];

  @OneToMany(() => AvailabilityBlock, ab => ab.clinic)
  availabilityBlocks: AvailabilityBlock[];

  @OneToMany(() => BillingRule, rule => rule.clinic)
  billingRules: BillingRule[];
}

export default Clinic;