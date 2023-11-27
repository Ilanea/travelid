import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService, AuthService]
})
export class BookingModule {}
