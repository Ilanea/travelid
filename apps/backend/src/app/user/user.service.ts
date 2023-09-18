import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';
import { ChangePasswordDto, EditUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

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

    delete user.hash;

    return user;
  }

  async changePassword(
    userId: number,
    dto: ChangePasswordDto,
  ) {
    const oldUser = await this.prisma.user.findUnique({
      where: {id: userId  },
    });
    if(oldUser.hash === null) {
      throw new BadRequestException('User is using Oauth');
    }
    if(!await argon.verify(oldUser.hash, dto.oldPassword)) {
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
        hash: await argon.hash(dto.newPassword),
      },
    });

    delete user.hash;

    return user;
  }

}