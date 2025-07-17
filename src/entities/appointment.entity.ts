import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Physician } from './physician.entity';
import { Clinic } from './clinic.entity';
import { Patient } from './patient.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Physician, physician => physician.appointments)
  physician: Physician;

  @ManyToOne(() => Patient, patient => patient.appointments)
  patient: Patient;

  @ManyToOne(() => Clinic, clinic => clinic.appointments)
  clinic: Clinic;

  @Column({ type: 'timestamp' })
  start_time: Date;

  @Column({ type: 'timestamp' })
  end_time: Date;
}

export default Appointment;