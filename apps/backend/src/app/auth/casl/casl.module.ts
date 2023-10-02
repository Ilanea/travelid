import { Global, Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';
import { HotelHandler } from './policies/hotel.handler';

@Global()
@Module({
  providers: [AbilityFactory, HotelHandler],
  exports: [AbilityFactory, HotelHandler],
})
export class CaslModule {}
