import { IPolicyHandler } from '../policies-handler.interface';
import { Action, AppAbility } from '../ability.factory';
import { subject } from '@casl/ability';
import { User } from '@prisma/client';

export class ReadUserHandler implements IPolicyHandler {
  constructor(
    private user: User
    ) {}

  handle(ability: AppAbility) {
    if (!this.user) return false;
    return ability.can(Action.Read, subject('User', this.user));
  }
}