import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateHotelDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;
}

export class CreateReviewDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  text: string;

  @ApiProperty()
  @IsNumber()
  rating: number;
}

export class CreateCategoryDto {
  @ApiProperty()
  @IsString()
  name: string;

}