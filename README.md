# Healthcare Scheduling Backend

## Overview

This project is a modular monolith backend service for a healthcare appointment scheduling system, built with NestJS and PostgreSQL. It is designed to support multi-clinic, multi-provider environments and provides intelligent appointment slot recommendations based on physician availability, existing appointments, and billing rules.

## Features

- Suggests the top 10 best available appointment slots for patients.
- Considers physician working hours, existing appointments, and billing gap rules.
- Supports multiple clinics and providers.
- Scalable, modular architecture for future enhancements.

## Entity Relationship Diagram (ERD)

- **Physician**: Represents healthcare providers.
- **Patient**: Represents patients booking appointments.
- **Clinic**: Represents clinics where appointments are held.
- **Appointment**: Stores scheduled appointments.
- **AvailabilityBlock**: Defines physician working hours.
- **BillingRule**: Defines rules for appointment gaps and slot durations.

## Key API Endpoints

### 1. Recommend Appointment Slots

**POST** `/api/appointments/recommend`

Suggests the top 10 available slots for a patient and physician, considering all scheduling rules.

#### Request Body

```json
{
  "clinicId": "c001",
  "physicianId": "p001",
  "patientId": "u123",
  "preferredDate": "2025-07-01",
  "durationMinutes": 15
}
```

#### Response

```json
{
  "status": "success",
  "recommendedSlots": [
    "2025-07-01T09:00:00",
    "2025-07-01T10:00:00"
    // ... up to 10 slots
  ]
}
```

### 2. Create Appointment

**POST** `/api/appointments`

Creates a new appointment.

#### Request Body

```json
{
  "physicianId": "p001",
  "patientId": "u123",
  "clinicId": "c001",
  "startTime": "2025-07-01T09:00:00",
  "endTime": "2025-07-01T09:15:00"
}
```

#### Response

```json
{
  "id": "a001",
  "physicianId": "p001",
  "patientId": "u123",
  "clinicId": "c001",
  "startTime": "2025-07-01T09:00:00",
  "endTime": "2025-07-01T09:15:00"
}
```

### 3. List Appointments

**GET** `/api/appointments`

Returns all appointments.

#### Response

```json
[
  {
    "id": "a001",
    "physicianId": "p001",
    "patientId": "u123",
    "clinicId": "c001",
    "startTime": "2025-07-01T09:00:00",
    "endTime": "2025-07-01T09:15:00"
  }
]
```

## Scheduling Algorithm

- Filters physician's availability blocks for the requested day.
- Excludes slots that conflict with existing appointments.
- Applies billing rules (gap between appointments, minimum slot duration).
- Returns the least disruptive, best-matching slots.

## Setup Instructions

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure your PostgreSQL database in `.env` or via environment variables:
   - `DB_HOST`, `DB_PORT`, `DB_USERNAME`, `DB_PASSWORD`, `DB_NAME`
4. Run the application:
   ```bash
   npm run start
   ```

## Postman Collection

A Postman collection is included for testing all endpoints.

## Assumptions

- All time values are in ISO 8601 format (UTC).
- Billing rules are defined per clinic.
- The system is designed for extensibility and future microservice extraction.
