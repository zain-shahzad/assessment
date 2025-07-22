import { DataSource } from 'typeorm';
import {
  Clinic,
  Physician,
  Patient,
  AvailabilityBlock,
  BillingRule,
  Appointment,
} from '../entities';

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'assessment',
  entities: [
    Clinic,
    Physician,
    Patient,
    AvailabilityBlock,
    BillingRule,
    Appointment,
  ],
  synchronize: true,
});

async function seed() {
  await AppDataSource.initialize();

  // Create Clinic
  const clinic = AppDataSource.manager.create(Clinic, {
    name: 'Central Clinic',
    location: 'Downtown',
  });
  await AppDataSource.manager.save(clinic);

  // Create Physicians
  const physician1 = AppDataSource.manager.create(Physician, {
    name: 'Dr. Alice Smith',
    specialization: 'Cardiology',
    clinic: clinic,
  });
  const physician2 = AppDataSource.manager.create(Physician, {
    name: 'Dr. Bob Jones',
    specialization: 'Dermatology',
    clinic: clinic,
  });
  await AppDataSource.manager.save([physician1, physician2]);

  // Create Patients
  const patient1 = AppDataSource.manager.create(Patient, {
    name: 'John Doe',
    dob: '1990-01-01',
    contact: '555-1234',
  });
  const patient2 = AppDataSource.manager.create(Patient, {
    name: 'Jane Roe',
    dob: '1985-05-15',
    contact: '555-5678',
  });
  await AppDataSource.manager.save([patient1, patient2]);

  // Create Billing Rule
  const billingRule = AppDataSource.manager.create(BillingRule, {
    clinic: clinic,
    gap_minutes: 5,
    min_slot_duration: 15,
  });
  await AppDataSource.manager.save(billingRule);

  // Create Availability Blocks
  const ab1 = AppDataSource.manager.create(AvailabilityBlock, {
    physician: physician1,
    clinic: clinic,
    day_of_week: 1, // Monday
    startTime: '09:00:00',
    endTime: '17:00:00',
  });
  const ab2 = AppDataSource.manager.create(AvailabilityBlock, {
    physician: physician2,
    clinic: clinic,
    day_of_week: 2, // Tuesday
    startTime: '10:00:00',
    endTime: '16:00:00',
  });
  await AppDataSource.manager.save([ab1, ab2]);

  // Create Appointments
  const appt1 = AppDataSource.manager.create(Appointment, {
    physician: physician1,
    patient: patient1,
    clinic: clinic,
    startTime: new Date('2025-07-21T09:00:00'),
    endTime: new Date('2025-07-21T09:15:00'),
  });
  await AppDataSource.manager.save(appt1);

  console.log('Seeding complete!');
  await AppDataSource.destroy();
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
