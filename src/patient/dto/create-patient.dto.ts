import { z } from 'zod';

export const createPatientSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  dob: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Date of birth must be a valid date',
  }),
  contact: z.string().min(7, 'Contact is required'),
});

export type CreatePatientDto = z.infer<typeof createPatientSchema>;
export type UpdatePatientDto = z.infer<typeof createPatientSchema> & {
  id: string;
};
// export type UpdatePatientDto = CreatePatientDto & { id: string };
export type PatientResponseDto = z.infer<typeof createPatientSchema>;

export const PatientListSchema = z.array(createPatientSchema);
