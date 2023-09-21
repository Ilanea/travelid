import { IsEmail, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../auth/roles/role.enum';

export class EditUserDto {
  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  firstName?: string;

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  lastName?: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}

export class ChangeRoleDto {
  @ApiProperty()
  @IsNumber()
  userId: number
  
  @ApiProperty()
  @IsEnum(Role, {
    message: `Invalid role. Role must be one of: ${Object.values(Role).join(', ')}`,
  })
  role: Role;
}