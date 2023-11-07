import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guard';
import { HotelService } from './hotel.service';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { CreateCategoryDto, CreateHotelDto, CreateReviewDto } from './dto';
import { Role } from '../auth/roles/role.enum';
import { PoliciesGuard } from '../authz/guard/policies.guard';
import { Roles } from '../auth/roles/role.decorator';
import { EditHotelHandler, ManageHotelHandler } from '../authz/policies/hotel.handler';
import { DeleteReviewHandler, EditReviewHandler } from '../authz/policies/review.handler';
import { CheckPolicies } from '../authz/decorator/policies.decorator';


@ApiTags('hotels')
@Controller('hotels')
export class HotelController {
  constructor(private hotelService: HotelService) {}


  // HOTEL

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

  // BOOKINGS

  @Roles(Role.HOTELADMIN || Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(EditHotelHandler)
  @ApiCookieAuth()
  @Get('/:hotelId/bookings')
  async getAllHotelBookings(@Param('hotelId') hotelId: string) {
    return await this.hotelService.getAllHotelBookings(parseInt(hotelId));
  }


  // REVIEWS

  @Get('/:hotelId/reviews')
  async getAllReviewsForHotel(@Param('hotelId') hotelId: string, @Query('page') page: string, @Query('pageSize') pageSize: string) {
    return this.hotelService.getAllReviewsForHotel(parseInt(hotelId), parseInt(page), parseInt(pageSize));
  }

  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Post('/:hotelId/reviews')
  async createReview(@Body() dto: CreateReviewDto, @Param('hotelId') hotelId: string, @Req() request) {
    return await this.hotelService.createReview(dto, parseInt(hotelId), request.session.user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(EditReviewHandler)
  @ApiCookieAuth()
  @Patch('/:hotelId/reviews/:reviewId')
  async editReview(@Param('hotelId') hotelId: string, @Param('reviewId') reviewId: string, @Body() dto: CreateReviewDto, @Req() request) {
    return await this.hotelService.editReview(parseInt(hotelId), parseInt(reviewId), dto, request.session.user.id);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(DeleteReviewHandler)
  @ApiCookieAuth()
  @Delete('/:hotelId/reviews/:reviewId')
  async deleteReview(@Param('hotelId') hotelId: string, @Param('reviewId') reviewId: string) {
    return await this.hotelService.deleteReview(parseInt(hotelId), parseInt(reviewId));
  }

  // CATEGORIES

  @Get('/:hotelId/categories')
  async getAllCategoriesForHotel(@Param('hotelId') hotelId: string) {
    return this.hotelService.getAllCategoriesForHotel(parseInt(hotelId));
  }

  @Roles(Role.HOTELADMIN || Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(ManageHotelHandler)
  @ApiCookieAuth()
  @Post('/:hotelId/categories')
  async createHotelCategory(@Param('hotelId') hotelId: string, @Body() dto: CreateCategoryDto) {
    return await this.hotelService.createHotelCategory(parseInt(hotelId), dto);
  }

  @Roles(Role.HOTELADMIN || Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(ManageHotelHandler)
  @ApiCookieAuth()
  @Patch('/:hotelId/categories/:categoryId')
  async editHotelCategory(@Param('hotelId') hotelId: string, @Param('categoryId') categoryId: string, @Body() dto: CreateCategoryDto) {
    return await this.hotelService.editHotelCategory(parseInt(hotelId), parseInt(categoryId),dto);
  }

  @Roles(Role.HOTELADMIN || Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(ManageHotelHandler)
  @ApiCookieAuth()
  @Delete('/:hotelId/categories/:categoryId')
  async deleteHotelCategory(@Param('hotelId') hotelId: string, @Param('categoryId') categoryId: string) {
    return await this.hotelService.deleteHotelCategory(parseInt(hotelId), parseInt(categoryId));
  }

}
