import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, CreateHotelDto, CreateReviewDto } from './dto';
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
        admins: {
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

  async getAllReviewsForHotel(hotelId: number, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;
    const hotel = await this.prisma.hotel.findUnique({
      where: {
        id: hotelId,
      },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    const reviews = await this.prisma.review.findMany({
      skip,
      take: pageSize,
      where: {
        hotelId: hotelId,
      },
    });
    return reviews;
  }

  async createReview(dto: CreateReviewDto, hotelId: number, userId: number) {
    const user = await this.authService.getUserById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const hotel = await this.prisma.hotel.findUnique({
      where: {
        id: hotelId,
      },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }

    const review = await this.prisma.review.create({
      data: {
        ...dto,
        user: {
          connect: { id: userId },
        },
        hotel: {
          connect: { id: hotelId },
        },
      },
    });
    if(!review) {
      throw new BadRequestException('Review not created');
    }

    return review;
  }

  async deleteReview(hotelId: number, reviewId: number) {
    const review = await this.prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    const deleteReview = await this.prisma.review.delete({
      where: {
        id: reviewId,
      },
    });
    
    if (!deleteReview) {
      return { message: 'Review deleted' };
    } else {
      throw new BadRequestException('Review could not be deleted');
    }
  }

  async editReview(hotelId: number, reviewId: number, dto: CreateReviewDto, userId: number) {
    const checkReview = await this.prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    });
    if (!checkReview) {
      throw new NotFoundException('Review not found');
    }
    const review = await this.prisma.review.update({
      where: {
        id: reviewId,
      },
      data: {
        ...dto,
      },
    });

    return review;
  }

  async createHotelCategory(hotelId: number, dto: CreateCategoryDto) {
    const hotel = await this.prisma.hotel.findUnique({
      where: {
        id: hotelId,
      },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    const category = await this.prisma.category.create({
      data: {
        ...dto,
        hotel: {
          connect: { id: hotelId },
        },
      },
    });
    if(!category) {
      throw new BadRequestException('Category not created');
    }

    return category;
  }

  async editHotelCategory(hotelId: number, categoryId: number, dto: CreateCategoryDto) {
    const category = await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        ...dto,
      },
    });

    return category;
  }

  async deleteHotelCategory(hotelId: number, categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    const deleteCategory = await this.prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    
    if (!deleteCategory) {
      return { message: 'Category deleted' };
    } else {
      throw new BadRequestException('Category could not be deleted');
    }
  }

  async getAllCategoriesForHotel(hotelId: number) {
    const hotel = await this.prisma.hotel.findUnique({
      where: {
        id: hotelId,
      },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel not found');
    }
    const categories = await this.prisma.category.findMany({
      where: {
        hotelId: hotelId,
      },
    });
    return categories;
  }

}