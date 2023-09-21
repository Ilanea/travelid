import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { RolesGuard } from '../auth/guard';

@Module({
  controllers: [UserController],
  providers: [UserService, RolesGuard]
})
export class UserModule {}
