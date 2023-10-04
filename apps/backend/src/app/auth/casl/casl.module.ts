import { Global, Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';
import { EditUserHandler, ManageUserHandler, ReadUserHandler } from './policies/user.handler';

@Global()
@Module({
  providers: [AbilityFactory, ReadUserHandler, EditUserHandler, ManageUserHandler],
  exports: [AbilityFactory],
})
export class CaslModule {}
