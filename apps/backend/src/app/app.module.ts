import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HotelModule } from './hotel/hotel.module';
import { AuthzModule } from './authz/authz.module';
import { MulterModule } from '@nestjs/platform-express';
import { BonuspointModule } from './bonuspoint/bonuspoint.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MulterModule.register({
    dest: 'apps/backend/uploads/',
  }),
  AuthModule, AuthzModule, PrismaModule, UserModule, HotelModule, BonuspointModule],
})
export class AppModule {}
