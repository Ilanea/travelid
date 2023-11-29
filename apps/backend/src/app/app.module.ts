import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { HotelModule } from './hotel/hotel.module';
import { CategoryModule } from './category/category.module';
import { AuthzModule } from './authz/authz.module';
import { MulterModule } from '@nestjs/platform-express';
import { BookingModule } from './booking/booking.module';
import { RewardModule } from './reward/reward.module';
import { PropertyModule } from './property/property.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MulterModule.register({
    dest: 'apps/backend/uploads/',
  }),
  AuthModule, AuthzModule, PrismaModule, BookingModule, UserModule, HotelModule, CategoryModule, RewardModule, PropertyModule],
})
export class AppModule {}
