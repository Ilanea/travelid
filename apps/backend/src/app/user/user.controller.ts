import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guard';
import { ChangePasswordDto, EditUserDto } from './dto';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@UseGuards(AuthenticatedGuard)
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
}