import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class CategoryService {
  constructor(
    private prisma: PrismaService,
    private authService: AuthService,
    ) {}

    async getAllCategories(page: number, pageSize: number) {
      const skip = (page - 1) * pageSize;
      const categories = await this.prisma.category.findMany({
        skip,
        take: pageSize,
      });
      return categories;
    }

  async getCategory(categoryId: number) {
    const category = await this.prisma.category.findUnique({
      where: { id: categoryId },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async createCategory(dto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        ...dto,
      },
    });
    if(!category) {
      throw new BadRequestException('Category not created');
    }

    return category;
  }

  async editCategory(
    categoryId: number,
    dto: CreateCategoryDto,
  ) {
    const category = await this.prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        ...dto,
      },
    });
    if (!category) {
      throw new BadRequestException('Category not updated');
    }
    return category;
  }

  async deleteCategory(categoryId: number) {
    const category = await this.prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    if (!category) {
      throw new BadRequestException('Category not deleted');
    }
    return category;
  }

}