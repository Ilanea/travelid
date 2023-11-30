import { IsArray, IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';
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
  subtitle: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  address: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  properties?: number[];

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  urls?: string[];
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

export class AddCategoryDto {
  @ApiProperty()
  @IsNumber()
  categoryId: number;
}