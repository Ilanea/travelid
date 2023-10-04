import { Hotel, Role, User } from '@prisma/client';
import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Edit = 'update',
  Delete = 'delete',
}

type AppSubjects = { User: User; Hotel: Hotel };

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
    } else if (user) {
      builder.can(Action.Read, 'User', { id: user.id });
      builder.can(Action.Edit, 'User', { id: user.id });
      builder.can(Action.Read, 'Hotel');

      if (user.role === Role.HOTELADMIN || user.role === Role.HOTELRECEPTIONIST) {
        user['hotelsAsAdmin'].forEach((hotel: Hotel) => {
          builder.can(Action.Edit, 'Hotel', { id: hotel.id });
          builder.can(Action.Delete, 'Hotel', { id: hotel.id });
        });
        user['hotelsAsReceptionist'].forEach((hotel: Hotel) => {
          builder.can(Action.Edit, 'Hotel', { id: hotel.id });
        });
      }
    }

    return builder.build();
  }
}
