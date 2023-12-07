import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRewardDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  validFrom?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  validUntil?: Date;

  @ApiProperty()
  @IsNumber()
  hotelId: number;
}