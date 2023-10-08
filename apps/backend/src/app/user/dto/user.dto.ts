import { IsBoolean, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../auth/roles/role.enum';

export class EditUserDto {
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  userName?: string;

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
  @IsEnum(Role, {
    message: `Invalid role. Role must be one of: ${Object.values(Role).join(', ')}`,
  })
  role: Role;
}

export class ChangeActiveDto {
  @ApiProperty()
  @IsBoolean()
  active: boolean;
}

export class UploadAvatarDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  file: BinaryData;
}