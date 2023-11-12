import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '.prisma/client';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import * as argon from 'argon2';
import { SignupDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwtService: JwtService,
  ){}

  async login(username: string, password: string): Promise<string> {
    const user = await this.validateUser(username, password);
    const payload = { userId: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    return token;
  }

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
              userName: dto.userName,
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
      let uniqueUserName;
      if(!googleUser.username){ 
        uniqueUserName = googleUser.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '');
      } else {
        uniqueUserName = googleUser.username.replace(/[^a-zA-Z0-9]/g, '');
      }
      let randomDigits = Math.floor(1000 + Math.random() * 9000);

      while (await this.isUserNameTaken(uniqueUserName + randomDigits)) {
        randomDigits = Math.floor(1000 + Math.random() * 9000);
      }

      const user = await this.prisma.user.create({
        data: {
          userName: uniqueUserName + randomDigits,
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
      include: {
        hotelsAsAdmin: true,
        hotelsAsReceptionist: true,
      },
    });

    if(!user){
      throw new ForbiddenException('User not found');
    }
    return user;
  }

  async isUserNameTaken(userName: string) {
    const existingUser = await this.prisma.user.findUnique({
      where: { userName: userName },
    });
    return existingUser;
  }

}
