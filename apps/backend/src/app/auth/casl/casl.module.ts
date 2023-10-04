import { Global, Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';
import { EditUserHandler, ManageUserHandler, ReadUserHandler } from './policies/user.handler';
import { EditHotelHandler, ManageHotelHandler, ReadHotelHandler } from './policies/hotel.handler';

@Global()
@Module({
  providers: [AbilityFactory, ReadUserHandler, EditUserHandler, ManageUserHandler, ReadHotelHandler, EditHotelHandler, ManageHotelHandler],
  exports: [AbilityFactory],
})
export class CaslModule {}
