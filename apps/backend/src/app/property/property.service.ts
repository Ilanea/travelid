import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePropertyDto } from './dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class PropertyService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    ) {}

    async getAllProperties() {
      const properties = await this.prisma.hotelPropertyCategory.findMany({
        select: {
          id: true,
          name: true,
          url: true,
          subCategories: {
            select: {
              id: true,
              name: true,
              properties: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },
          },
        },
      });
      return properties;
    }

  a/* sync getProperty(propertyId: number) {
    const property = await this.prisma.property.findUnique({
      where: { id: propertyId },
    });
    if (!property) {
      throw new NotFoundException('Property not found');
    }
    return property;
  }

  async createProperty(dto: CreatePropertyDto) {
    const property = await this.prisma.property.create({
      data: {
        ...dto,
      },
    });
    if(!property) {
      throw new BadRequestException('Property not created');
    }

    return property;
  }

  async editProperty(
    propertyId: number,
    dto: CreatePropertyDto,
  ) {
    const property = await this.prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        ...dto,
      },
    });
    if (!property) {
      throw new BadRequestException('Property not updated');
    }
    return property;
  }

  async deleteProperty(propertyId: number) {
    const property = await this.prisma.property.delete({
      where: {
        id: propertyId,
      },
    });
    if (!property) {
      throw new BadRequestException('Property not deleted');
    }
    return property;
  } */

}