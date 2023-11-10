import { BonusPoint, Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

export class BonuspointService {
  constructor(private prisma: PrismaService) {}

  async createBonuspoint(
    data: Prisma.BonusPointCreateInput
  ): Promise<BonusPoint> {
    return await this.prisma.bonusPoint.create({
      data,
    });
  }

  async updateBonuspoint(
    id: number,
    data: Prisma.BonusPointUpdateInput
  ): Promise<BonusPoint> {
    return await this.prisma.bonusPoint.update({
      where: {
        id: id,
      },
      data,
    });
  }

  async getAllBonuspoints(): Promise<BonusPoint[]> {
    return await this.prisma.bonusPoint.findMany();
  }

  async getBonuspoint(id: number): Promise<BonusPoint | null> {
    return await this.prisma.bonusPoint.findUnique({
      where: {
        id: id,
      },
    });
  }

  async deleteBonusPoint(id: number): Promise<BonusPoint> {
    return await this.prisma.bonusPoint.delete({
      where: {
        id: id,
      },
    });
  }
}
