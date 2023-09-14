import { Body, Controller, Post, UnauthorizedException } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags } from '@nestjs/swagger';
import { LoginDto, SignupDto } from "./dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('signup')
    async signup(@Body() dto: SignupDto) {
        try {
            const user = await this.authService.signup(dto);
            return { message: 'Signup successful', user };
        } catch (error) {
            throw new UnauthorizedException('Signup failed');
        }
    }

    @Post('login')
    async login(@Body() dto: LoginDto) {
        try {
            const user = await this.authService.login(dto);
            return { message: 'Login successful', user };
        } catch (error) {
            throw new UnauthorizedException('Login failed');
        }
    }
}