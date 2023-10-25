import { Module } from '@nestjs/common';
import {PrismaModule} from "../prisma/prisma.module";
import {BonuspointService} from "./bonuspoint.service";
import {BonuspointController} from "./bonuspoint.controller";


@Module({
    imports: [PrismaModule],
    providers: [BonuspointService],
    controllers: [BonuspointController],
})
export class BonuspointModule {}
