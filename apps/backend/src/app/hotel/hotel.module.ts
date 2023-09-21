import { Module } from '@nestjs/common';
import { HotelController } from './hotel.controller';
import { HotelService } from './hotel.service';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [HotelController],
  providers: [HotelService, AuthService ]
})
export class HotelModule {}
