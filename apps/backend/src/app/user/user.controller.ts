import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Query, Req, Res, UnauthorizedException, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { ChangePasswordDto, ChangeRoleDto, EditUserDto, ChangeActiveDto } from './dto';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { ApiTags, ApiCookieAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Roles } from '../auth/roles/role.decorator';
import { Role } from '../auth/roles/role.enum';
import { PoliciesGuard } from '../auth/guard/policies.guard';
import { CheckPolicies } from '../auth/casl/policies.decorator';
import { EditUserHandler, ManageUserHandler, ReadUserHandler } from '../auth/casl/policies/user.handler';
import { FileInterceptor } from '@nestjs/platform-express';
// This is a hack to make Multer available in the Express namespace
import { Multer, diskStorage } from 'multer';
import * as fs from 'fs';
import Path from 'path'
import path from 'path';

@ApiTags('users')
@ApiCookieAuth()
@Controller('users')
@UseGuards(AuthenticatedGuard, RolesGuard, PoliciesGuard)
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

  @CheckPolicies(ReadUserHandler)
  @Get('/:userId')
  async getUser(@Param('userId') userId: string) {
    return await this.userService.getUser(parseInt(userId));
  }

  @CheckPolicies(EditUserHandler)
  @Patch('/:userId')
  async editUser(@Param('userId') userId: string, @Body() dto: EditUserDto) {
    return await this.userService.editUser(parseInt(userId), dto);
  }

  @CheckPolicies(ManageUserHandler)
  @Delete('/:userId')
  async deleteUser(@Param('userId') userId: string) {
    return await this.userService.deleteUser(parseInt(userId));
  }

  @CheckPolicies(EditUserHandler)
  @Patch('/:userId/password')
  async changePassword(@Param('userId') userId: string, @Body() dto: ChangePasswordDto) {
    return await this.userService.changePassword(parseInt(userId), dto);
  }

  @Roles(Role.ADMIN)
  @CheckPolicies(ManageUserHandler)
  @Patch('/:userId/role')
  async changeRole(@Param('userId') userId: string, @Body() dto: ChangeRoleDto) {
    return await this.userService.changeRole(parseInt(userId), dto);
  }

  @Roles(Role.ADMIN)
  @CheckPolicies(ManageUserHandler)
  @Patch('/:userId/active')
  async changeActive(@Param('userId') userId: string, @Body() dto: ChangeActiveDto) {
    return await this.userService.changeActive(parseInt(userId), dto);
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
        //const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1e9);
        //cb(null, uniqueSuffix + '_' + file.originalname);

        const extname = path.extname(file.originalname).toLowerCase();
        const newFilename = `avatar${extname}`;
        cb(null, newFilename);
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
  @CheckPolicies(EditUserHandler)
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
  
      // Return Image
      //const avatarPath = `../../../apps/backend/uploads/${request.session.user.id}/${avatarFileName}`;
      //res.sendFile(path.join(__dirname, avatarPath));

      // return URL
      const userId = request.session.user.id;
      const serverUrl = process.env.SERVER_URL || 'http://localhost:3333';
      const avatarUrl = `${serverUrl}/uploads/${userId}/${avatarFileName}`;
      return res.json({ avatarUrl });
  }
}