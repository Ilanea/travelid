import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../auth/roles/role.enum';
import { User } from '@prisma/client';

@Injectable()
export class RewardService {
  constructor(private prisma: PrismaService) {}

  async getAllHotelRewards(hotelId: number, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const rewards = await this.prisma.reward.findMany({
      where: {
        hotelId: hotelId,
      },
      skip,
      take: pageSize,
    });
    return rewards;
  }

  async getReward(rewardId: number) {
    const reward = await this.prisma.reward.findUnique({
      where: { id: rewardId },
    });
    if (!reward) {
      throw new NotFoundException('Reward not found');
    }
    return reward;
  }

  async createReward(dto) {
    const { hotelId, ...myReward } = dto;
    const reward = await this.prisma.reward.create({
      data: {
        ...myReward,
        hotel: {
          connect: {
            id: hotelId,
          },
        },
      },
    });
    if (!reward) {
      throw new BadRequestException('Reward not created');
    }

    return reward;
  }

  async editReward(rewardId: number, dto, user: User) {
    const reward = await this.prisma.reward.update({
      where: {
        id: rewardId,
      },
      data: {
        ...dto,
      },
    });
    if (!reward) {
      throw new BadRequestException('Reward not updated');
    }
    if (reward.hotelId !== user.id && user.role !== Role.ADMIN) {
      throw new UnauthorizedException('You are not allowed to access this reward');
    }

    return reward;
  }

  async deleteReward(rewardId: number, user: User) {
    const reward = await this.prisma.reward.delete({
      where: {
        id: rewardId,
      },
    });
    if (!reward) {
      throw new BadRequestException('Reward not deleted');
    }
    if (reward.hotelId !== user.id && user.role !== Role.ADMIN) {
      throw new UnauthorizedException('You are not allowed to access this reward');
    }

    return reward;
  }
}