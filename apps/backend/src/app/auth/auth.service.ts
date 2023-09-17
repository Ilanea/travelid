import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';
import { LoginDto, SignupDto } from './dto';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Injectable()
export class AuthService{
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ){}
    
  async signup(dto: SignupDto) {
    const hash = await argon.hash(dto.password);
    try {
      const user = await this.prisma.user.create({
          data: {
              email: dto.email,
              hash: hash,
              firstName: dto.firstname,
              lastName: dto.lastname,
          },
      });

      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }

  async login(dto: LoginDto) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email: dto.email },
      });
      if(!user){
        throw new ForbiddenException('User not found');
      }
      if(user.hash === null){
        throw new ForbiddenException('Not using Oauth');
      } else {
        if(!await argon.verify(user.hash, dto.password)){
          throw new ForbiddenException('Invalid password');
        } else {
          return this.signToken(user.id, dto.email);
        }
      }
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(
            'Credentials taken',
          );
        }
      }
      throw error;
    }
  }

  async handleGoogleOAuth(req): Promise<{ access_token: string }> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: req.user.email },
    });

    if (existingUser) {
      return this.signToken(existingUser.id, existingUser.email);
    } else {
      const newUser = await this.prisma.user.create({
        data: {
          email: req.user.email,
          firstName: req.user.firstName,
          lastName: req.user.lastName
        },
      });

      return this.signToken(newUser.id, newUser.email);
    }
  }

  async signToken(userId: number, email: string ): Promise<{ access_token: string }> {
    const payload = { sub: userId, email };
    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(
      payload,
      {
        expiresIn: '15m',
        secret: secret,
      },
    );

    return {
      access_token: token,
    };
  }
}