import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '.prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as argon from 'argon2';
import { SignupDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ){}

  async signup(dto: SignupDto): Promise<User> {
    if(dto.password.length < 8) {
      throw new BadRequestException('Password must be at least 8 characters long');
    }
    if(dto.password.length > 32) {
      throw new BadRequestException('Password must be at most 32 characters long');
    }

    const passwordHash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
          data: {
              email: dto.email,
              passwordHash: passwordHash,
              firstName: dto.firstName,
              lastName: dto.lastName
          },
      });

      delete user.passwordHash;
      return user;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('User already exists');
        }
      }
      throw error;
    }
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    if(!user){
      throw new ForbiddenException('User not found');
    }
    if(user.passwordHash === null){
      throw new ForbiddenException('Not using Oauth');
    } else {
      if(!await argon.verify(user.passwordHash, password)){
        throw new ForbiddenException('Invalid password');
      } else {
        delete user.passwordHash;
        return user;
      }
    }
  }

  async validateOauthUser(googleUser): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: googleUser.email },
    });
    if(user){
      delete user.passwordHash;
      return user;
    } else {
      const user = await this.prisma.user.create({
        data: {
          email: googleUser.email,
          firstName: googleUser.firstName,
          lastName: googleUser.lastName,
        },
      });
      delete user.passwordHash;
      return user;
    }
  }

  async getUserById(userId: number){
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    //console.log('user.refreshTokenHash: ', user.refreshTokenHash);
    //const hashedRefreshToken = await argon.hash(refreshToken);
    //console.log('hashedRefreshToken: ', hashedRefreshToken);

    // unhash refresh token
    //const unhashedRefreshToken = await argon.verify(user.refreshTokenHash, refreshToken);
    //console.log('unhashed refreshToken: ', unhashedRefreshToken);
    
    
    
    if(!user){
      throw new ForbiddenException('User not found');
    }
    return user;
  }

}
