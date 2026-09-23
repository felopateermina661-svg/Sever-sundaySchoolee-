import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsOptional,
  IsInt,
  IsDateString,
} from 'class-validator';

export class CreateServantDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  fullName: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsDateString()
  joinedAt?: string;

  @IsOptional()
  @IsInt()
  userId?: number;
}
