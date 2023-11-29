import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRewardDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  price?: number;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  startDate?: Date;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  endDate?: Date;

  @ApiProperty()
  @IsNumber()
  hotelId: number;

  @ApiProperty()
  @IsNumber()
  userId: number;
}