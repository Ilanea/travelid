import { IPolicyHandler } from '../decorator/policies-handler.interface';
import { Action, AppAbility } from '../ability.factory';
import { subject } from '@casl/ability';
import { Booking } from '@prisma/client';

const dummyBooking: Booking = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  description: '',
  startDate: new Date(),
  endDate: new Date(),
  price: 0,
  hotelId: 0,
  userId: 0,
};

export class ReadBookingHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId)

    dummyBooking.userId = userId;
  
    return ability.can(Action.Read, subject('Booking', dummyBooking));
  }
}

export class EditBookingHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId)

    dummyBooking.userId = userId;
  
    return ability.can(Action.Edit, subject('Booking', dummyBooking));
  }
}

export class ManageBookingHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId)

    dummyBooking.userId = userId;
  
    return ability.can(Action.Manage, subject('Booking', dummyBooking));
  }
}

export class DeleteBookingHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId)

    dummyBooking.userId = userId;
  
    return ability.can(Action.Delete, subject('Booking', dummyBooking));
  }
}