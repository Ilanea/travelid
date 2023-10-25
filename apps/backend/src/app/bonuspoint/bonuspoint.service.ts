import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import {Prisma } from "@prisma/client";

@Injectable()
export class BonuspointService {
    constructor(private prisma: PrismaService) {}

    async getAllBonuspoints(): Promise<Bonuspoint[]> {
        return await this.prisma.bonuspoint.findMany();
    }

    async getBonuspoint(id: number): Promise<Bonuspoint> {
        return await this.prisma.bonuspoint.findUnique({
            where: {
                id: id,
            },
        });
    }

    async createBonuspoint(data: Prisma.BonuspointCreateInput): Promise<Bonuspoint> {
        return await this.prisma.bonuspoint.create({
            data,
        });
    }

    async updateBonuspoint(id: number, data: Prisma.BonuspointUpdateInput): Promise<Bonuspoint> {
        return await this.prisma.bonuspoint.update({
            where: {
                id: id,
            },
            data,
        });
    }

    async deleteBonuspoint(id: number): Promise<Bonuspoint> {
        return await this.prisma.bonuspoint.delete({
            where: {
                id: id,
            },
        });
    }
}