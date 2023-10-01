import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HotelModule } from './hotel/hotel.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MulterModule.register({
    dest: 'apps/backend/uploads/',
  }),
  AuthModule, UserModule, PrismaModule, HotelModule],
})
export class AppModule {}
