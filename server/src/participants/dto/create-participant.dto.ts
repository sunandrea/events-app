import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMongoId,
  IsString,
} from 'class-validator';
import { WhereHearOptions } from '../enums/enums';

export class CreateParticipantDto {
  @IsString()
  fullName: string;

  @IsEmail()
  email: string;

  @IsDateString()
  birthDate: string;

  @IsEnum(WhereHearOptions)
  whereHear: WhereHearOptions;

  @IsMongoId()
  event: string;
}
