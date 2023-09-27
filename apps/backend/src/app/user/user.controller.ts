import { BadRequestException, Body, Controller, Delete, FileTypeValidator, Get, HttpStatus, MaxFileSizeValidator, NotFoundException, Param, ParseFilePipe, ParseFilePipeBuilder, Patch, Post, Query, Req, Res, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
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
import { PrismaService } from '../prisma/prisma.service';

@ApiTags('users')
@ApiCookieAuth()
@Controller('users')
@UseGuards(AuthenticatedGuard, RolesGuard)
export class UserController {
  constructor(
    private userService: UserService,
    private prisma: PrismaService
  ) {}

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
        const userId = req.params.userId;
        const dest = `apps/backend/uploads/${userId}`;
        fs.access(dest, function (error) {
          if (error) {
            return fs.mkdir(dest, (mkdirError) => cb(mkdirError, dest));
          } else {

            // Not a nice solution, but it deletes all existing files in the folder to not clutter the filesystem with unused files
            fs.readdir(dest, (readdirError, files) => {
              if (readdirError) {
                return cb(readdirError, dest);
              }
  
              files.forEach((filename) => {
                fs.unlink(path.join(dest, filename), (unlinkError) => {
                  if (unlinkError) {
                    console.error(`Error deleting file ${filename}: ${unlinkError}`);
                  }
                });
              });
  
              return cb(null, dest);
            });
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
      const acceptedExtensionsList = [".jpg", ".jpeg", ".png"];
      const extname = path.extname(file.originalname).toLowerCase();
      if (acceptedExtensionsList.includes(extname)) {
        cb(null, true);
      } else {
        cb(new BadRequestException('File extension not allowed'), false);
      }
    }
  }))
  @Post('/:userId/avatar')
  async uploadProfilePicture(
    @Req() request,
    @Res() res,
    @UploadedFile() file: Express.Multer.File) {
      if (!file) {
        throw new BadRequestException('File not found');
      }
      if(request.session.user.id !== parseInt(request.params.userId)) {
        throw new UnauthorizedException('You are not authorized to perform this action.');
      }
      const user = await this.prisma.user.update({
        where: {
          id: request.session.user.id,
        },
        data: {
          avatar: file.filename,
        },
      });
  
      if (!user) {
        throw new BadRequestException('User not found');
      }
  
      const avatarFileName = user.avatar;
  
      if (!avatarFileName) {
        throw new NotFoundException('Avatar not found');
      }
  
      const avatarPath = `../../../apps/backend/uploads/${request.session.user.id}/${avatarFileName}`;

      res.sendFile(path.join(__dirname, avatarPath));
  }
}