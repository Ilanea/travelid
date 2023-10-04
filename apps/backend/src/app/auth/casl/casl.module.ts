import { Global, Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';
import { ReadUserHandler } from './policies/user.handler';

@Global()
@Module({
  providers: [AbilityFactory, ReadUserHandler],
  exports: [AbilityFactory],
})
export class CaslModule {}
