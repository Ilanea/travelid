import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { ApiTags, ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { AuthDto } from "./dto";

@ApiTags('auth')
@Controller('auth')
export class AuthController{
    constructor(private authService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.authService.signup(dto)
    }

    @Post('login')
    signin(@Body() dto: AuthDto) {
        return this.authService.login(dto)
    }
}