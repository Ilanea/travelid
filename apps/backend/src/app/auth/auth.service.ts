import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
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
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(dto.password, saltOrRounds);
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
                where: {
                    email: dto.email,
                },
            });
            if(!user){
                throw new ForbiddenException('User not found');
            }
            if(!await bcrypt.compare(dto.password, user.hash)){
                throw new ForbiddenException('Invalid password');
            } else {
              return this.signToken(user.id, dto.email);
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