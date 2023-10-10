import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guard';
import { HotelService } from './hotel.service';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { CreateHotelDto } from './dto';
import { Roles } from '../auth/decorator';
import { Role } from '../auth/roles/role.enum';

@ApiTags('hotels')
@Controller('hotels')
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Get('')
    async getAllHotels(
      @Query('page') page: string,
      @Query('pageSize') pageSize: string,
    ) {
      return this.hotelService.getAllHotels(parseInt(page), parseInt(pageSize));
    }

  @Get('/:hotelId')
  async getHotel(@Param('hotelId') hotelId: string) {
    const hotel = await this.hotelService.getHotel(parseInt(hotelId));
    return hotel;
  }

  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Post('')
  @Roles(Role.HOTELMANAGER || Role.ADMIN)
  async createHotel(@Body() dto: CreateHotelDto, @Req() request) {
    const hotel = await this.hotelService.createHotel(dto, request.session.user.id);
    return hotel;
  }

  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Patch('/:hotelId')
  @Roles(Role.HOTELMANAGER || Role.ADMIN)
  async editHotel(@Param('hotelId') hotelId: string, @Body() dto: CreateHotelDto) {
    const hotel = await this.hotelService.editHotel(parseInt(hotelId), dto);
    return hotel;
  }

  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Delete('/:hotelId')
  @Roles(Role.ADMIN)
  async deleteHotel(@Param('hotelId') hotelId: string) {
    const hotel = await this.hotelService.deleteHotel(parseInt(hotelId));
    return hotel;
  }

  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Get('/:hotelId/bookings')
  @Roles(Role.HOTELMANAGER || Role.ADMIN)
  async getHotelBookings(@Param('hotelId') hotelId: string) {
    const bookings = await this.hotelService.getHotelBookings(parseInt(hotelId));
    return bookings;
  }

}
