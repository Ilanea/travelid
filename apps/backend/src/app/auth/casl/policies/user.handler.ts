import { IPolicyHandler } from '../policies-handler.interface';
import { Action, AppAbility } from '../ability.factory';
import { subject } from '@casl/ability';
import { User } from '@prisma/client';

export class ReadUserHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId)

    const dummyUser: User = {
      id: userId,
      createdAt: new Date(),
      updatedAt: new Date(),
      active: true,
      role: 'GUEST',
      userName: '',
      email: '',
      passwordHash: '',
      firstName: '',
      lastName: '',
    };
  
    return ability.can(Action.Read, subject('User', dummyUser));
  }
}