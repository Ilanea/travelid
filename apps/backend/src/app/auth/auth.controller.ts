import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, SignupDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    try {
      return this.authService.signup(dto);
    } catch (error) {
      throw new UnauthorizedException('Signup failed');
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      return this.authService.login(dto);
    } catch (error) {
      throw new UnauthorizedException('Login failed');
    }
  }

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleOAuth() {
    return { message: 'Initiating Google OAuth' };
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleOAuthCallback(@Req() req) {
    try {
      return this.authService.handleGoogleOAuth(req);
    } catch (error) {
      throw new UnauthorizedException('Google OAuth failed');
    }
  }
}