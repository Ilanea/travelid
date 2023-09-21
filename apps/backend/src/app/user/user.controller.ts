import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { ChangePasswordDto, EditUserDto } from './dto';
import { UserService } from './user.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Returns current user' })
  @Get('me')
  getMe(@GetUser() user: User) {
    console.log('endpoint hit');
    console.log('backend user',user);
    
    return user;
  }

  @ApiOperation({ summary: 'Checks if current user is using Oauth' })
  @Get('oauth')
  getOauth(@GetUser('id') userId: number) {
    return this.userService.checkOauth(userId);
  }

  @Patch('edit')
  editUser(
    @GetUser('id') userId: number,
    @Body() dto: EditUserDto,
  ) {
    return this.userService.editUser(userId, dto);
  }

  @Patch('password')
  changePassword(
    @GetUser('id') userId: number,
    @Body() dto: ChangePasswordDto,
  ) {
    return this.userService.changePassword(userId, dto);
  }
}