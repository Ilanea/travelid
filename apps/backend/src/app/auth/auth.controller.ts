import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, SignupDto } from "./dto";
import { AuthGuard } from "@nestjs/passport";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Creates a new user' })
  @Post('signup')
  async signup(@Body() dto: SignupDto) {
    try {
      return this.authService.signup(dto);
    } catch (error) {
      throw new UnauthorizedException('Signup failed');
    }
  }

  @ApiOperation({ summary: 'Login existing user' })
  @Post('login')
  async login(@Body() dto: LoginDto) {
    try {
      return this.authService.login(dto);
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
  async googleOAuthCallback(@Req() req) {
    try {
      return this.authService.handleGoogleOAuth(req);
    } catch (error) {
      throw new UnauthorizedException('Google OAuth failed');
    }
  }
}