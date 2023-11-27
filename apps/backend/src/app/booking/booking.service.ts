import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../auth/roles/role.enum';
import { User } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async getAllUserBookings(userId: number, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const bookings = await this.prisma.booking.findMany({
      where: {
        userId,
      },
      skip,
      take: pageSize,
    });
    return bookings;
  }

  async getBooking(bookingId: number, user: User) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    if (booking.userId !== user.id && user.role !== Role.ADMIN) {
      throw new UnauthorizedException('You are not allowed to access this booking');
    }
    return booking;
  }

  async createBooking(dto, userId: number) {
    const booking = await this.prisma.booking.create({
      data: {
        ...dto,
        user: {
          connect: { id: userId },
        },
      },
    });
    if (!booking) {
      throw new BadRequestException('Booking not created');
    }

    return booking;
  }

  async editBooking(bookingId: number, dto, user: User) {
    const booking = await this.prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        ...dto,
      },
    });
    if (!booking) {
      throw new BadRequestException('Booking not updated');
    }
    if (booking.userId !== user.id && user.role !== Role.ADMIN) {
      throw new UnauthorizedException('You are not allowed to access this booking');
    }

    return booking;
  }

  async deleteBooking(bookingId: number, user: User) {
    const booking = await this.prisma.booking.delete({
      where: {
        id: bookingId,
      },
    });
    if (!booking) {
      throw new BadRequestException('Booking not deleted');
    }
    if (booking.userId !== user.id && user.role !== Role.ADMIN) {
      throw new UnauthorizedException('You are not allowed to access this booking');
    }

    return booking;
  }
}