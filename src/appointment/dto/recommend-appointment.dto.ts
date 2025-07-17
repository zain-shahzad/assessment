import { IsString, IsDateString, IsInt, Min } from 'class-validator';

export class RecommendAppointmentDto {
  @IsString()
  clinicId: string;

  @IsString()
  physicianId: string;

  @IsString()
  patientId: string;

  @IsDateString()
  preferredDate: string;

  @IsInt()
  @Min(1)
  durationMinutes: number;
}
