import { PrismaClient } from '@prisma/client';

import {
  admin,
  bookings,
  guestUsers,
  hotel,
  hotelUsers,
  properties,
  rewards,
} from './data';

const prisma = new PrismaClient();

const loadUsers = async () => {
  try {
    await prisma.reward.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.hotelProperty.deleteMany();
    await prisma.hotelPropertySubCategory.deleteMany();
    await prisma.hotelPropertyCategory.deleteMany();
    await prisma.user.deleteMany();
    await prisma.hotel.deleteMany();

    await prisma.$queryRaw`ALTER SEQUENCE "users_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "hotels_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "bookings_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "reward_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "HotelProperty_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "HotelPropertySubCategory_id_seq" RESTART WITH 1;`;
    await prisma.$queryRaw`ALTER SEQUENCE "HotelPropertyCategory_id_seq" RESTART WITH 1;`;

    await prisma.user.createMany({
      data: guestUsers,
    });

    await prisma.user.createMany({
      data: admin,
    });

    for (const category of properties) {
      const newCategory = await prisma.hotelPropertyCategory.create({
        data: {
          name: category.name,
        },
      });
      for (const subCategory of category.subCategories) {
        const newSubCategory = await prisma.hotelPropertySubCategory.create({
          data: {
            name: subCategory.name,
            category: {
              connect: {
                id: newCategory.id,
              },
            },
          },
        });
        for (const property of subCategory.properties) {
          await prisma.hotelProperty.create({
            data: {
              ...property,
              subCategory: {
                connect: {
                  id: newSubCategory.id,
                },
              },
            },
          });
        }
      }
    }

    const { hotelProperties, ...myHotel } = hotel;
    await prisma.hotel.create({
      data: {
        ...myHotel,
        admins: {
          create: hotelUsers[0],
        },
        receptionists: {
          create: hotelUsers[1],
        },
        hotelProperties: {
          connect: hotelProperties,
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
