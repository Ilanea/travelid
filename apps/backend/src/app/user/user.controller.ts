import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guard';

@ApiTags('users')
@Controller('users')
export class UserController {

  @UseGuards(JwtGuard)
  @Get('me')
  getMe() {
    return 'AYE';
  }
}
