import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guard';
import { HotelService } from './hotel.service';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { CreateHotelDto } from './dto';
import { Roles } from '../auth/decorator';
import { Role } from '../auth/roles/role.enum';

@ApiTags('hotel')
@Controller('hotel')
@UseGuards(AuthenticatedGuard)
export class HotelController {
  constructor(private hotelService: HotelService) {}

  @Get('')
  async getAllHotels() {
    return this.hotelService.getAllHotels();
  }

  @Get('/:hotelId')
  async getHotel(@Param('hotelId') hotelId: string) {
    const hotel = await this.hotelService.getHotel(parseInt(hotelId));
    return hotel;
  }

  @ApiCookieAuth()
  @Post('')
  @Roles(Role.HOTELMANAGER || Role.ADMIN)
  async createHotel(@Body() dto: CreateHotelDto, @Req() request) {
    const hotel = await this.hotelService.createHotel(dto, request.session.user.id);
    return hotel;
  }

  @ApiCookieAuth()
  @Patch('/:hotelId')
  @Roles(Role.HOTELMANAGER || Role.ADMIN)
  async editHotel(@Param('hotelId') hotelId: string, @Body() dto: CreateHotelDto) {
    const hotel = await this.hotelService.editHotel(parseInt(hotelId), dto);
    return hotel;
  }

  @ApiCookieAuth()
  @Delete('/:hotelId')
  @Roles(Role.ADMIN)
  async deleteHotel(@Param('hotelId') hotelId: string) {
    const hotel = await this.hotelService.deleteHotel(parseInt(hotelId));
    return hotel;
  }

  @ApiCookieAuth()
  @Get('/:hotelId/bookings')
  @Roles(Role.HOTELMANAGER || Role.ADMIN)
  async getHotelBookings(@Param('hotelId') hotelId: string) {
    const bookings = await this.hotelService.getHotelBookings(parseInt(hotelId));
    return bookings;
  }

}