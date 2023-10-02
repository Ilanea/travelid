// AbilityFactory.ts
import { Hotel, Role, User } from '@prisma/client';
import { AbilityBuilder, PureAbility } from '@casl/ability';
import { createPrismaAbility, PrismaQuery, Subjects } from '@casl/prisma';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Edit = 'update',
}

type AppSubjects = { User: User; Hotel: Hotel };

export type AppAbility = PureAbility<
  [Action, Subjects<AppSubjects>],
  PrismaQuery
>;

export class AbilityFactory {
  createForUser(user: User | null, hotelId?: number) {
    const builder = new AbilityBuilder<AppAbility>(createPrismaAbility);

    if (user?.role === Role.ADMIN) {
      builder.can(Action.Manage, 'User');
      builder.can(Action.Manage, 'Hotel');
    } else if (user) {
      builder.can(Action.Read, 'User', { id: user.id });
      builder.can(Action.Edit, 'User', { id: user.id });

      if (user.role === Role.USER) {
        // You can define permissions for regular users here.
      } else if (user.role === Role.HOTELADMIN || user.role === Role.HOTELRECEPTIONIST) {
        if (hotelId) {
          if (user['hotelsAsAdmin'].some((h) => h.id === hotelId)) {
            builder.can(Action.Manage, 'Hotel');
          }
          if (user['hotelsAsReceptionist'].some((h) => h.id === hotelId)) {
            builder.can(Action.Read, 'Hotel');
            builder.can(Action.Edit, 'Hotel');
          }
        }
      }
    }

    return builder.build();
  }
}
