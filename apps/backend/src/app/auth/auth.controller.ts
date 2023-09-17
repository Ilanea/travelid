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
      const access_token = await this.authService.signup(dto);
      return { message: 'Signup successful', access_token };
    } catch (error) {
      throw new UnauthorizedException('Signup failed');
    }
  }

  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      const access_token = await this.authService.login(dto);
      return { message: 'Login successful', access_token };
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
      const access_token = await this.authService.handleGoogleOAuth(req);
      return { message: 'Google OAuth successful', access_token };
    } catch (error) {
      throw new UnauthorizedException('Google OAuth failed');
    }
  }
}