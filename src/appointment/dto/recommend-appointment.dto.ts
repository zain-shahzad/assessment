import { z } from 'zod';

const RecommendAppointmentSchema = z.object({
  clinicId: z.string(),
  physicianId: z.string(),
  patientId: z.string(),
  //  this checks if the string can be parsed as a date
  preferredDate: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: 'Invalid date format',
  }),
  durationMinutes: z.number().int().min(1),
});

interface RecommendAppointmentDtoAsInterface
  extends z.infer<typeof RecommendAppointmentSchema> {}
export type RecommendAppointmentDto = z.infer<
  typeof RecommendAppointmentSchema
>;

// import { IsString, IsDateString, IsInt, Min } from 'class-validator';

// export class RecommendAppointmentDto {
//   @IsString()
//   clinicId: string;

//   @IsString()
//   physicianId: string;

//   @IsString()
//   patientId: string;

//   @IsDateString()
//   preferredDate: string;

//   @IsInt()
//   @Min(1)
//   durationMinutes: number;
// }
