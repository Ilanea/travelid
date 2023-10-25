import {Controller, Post, Body, Get, Param} from '@nestjs/common';
import {BonuspointService} from "./bonuspoint.service";
import {Bonuspoint} from "@prisma/client";

@Controller('bonuspoint')
export class BonuspointController {
    constructor(private readonly bonuspointService: BonuspointService) {}

    @Get()
    async getAllBonuspoints(): Promise<Bonuspoint[]> {
        return await this.bonuspointService.getAllBonuspoints();
    }

    @Get(':id')
    async getBonuspoint(@Param('id') id: string): Promise<Bonuspoint> {
        return await this.bonuspointService.getBonuspoint(parseInt(id));
    }

    @Post()
    async createBonuspoint(@Body() data: Bonuspoint): Promise<Bonuspoint> {
        return await this.bonuspointService.createBonuspoint(data);
    }
}