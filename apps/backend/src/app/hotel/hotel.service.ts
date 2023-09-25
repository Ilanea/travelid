import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHotelDto } from './dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HotelService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    ) {}

    async getAllHotels(page: number, pageSize: number) {
      const skip = (page - 1) * pageSize;
      const hotels = await this.prisma.hotel.findMany({
        skip,
        take: pageSize,
      });
      return hotels;
    }

  async getHotel(hotelId: number) {
    const hotel = await this.prisma.hotel.findUnique({
      where: { id: hotelId },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    return hotel;
  }

  async createHotel(dto: CreateHotelDto, userId: number) {
    const hotelmanager = await this.authService.getUserById(userId);
    if (!hotelmanager) {
      throw new BadRequestException('Hotel manager not found');
    }
    const hotel = await this.prisma.hotel.create({
      data: {
        ...dto,
        managedBy: {
          connect: { id: hotelmanager.id },
        },
      },
    });
    if(!hotel) {
      throw new BadRequestException('Hotel not created');
    }

    return hotel;
  }

  async editHotel(
    hotelId: number,
    dto: CreateHotelDto,
  ) {
    const hotel = await this.prisma.hotel.update({
      where: {
        id: hotelId,
      },
      data: {
        ...dto,
      },
    });

    return hotel;
  }

  async deleteHotel(hotelId: number) {
    const hotel = await this.prisma.hotel.findUnique({
      where: {
        id: hotelId,
      },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    const deleteHotel = await this.prisma.hotel.delete({
      where: {
        id: hotelId,
      },
    });
    
    if (!deleteHotel) {
      return { message: 'Hotel deleted' };
    } else {
      throw new BadRequestException('Hotel could not be deleted');
    }
  }

  async getHotelBookings(hotelId: number) {
    const hotel = await this.prisma.hotel.findUnique({
      where: {
        id: hotelId,
      },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    const bookings = await this.prisma.booking.findMany({
      where: {
        hotelId: hotelId,
      },
    });
    return bookings;
  }

}