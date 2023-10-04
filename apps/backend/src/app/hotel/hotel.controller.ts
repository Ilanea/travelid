import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guard';
import { HotelService } from './hotel.service';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { CreateHotelDto } from './dto';
import { Role } from '../auth/roles/role.enum';
import { PoliciesGuard } from '../auth/guard/policies.guard';
import { Roles } from '../auth/roles/role.decorator';
import { EditHotelHandler, ManageHotelHandler, ReadHotelHandler } from '../auth/casl/policies/hotel.handler';
import { CheckPolicies } from '../auth/casl/policies.decorator';


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
    return await this.hotelService.getHotel(parseInt(hotelId));
  }

  @Roles(Role.HOTELADMIN || Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(ManageHotelHandler)
  @ApiCookieAuth()
  @Post('')
  async createHotel(@Body() dto: CreateHotelDto, @Req() request) {
    return await this.hotelService.createHotel(dto, request.session.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(EditHotelHandler)
  @ApiCookieAuth()
  @Patch('/:hotelId')
  async editHotel(@Param('hotelId') hotelId: string, @Body() dto: CreateHotelDto) {
    return await this.hotelService.editHotel(parseInt(hotelId), dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(ManageHotelHandler)
  @ApiCookieAuth()
  @Delete('/:hotelId')
  async deleteHotel(@Param('hotelId') hotelId: string) {
    return await this.hotelService.deleteHotel(parseInt(hotelId));
  }

  @Roles(Role.HOTELADMIN || Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(EditHotelHandler)
  @ApiCookieAuth()
  @Get('/:hotelId/bookings')
  async getHotelBookings(@Param('hotelId') hotelId: string) {
    return await this.hotelService.getHotelBookings(parseInt(hotelId));
  }

}