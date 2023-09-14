import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string
    @ApiPropertyOptional()
    @IsString()
    firstname: string
    @ApiPropertyOptional()
    @IsString()
    lastname: string
}

export class LoginDto {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string
}