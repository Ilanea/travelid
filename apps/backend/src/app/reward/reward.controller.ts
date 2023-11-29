import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { RewardService } from './reward.service';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { CreateRewardDto } from './dto';
import { PoliciesGuard } from '../authz/guard/policies.guard';
import { CheckPolicies } from '../authz/decorator/policies.decorator';
import { ManageRewardHandler, ReadRewardHandler, EditRewardHandler, DeleteRewardHandler } from '../authz/policies/reward.handler';

@ApiTags('reward')
@ApiCookieAuth()
@Controller('reward')
@UseGuards(AuthenticatedGuard, RolesGuard)
export class RewardController {
  constructor(private rewardService: RewardService) {}

  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(ReadRewardHandler)
  @Get('')
  async getAllHotelRewards(
    @Query('hotelId') hotelId: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const userRewards = await this.rewardService.getAllHotelRewards(
      parseInt(hotelId),
      parseInt(page),
      parseInt(pageSize),
    );

    return userRewards;
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(ReadRewardHandler)
  @ApiCookieAuth()
  @Get('/:rewardId')
  async getReward(@Param('rewardId') rewardId: string, @Req() request) {
    return await this.rewardService.getReward(parseInt(rewardId), request.session.user);
  }

  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Post('')
  async createReward(@Body() dto: CreateRewardDto, @Req() request) {
    return await this.rewardService.createReward(dto, request.session.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(EditRewardHandler)
  @ApiCookieAuth()
  @Patch('/:rewardId')
  async editReward(@Param('rewardId') rewardId: string, @Body() dto: CreateRewardDto, @Req() request) {
    return await this.rewardService.editReward(parseInt(rewardId), dto, request.session.user);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(DeleteRewardHandler)
  @ApiCookieAuth()
  @Delete('/:rewardId')
  async deleteReward(@Param('rewardId') rewardId: string, @Req() request) {
    return await this.rewardService.deleteReward(parseInt(rewardId), request.session.user);
  }
}