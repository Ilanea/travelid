import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guard';
import { CategoryService } from './category.service';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto';
import { Role } from '../auth/roles/role.enum';
import { Roles } from '../auth/roles/role.decorator';


@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get('')
  async getAllCategories(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.categoryService.getAllCategories(parseInt(page), parseInt(pageSize));
  }

  @Get('/:categoryId')
  async getCategory(@Param('categoryId') categoryId: string) {
    return await this.categoryService.getCategory(parseInt(categoryId));
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Post('')
  async createCategory(@Body() dto: CreateCategoryDto) {
    return await this.categoryService.createCategory(dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Patch(':categoryId')
  async editCategory(@Param('categoryId') categoryId: string, @Body() dto: CreateCategoryDto) {
    return await this.categoryService.editCategory(parseInt(categoryId), dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId') categoryId: string) {
    return await this.categoryService.deleteCategory(parseInt(categoryId));
  }

}