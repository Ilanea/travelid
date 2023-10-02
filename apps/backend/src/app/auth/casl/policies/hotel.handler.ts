import { IPolicyHandler } from '../policies-handler.interface';
import { Action, AppAbility } from '../ability.factory';
import { subject } from '@casl/ability';
import { Hotel, User } from '@prisma/client';

export class HotelHandler implements IPolicyHandler {
  constructor(
    private hotel: Hotel,
    private user: User
    ) {}

  handle(ability: AppAbility) {
    console.log(this.hotel)
    return ability.can(Action.Manage, subject('Hotel', this.hotel));
  }
}