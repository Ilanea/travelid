import { IPolicyHandler } from '../decorator/policies-handler.interface';
import { Action, AppAbility } from '../ability.factory';
import { subject } from '@casl/ability';
import { User } from '@prisma/client';

const dummyUser: User = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  active: true,
  role: 'GUEST',
  userName: '',
  email: '',
  passwordHash: '',
  apiKey: '',
  firstName: '',
  lastName: '',
  avatar: '',
};

export class ReadUserHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId)

    dummyUser.id = userId;
  
    return ability.can(Action.Read, subject('User', dummyUser));
  }
}

export class EditUserHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId)

    dummyUser.id = userId;
  
    return ability.can(Action.Edit, subject('User', dummyUser));
  }
}

export class ManageUserHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId)

    dummyUser.id = userId;
  
    return ability.can(Action.Manage, subject('User', dummyUser));
  }
}