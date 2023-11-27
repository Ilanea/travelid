import { IPolicyHandler } from '../decorator/policies-handler.interface';
import { Action, AppAbility } from '../ability.factory';
import { subject } from '@casl/ability';
import { Review } from '@prisma/client';

const dummyReview: Review = {
  id: 0,
  createdAt: new Date(),
  updatedAt: new Date(),
  text: '',
  rating: 0,
  hotelId: 0,
  userId: 0,
};

export class EditReviewHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId)

    dummyReview.userId = userId;
  
    return ability.can(Action.Edit, subject('Review', dummyReview));
  }
}

export class ManageReviewHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId)

    dummyReview.userId = userId;
  
    return ability.can(Action.Manage, subject('Review', dummyReview));
  }
}

export class DeleteReviewHandler implements IPolicyHandler {
  handle(ability: AppAbility, request) {
    const userId = parseInt(request['params'].userId)

    dummyReview.userId = userId;
  
    return ability.can(Action.Delete, subject('Review', dummyReview));
  }
}