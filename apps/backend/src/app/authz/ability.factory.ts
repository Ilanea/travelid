import { AbilityBuilder, PureAbility } from '@casl/ability';
import { PrismaQuery, Subjects, createPrismaAbility } from '@casl/prisma';
import { Booking, Hotel, Review, Reward, Role, User } from '@prisma/client';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Edit = 'update',
  Delete = 'delete',
}

type AppSubjects = {
  User: User;
  Hotel: Hotel;
  Review: Review;
  Booking: Booking;
  Reward: Reward;
};

export type AppAbility = PureAbility<
  [Action, Subjects<AppSubjects>],
  PrismaQuery
>;

export class AbilityFactory {
  createForUser(user: User | null) {
    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);

    if (user?.role === Role.ADMIN) {
      builder.can(Action.Manage, 'User');
      builder.can(Action.Manage, 'Hotel');
      builder.can(Action.Manage, 'Review');
      builder.can(Action.Manage, 'Booking');
      builder.can(Action.Manage, 'Reward');
    } else if (user) {
      builder.can(Action.Read, 'User', { id: user.id });
      builder.can(Action.Edit, 'User', { id: user.id });
      builder.can(Action.Read, 'Hotel');
      builder.can(Action.Create, 'Review');
      builder.can(Action.Edit, 'Review', { userId: user.id });
      builder.can(Action.Delete, 'Review', { userId: user.id });
      builder.can(Action.Create, 'Booking');
      builder.can(Action.Edit, 'Booking', { userId: user.id });
      builder.can(Action.Delete, 'Booking', { userId: user.id });
      builder.can(Action.Read, 'Reward');

      if (
        user.role === Role.HOTELADMIN ||
        user.role === Role.HOTELRECEPTIONIST
      ) {
        user['hotelsAsAdmin'].forEach((hotel: Hotel) => {
          builder.can(Action.Edit, 'Hotel', { id: hotel.id });
          builder.can(Action.Delete, 'Hotel', { id: hotel.id });
          builder.can(Action.Create, 'Reward', { id: hotel.id });
          builder.can(Action.Edit, 'Reward', { id: hotel.id });
          builder.can(Action.Delete, 'Reward', { id: hotel.id });
        });
        user['hotelsAsReceptionist'].forEach((hotel: Hotel) => {
          builder.can(Action.Edit, 'Hotel', { id: hotel.id });
          builder.can(Action.Create, 'Reward', { id: hotel.id });
          builder.can(Action.Edit, 'Reward', { id: hotel.id });
          builder.can(Action.Delete, 'Reward', { id: hotel.id });
        });
      }
    }

    return builder.build();
  }
}
