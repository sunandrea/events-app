import { IsDateString, IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsDateString()
  date: string;

  @IsString()
  organizer: string;
}
