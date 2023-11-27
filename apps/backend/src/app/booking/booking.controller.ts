import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { BookingService } from './booking.service';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { CreateBookingDto } from './dto';
import { PoliciesGuard } from '../authz/guard/policies.guard';
import { CheckPolicies } from '../authz/decorator/policies.decorator';
import { ManageBookingHandler, ReadBookingHandler, EditBookingHandler, DeleteBookingHandler } from '../authz/policies/booking.handler';

@ApiTags('booking')
@ApiCookieAuth()
@Controller('booking')
@UseGuards(AuthenticatedGuard, RolesGuard)
export class BookingController {
  constructor(private bookingService: BookingService) {}

  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(ReadBookingHandler)
  @Get('')
  async getAllUserBookings(
    @Query('userId') userId: string,
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    const userBookings = await this.bookingService.getAllUserBookings(
      parseInt(userId),
      parseInt(page),
      parseInt(pageSize),
    );

    return userBookings;
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(ReadBookingHandler)
  @ApiCookieAuth()
  @Get('/:bookingId')
  async getBooking(@Param('bookingId') bookingId: string, @Req() request) {
    return await this.bookingService.getBooking(parseInt(bookingId), request.session.user);
  }

  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Post('')
  async createBooking(@Body() dto: CreateBookingDto, @Req() request) {
    return await this.bookingService.createBooking(dto, request.session.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(EditBookingHandler)
  @ApiCookieAuth()
  @Patch('/:bookingId')
  async editBooking(@Param('bookingId') bookingId: string, @Body() dto: CreateBookingDto, @Req() request) {
    return await this.bookingService.editBooking(parseInt(bookingId), dto, request.session.user);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(DeleteBookingHandler)
  @ApiCookieAuth()
  @Delete('/:bookingId')
  async deleteBooking(@Param('bookingId') bookingId: string, @Req() request) {
    return await this.bookingService.deleteBooking(parseInt(bookingId), request.session.user);
  }
}