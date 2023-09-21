import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
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

  @Get('me')
  getMe(@Req() request) {
    return request.session.user;
  }

  @Get('oauth')
  getOauth(@Req() request) {
    return this.userService.checkOauth(request.session.user.id);
  }

  @Patch('edit')
  async editUser(@Body() dto: EditUserDto, @Req() request) {
    const user = await this.userService.editUser(request.session.user.id, dto);
    request.session.user = user;
    return user;
  }

  @Patch('password')
  async changePassword(@Body() dto: ChangePasswordDto, @Req() request) {
    const user = await this.userService.changePassword(request.session.user.id, dto);
    request.session.user = user;
    return user;
  }

  @Patch('role')
  @Roles(Role.ADMIN)
  async changeRole(@Body() dto: ChangeRoleDto) {
    const user = await this.userService.changeRole(dto);
    return user;
  }
}