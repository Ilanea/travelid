import {Controller, Post, Body, Get, Param} from '@nestjs/common';
import {BonuspointService} from "./bonuspoint.service";
import {BonusPoint} from "@prisma/client";

@Controller('bonuspoint')
export class BonuspointController {
    constructor(private readonly bonuspointService: BonuspointService) {}

    @Get()
    async createBonuspoint(@Body() data: BonusPoint): Promise<BonusPoint> {
        const bonusPointInput: BonusPointCreateInput = {
            email: data.email,
            points: data.points,
            user: { connect: { id: data.userId } }
        };
        return await this.bonuspointService.createBonuspoint(bonusPointInput);
    }
}