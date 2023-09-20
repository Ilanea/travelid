import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards, Res } from "@nestjs/common";
import { Response, Request } from 'express';
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, SignupDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "./decorator";
import { JwtGuard } from "./guard";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Creates a new user' })
  @Post('signup')
  async signup(@Body() dto: SignupDto, @Res({ passthrough: true }) response: Response) {
    try {
      const userInfo = await this.authService.signup(dto);
      const refreshToken = await this.authService.refreshToken(userInfo.id, userInfo.email);

      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return userInfo;
    } catch (error) {
      throw new UnauthorizedException('Signup failed');
    }
  }

  @ApiOperation({ summary: 'Login existing user' })
  @Post('login')
  async login(@Body() dto: LoginDto, @Res({ passthrough: true }) response: Response) {
    try {

      const userInfo = await this.authService.login(dto);
      const refreshToken = await this.authService.refreshToken(userInfo.id, userInfo.email);

      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return userInfo;
    } catch (error) {
      throw new UnauthorizedException('Login failed');
    }
  }

  @ApiOperation({ summary: 'Start Google Oauth procedure' })
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleOAuth() {
    return { message: 'Initiating Google OAuth' };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleOAuthCallback(@Req() req, @Res({ passthrough: true }) response: Response) {
    try {
      const userInfo = await this.authService.handleGoogleOAuth(req);
      const refreshToken = await this.authService.refreshToken(userInfo.id, userInfo.email);

      response.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return userInfo;
    } catch (error) {
      throw new UnauthorizedException('Google OAuth failed');
    }
  }

  @Get('logout')
  @UseGuards(JwtGuard)
  async logout(@GetUser('id') userId: number) {
    return this.authService.logout(userId)
  }

  @Get('refresh')
  async refresh(@Req() request: Request) {
    try {
      const accessToken = await this.authService.checkRequestToken(request.cookies['refreshToken']);
      return { access_token: accessToken }
    } catch (error) {
      throw new UnauthorizedException('Refresh failed');
    }
  }

}