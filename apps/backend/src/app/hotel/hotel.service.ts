import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateHotelDto } from './dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class HotelService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    ) {}

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

}