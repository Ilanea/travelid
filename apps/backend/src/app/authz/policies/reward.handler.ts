import { subject } from '@casl/ability';
import { Reward } from '@prisma/client';

import { Action, AppAbility } from '../ability.factory';
import { IPolicyHandler } from '../decorator/policies-handler.interface';

const dummyReward: Reward = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  name: '',
  description: '',
  price: 0,
  image: '',
  active: true,
  validFrom: new Date(),
  validUntil: new Date(),
  hotelId: 0,
};

export class ReadRewardHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const hotelId = parseInt(request['params'].hotelId);

    dummyReward.hotelId = hotelId;

    return ability.can(Action.Read, subject('Reward', dummyReward));
  }
}

export class EditRewardHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const hotelId = parseInt(request['params'].hotelId);

    dummyReward.hotelId = hotelId;

    return ability.can(Action.Edit, subject('Reward', dummyReward));
  }
}

export class ManageRewardHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const hotelId = parseInt(request['params'].hotelId);

    dummyReward.hotelId = hotelId;

    return ability.can(Action.Manage, subject('Reward', dummyReward));
  }
}

export class DeleteRewardHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const hotelId = parseInt(request['params'].hotelId);

    dummyReward.hotelId = hotelId;

    return ability.can(Action.Delete, subject('Reward', dummyReward));
  }
}
