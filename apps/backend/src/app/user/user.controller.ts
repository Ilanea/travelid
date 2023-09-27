import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, ParseFilePipeBuilder, Patch, Post, Query, Req, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { ChangePasswordDto, ChangeRoleDto, EditUserDto, ChangeActiveDto } from './dto';
import { UserService } from './user.service';
import { ApiTags, ApiCookieAuth, ApiConsumes, ApiBody, ApiParam, ApiResponse } from '@nestjs/swagger';
import { Roles } from '../auth/decorator';
import { Role } from '../auth/roles/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
// This is a hack to make Multer available in the Express namespace
import { Multer, diskStorage } from 'multer';
import * as fs from 'fs';
import Path from 'path'
import path from 'path';

@ApiTags('users')
@ApiCookieAuth()
@Controller('users')
@UseGuards(AuthenticatedGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @Roles(Role.ADMIN)
  async getAllUsers(
    @Query('page') page: string,
    @Query('pageSize') pageSize: string,
  ) {
    return this.userService.getAllUsers(parseInt(page), parseInt(pageSize));
  }

  @Get('/:userId')
  async getUser(@Param('userId') userId: string,  @Req() request) {
    if (request.session.user.role === Role.ADMIN || request.session.user.id === parseInt(userId)) {
      return this.userService.getUser(parseInt(userId));
    } else {
      throw new UnauthorizedException('You are not authorized to perform this action.');
    } 
  }

  @Patch('/:userId')
  async editUser(@Param('userId') userId: string, @Body() dto: EditUserDto, @Req() request) {
    if (request.session.user.role === Role.ADMIN || request.session.user.id === parseInt(userId)) {
      const user = await this.userService.editUser(parseInt(userId), dto);
      return user;
    } else {
      throw new UnauthorizedException('You are not authorized to perform this action.');
    }
  }

  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string, @Req() request) {
    if (request.session.user.role === Role.ADMIN || request.session.user.id === parseInt(userId)) {
      const user = await this.userService.deleteUser(parseInt(userId));
      return user;
    } else {
      throw new UnauthorizedException('You are not authorized to perform this action.');
    }
  }

  @Patch('/:userId/password')
  async changePassword(@Param('userId') userId: string, @Body() dto: ChangePasswordDto, @Req() request) {
    if (request.session.user.role === Role.ADMIN || request.session.user.id === parseInt(userId)) {
      const user = await this.userService.changePassword(parseInt(userId), dto);
      return user;
    } else {
      throw new UnauthorizedException('You are not authorized to perform this action.');
    }
  }

  @Patch('/:userId/role')
  @Roles(Role.ADMIN)
  async changeRole(@Param('userId') userId: string, @Body() dto: ChangeRoleDto, @Req() request) {
    if (request.session.user.id === parseInt(userId)) {
      const user = await this.userService.changeRole(parseInt(userId), dto);
      return user;
    } else {
      throw new UnauthorizedException('You are not authorized to perform this action.');
    }
  }

  @Patch('/:userId/active')
  @Roles(Role.ADMIN)
  async changeActive(@Param('userId') userId: string, @Body() dto: ChangeActiveDto, @Req() request) {
    if (request.session.user.id === parseInt(userId)) {
      const user = await this.userService.changeActive(parseInt(userId), dto);
      return user;
    } else {
      throw new UnauthorizedException('You are not authorized to perform this action.');
    }
  }

  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Avatar',
    type: 'file',
    required: true,
    examples: {
      file: {
        value: 'multipart/form-data',
      },
    },
  })
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (req, file, cb) => {
        const userId = req.body.userId;
        const dest = `apps/backend/uploads/${userId}`;
        fs.access(dest, function (error) {
          if (error) {
            return fs.mkdir(dest, (error) => cb(error, dest));
          } else {
            return cb(null, dest);
          }
        });
      },
      filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '_' + file.originalname);
      },
    }),
    limits: { fileSize: 3000000 },
    fileFilter: (req, file, cb) => {
      if(req.session.user.id !== parseInt(req.body.userId)) {
        cb(new UnauthorizedException('You are not authorized to perform this action.'), false);
      } else { 
        const acceptedExtensionsList = [".jpg", ".jpeg", ".png"];
        const extname = path.extname(file.originalname).toLowerCase();
        if (acceptedExtensionsList.includes(extname)) {
          cb(null, true);
        } else {
          cb(new BadRequestException('File extension not allowed'), false);
        }
      }
    }
  }))
  @Post('/:userId/avatar')
  async uploadProfilePicture(
    @Param('userId') userId: string,
    @Req() request,
    @UploadedFile() file: Express.Multer.File) {
    if (request.session.user.role === Role.ADMIN || request.session.user.id === parseInt(userId)) {
      const user = await this.userService.uploadProfilePicture(parseInt(userId), file.filename);
      return user;
    } else {
      throw new UnauthorizedException('You are not authorized to perform this action.');
    }
  }
}