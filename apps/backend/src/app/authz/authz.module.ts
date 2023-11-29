import { Global, Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';
import { EditUserHandler, ManageUserHandler, ReadUserHandler } from './policies/user.handler';
import { EditHotelHandler, ManageHotelHandler, ReadHotelHandler } from './policies/hotel.handler';
import { DeleteBookingHandler, EditBookingHandler, ManageBookingHandler, ReadBookingHandler } from './policies/booking.handler';
import { DeleteRewardHandler, EditRewardHandler, ManageRewardHandler, ReadRewardHandler } from './policies/reward.handler';
import { DeleteReviewHandler, ManageReviewHandler } from './policies/review.handler';

@Global()
@Module({
  providers: [AbilityFactory, ReadUserHandler, EditUserHandler, ManageUserHandler, ReadHotelHandler, EditHotelHandler, ManageHotelHandler, ReadBookingHandler, EditBookingHandler, DeleteBookingHandler, ManageBookingHandler, DeleteReviewHandler, ManageReviewHandler, DeleteReviewHandler, ManageReviewHandler, ReadRewardHandler, EditRewardHandler, DeleteRewardHandler, ManageRewardHandler],
  exports: [AbilityFactory],
})
export class AuthzModule {}
