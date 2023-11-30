import { subject } from '@casl/ability';
import { Hotel } from '@prisma/client';

import { Action, AppAbility } from '../ability.factory';
import { IPolicyHandler } from '../decorator/policies-handler.interface';

const dummyHotel: Hotel = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: '',
  email: '',
  website: '',
  phoneNumber: '',
  address: '',
  description: '',
};

export class ReadHotelHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const hotelId = parseInt(request['params'].hotelId);

    dummyHotel.id = hotelId;

    return ability.can(Action.Read, subject('Hotel', dummyHotel));
  }
}

export class EditHotelHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const hotelId = parseInt(request['params'].hotelId);

    dummyHotel.id = hotelId;

    return ability.can(Action.Edit, subject('Hotel', dummyHotel));
  }
}

export class ManageHotelHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const hotelId = parseInt(request['params'].hotelId);

    dummyHotel.id = hotelId;

    return ability.can(Action.Manage, subject('Hotel', dummyHotel));
  }
}
