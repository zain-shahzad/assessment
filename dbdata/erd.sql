CREATE TABLE "clinics" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "address" text,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "physicians" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "specialization" varchar,
  "clinic_id" uuid,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "patients" (
  "id" uuid PRIMARY KEY,
  "name" varchar,
  "dob" date,
  "phone" varchar,
  "email" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "availability_blocks" (
  "id" uuid PRIMARY KEY,
  "physician_id" uuid,
  "clinic_id" uuid,
  "day_of_week" int,
  "start_time" time,
  "end_time" time,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "appointments" (
  "id" uuid PRIMARY KEY,
  "physician_id" uuid,
  "patient_id" uuid,
  "clinic_id" uuid,
  "start_time" timestamp,
  "end_time" timestamp,
  "status" varchar,
  "created_at" timestamp,
  "updated_at" timestamp
);

CREATE TABLE "billing_rules" (
  "id" uuid PRIMARY KEY,
  "clinic_id" uuid,
  "duration_minutes" int,
  "gap_minutes" int,
  "created_at" timestamp,
  "updated_at" timestamp
);

ALTER TABLE "physicians" ADD FOREIGN KEY ("clinic_id") REFERENCES "clinics" ("id");

ALTER TABLE "availability_blocks" ADD FOREIGN KEY ("physician_id") REFERENCES "physicians" ("id");

ALTER TABLE "availability_blocks" ADD FOREIGN KEY ("clinic_id") REFERENCES "clinics" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("physician_id") REFERENCES "physicians" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("patient_id") REFERENCES "patients" ("id");

ALTER TABLE "appointments" ADD FOREIGN KEY ("clinic_id") REFERENCES "clinics" ("id");

ALTER TABLE "billing_rules" ADD FOREIGN KEY ("clinic_id") REFERENCES "clinics" ("id");
