import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsBoolean, IsInt } from 'class-validator';

export class BonusPointDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  points: number;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  used: boolean;
}