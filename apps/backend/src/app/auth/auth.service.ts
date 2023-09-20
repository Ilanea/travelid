import { ForbiddenException, Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { LoginDto, SignupDto } from './dto';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { access } from "fs";

@Injectable()
export class AuthService{
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ){}
    
  async signup(dto: SignupDto) {

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
              firstName: dto.firstname,
              lastName: dto.lastname
          },
      });

      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
        access_token: await this.accessToken(user.id, user.email),
      };
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'User exists',
          );
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if(!user){
        throw new ForbiddenException('User not found');
      }
      if(user.passwordHash === null){
        throw new ForbiddenException('Not using Oauth');
      } else {
        if(!await argon.verify(user.passwordHash, dto.password)){
          throw new ForbiddenException('Invalid password');
        } else {
          return {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            role: user.role,
            access_token: await this.accessToken(user.id, user.email),
          };
        }
      }
  }

  async handleGoogleOAuth(req): Promise<{ id: number, email: string, firstName: string, lastName: string, role: string, access_token: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: req.user.email },
    });

    if (existingUser) {
      return {
        id: existingUser.id,
        email: existingUser.email,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        role: existingUser.role,
        access_token: await this.accessToken(existingUser.id, existingUser.email),
      };
    } else {
      const newUser = await this.prisma.user.create({
        data: {
          email: req.user.email,
          firstName: req.user.firstName,
          lastName: req.user.lastName
        },
      });

      return {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        role: newUser.role,
        access_token: await this.accessToken(newUser.id, newUser.email),
      };
    }
  }

  async logout(userId: number) {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
      });
      if(!user){
        throw new ForbiddenException('User not found');
      }
      await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          refreshTokenHash: null,
        },
      })

      return true;
  }

  async accessToken(userId: number, email: string): Promise<string> {
    const payload = { sub: userId, email };

    const accessToken = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: this.config.get('JWT_ACCESS_SECRET'),
      },
    );

    return accessToken;
  }

  async refreshToken(userId: number, email: string): Promise<string> {
    const payload = { sub: userId, email };
    
    const refreshToken = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '7d',
        secret: this.config.get('JWT_REFRESH_SECRET'),
      },
    );

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshTokenHash: await argon.hash(refreshToken),
      },
    });

    return refreshToken;
  }

  async checkRequestToken(refreshToken: string): Promise<string> {
    const userId = this.jwt.decode(refreshToken)['sub'];
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if(!user){
      throw new ForbiddenException('User not found');
    }
    if(user.refreshTokenHash === null){
      throw new ForbiddenException('User is not logged in');
    }
    if(!await argon.verify(user.refreshTokenHash, refreshToken)){
      throw new ForbiddenException('Invalid refresh token');
    } else {
      if(await this.jwt.verifyAsync(refreshToken, { secret: this.config.get('JWT_REFRESH_SECRET') })) {
        return await this.accessToken(user.id, user.email);
      } else {
        throw new ForbiddenException('Refresh token expired');
      }
    }
  }

}