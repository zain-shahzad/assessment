import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Clinic } from './clinic.entity';
import { Appointment } from './appointment.entity';
import { AvailabilityBlock } from './availability-block.entity';

@Entity()
export class Physician {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  specialization: string;

  @ManyToOne(() => Clinic, clinic => clinic.physicians)
  clinic: Clinic;

  @OneToMany(() => Appointment, appointment => appointment.physician)
  appointments: Appointment[];

  @OneToMany(() => AvailabilityBlock, ab => ab.physician)
  availabilityBlocks: AvailabilityBlock[];
}

export default Physician;