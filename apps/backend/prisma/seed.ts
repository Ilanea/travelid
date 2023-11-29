import { PrismaClient } from '@prisma/client';
import { gu } from 'date-fns/locale';

import {
  admin,
  bookings,
  guestUsers,
  hotel,
  hotelUsers,
  rewards,
} from './data';

const prisma = new PrismaClient();

const loadUsers = async () => {
  try {
    await prisma.booking.deleteMany();
    await prisma.user.deleteMany();
    await prisma.hotel.deleteMany();
    await prisma.reward.deleteMany();

    await prisma.$queryRaw`ALTER SEQUENCE "users_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "hotels_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "bookings_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "reward_id_seq" RESTART WITH 1;`;

    await prisma.user.createMany({
      data: guestUsers,
    });

    await prisma.user.createMany({
      data: admin,
    });

    await prisma.hotel.create({
      data: {
        ...hotel,
        admins: {
          create: hotelUsers[0],
        },
        receptionists: {
          create: hotelUsers[1],
        },
      },
    });

    for (const booking of bookings) {
      const { hotelId, userId, ...myBooking } = booking;
      await prisma.booking.create({
        data: {
          ...myBooking,
          user: {
            connect: {
              id: userId,
            },
          },
          hotel: {
            connect: {
              id: hotelId,
            },
          },
        },
      });
    }

    for (const reward of rewards) {
      const { hotelId, ...myReward } = reward;
      await prisma.reward.create({
        data: {
          ...myReward,
          hotel: {
            connect: {
              id: hotelId,
            },
          },
        },
      });
    }
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

const main = async () => {
  loadUsers();
  //loadHotel();
  //loadBookings();
};

main();
