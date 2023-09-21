import { Body, Controller, Delete, Get, Param, Patch, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { ChangePasswordDto, ChangeRoleDto, EditUserDto } from './dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../auth/decorator';
import { Role } from '../auth/roles/role.enum';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthenticatedGuard, RolesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @Get('')
  @Roles(Role.ADMIN)
  async getAllUsers() {
    return this.userService.getAllUsers();
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
}