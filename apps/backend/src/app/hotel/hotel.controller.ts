import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guard';
import { HotelService } from './hotel.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateHotelDto } from './dto';
import { Roles } from '../auth/decorator';
import { Role } from '../auth/roles/role.enum';

@ApiTags('hotel')
@Controller('hotel')
@UseGuards(AuthenticatedGuard)
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Post('create')
  @Roles(Role.HOTELMANAGER)
  async createHotel(@Body() dto: CreateHotelDto, @Req() request) {
    const hotel = await this.hotelService.createHotel(dto, request.session.user.id);
    return hotel;
  }

}