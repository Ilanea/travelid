import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { ChangePasswordDto, ChangeRoleDto, EditUserDto, ChangeActiveDto } from './dto';
import { UserService } from './user.service';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { Roles } from '../auth/roles/role.decorator';
import { Role } from '../auth/roles/role.enum';
import { PoliciesGuard } from '../auth/guard/policies.guard';
import { CheckPolicies } from '../auth/casl/policies.decorator';
import { ReadUserHandler } from '../auth/casl/policies/user.handler';

@ApiTags('users')
@ApiCookieAuth()
@Controller('users')
@UseGuards(AuthenticatedGuard, RolesGuard, PoliciesGuard)
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

  @CheckPolicies(ReadUserHandler)
  @Get('/:userId')
  async getUser(@Param('userId') userId: string) {
    const user = this.userService.getUser(parseInt(userId));
    return user;
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
}