import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { AuthService } from '../auth/auth.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, AuthService ]
})
export class CategoryModule {}
