import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { ChangePasswordDto, EditUserDto } from './dto';
import { Role } from '../auth/roles/role.enum';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async checkOauth(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if(user.passwordHash === null) {
      return true;
    } else {
      return false;
    }
  }

  async getUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    delete user.passwordHash;
    return user;
  }

  async getAllUsers(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const users = await this.prisma.user.findMany({
      skip,
      take: pageSize,
    });

    users.forEach(user => {
      delete user.passwordHash;
    });
    return users;
  }

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.passwordHash;
    return user;
  }

  async deleteUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    if (user.role === Role.ADMIN) {
      throw new BadRequestException('Admin users cannot be deleted');
    }
  
    const deleteUser = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (!deleteUser) {
      return { message: 'User deleted' };
    } else {
      throw new BadRequestException('User could not be deleted');
    }
  
  }

  async changePassword(
    userId: number,
    dto: ChangePasswordDto,
  ) {
    const oldUser = await this.prisma.user.findUnique({
      where: {id: userId  },
    });
    if(oldUser.passwordHash === null) {
      throw new BadRequestException('User is using Oauth');
    }
    if(!await argon.verify(oldUser.passwordHash, dto.oldPassword)) {
      throw new BadRequestException('Wrong password provided');
    }
    if(dto.newPassword === dto.oldPassword) {
      throw new BadRequestException('New password must be different from old password');
    }
    if(dto.newPassword.length < 8) {
      throw new BadRequestException('New password must be at least 8 characters long');
    }
    if(dto.newPassword.length > 32) {
      throw new BadRequestException('New password must be at most 32 characters long');
    }
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        passwordHash: await argon.hash(dto.newPassword),
      },
    });

    delete user.passwordHash;

    return user;
  }

  async changeRole(userId: number, dto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role: dto.role,
      },
    });

    if(!user) {
      throw new BadRequestException('User not found');
    }

    delete user.passwordHash;

    return user;
  }

  async changeActive(userId: number, dto) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        active: dto.active,
      },
    });

    if(!user) {
      throw new BadRequestException('User not found');
    }

    delete user.passwordHash;

    return user;
  }
  
}