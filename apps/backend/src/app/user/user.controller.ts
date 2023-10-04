import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UnauthorizedException, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { ChangePasswordDto, ChangeRoleDto, EditUserDto, ChangeActiveDto } from './dto';
import { UserService } from './user.service';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { Roles } from '../auth/roles/role.decorator';
import { Role } from '../auth/roles/role.enum';
import { PoliciesGuard } from '../auth/guard/policies.guard';
import { CheckPolicies } from '../auth/casl/policies.decorator';
import { EditUserHandler, ManageUserHandler, ReadUserHandler } from '../auth/casl/policies/user.handler';

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
}