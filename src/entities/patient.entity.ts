import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ type: 'date' })
  dob: string;

  @Column()
  contact: string;

  @OneToMany(() => Appointment, appointment => appointment.patient)
  appointments: Appointment[];
}

export default Patient;