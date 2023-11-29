import { Module } from '@nestjs/common';
import { RewardController } from './reward.controller';
import { RewardService } from './reward.service';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [RewardController],
  providers: [RewardService, AuthService]
})
export class RewardModule {}
