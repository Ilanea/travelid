import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy, GoogleStrategy, SessionSerializer } from "./strategy";
import { PassportModule } from "@nestjs/passport";
import {JwtModule} from '@nestjs/jwt';


@Module({
  imports: [PassportModule.register({ session: true }), JwtModule.register({secret: 'secret', signOptions:{expiresIn: '1h'},}),],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, GoogleStrategy, SessionSerializer ],
})
export class AuthModule{}