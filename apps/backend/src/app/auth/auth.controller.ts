import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards, Res } from "@nestjs/common";
import { Response } from 'express';
import { AuthService } from "./auth.service";
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, SignupDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";
import { LocalAuthGuard } from "./guard/auth.guard";


@ApiTags('auth')
@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto, @Req() request) {
    const user = await this.authService.signup(dto);
    request.session.user = user;
    return user;
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() dto: LoginDto, @Req() request){
    const user = await this.authService.validateUser(dto.email, dto.password);
    request.session.user = user;
    return user;
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleOAuth() {
    return { message: 'Initiating Google OAuth' };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleOAuthCallback(@Req() request) {
    const user = await this.authService.validateOauthUser(request.user);
    if (!user) {
      throw new UnauthorizedException();
    }

    request.session.user = user;
    return user;
  }

  @Get('logout')
  async logout(@Req() request, @Res({ passthrough: true }) response: Response) {
    request.session.destroy();
    response.clearCookie('connect.sid');
    return { message: 'Logout successful' };
  }

}