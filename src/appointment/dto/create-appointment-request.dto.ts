import { z } from 'zod';

const dataValidator = z.string().refine((val) => !isNaN(Date.parse(val)), {
  message: 'Invalid start time format',
});
const createAppointmentRequestSchema = z.object({
  startTime: dataValidator,
  endTime: dataValidator,
  clinicId: z.uuid(),
  physicianId: z.uuid(),
  patientId: z.uuid(),
});

export type CreateAppointmentRequestDto = z.infer<
  typeof createAppointmentRequestSchema
>;
