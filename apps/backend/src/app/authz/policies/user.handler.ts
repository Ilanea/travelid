import { subject } from '@casl/ability';
import { User } from '@prisma/client';

import { Action, AppAbility } from '../ability.factory';
import { IPolicyHandler } from '../decorator/policies-handler.interface';

const dummyUser: User = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  active: true,
  role: 'GUEST',
  userName: '',
  email: '',
  passwordHash: '',
  firstName: '',
  lastName: '',
  avatar: '',
  gender: '',
  street: '',
  city: '',
  country: '',
  nationality: '',
  birthday: new Date(),
  documentNo: '',
  mobilePhone: '',
  phone: '',
  bonuspoints: 0,
};

export class ReadUserHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId);

    dummyUser.id = userId;

    return ability.can(Action.Read, subject('User', dummyUser));
  }
}

export class EditUserHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId);

    dummyUser.id = userId;

    return ability.can(Action.Edit, subject('User', dummyUser));
  }
}

export class ManageUserHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId);

    dummyUser.id = userId;

    return ability.can(Action.Manage, subject('User', dummyUser));
  }
}
