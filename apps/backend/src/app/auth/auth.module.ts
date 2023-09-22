import { Module } from "@nestjs/common"
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy, GoogleStrategy, SessionSerializer } from "./strategy";
import { PassportModule } from "@nestjs/passport";


@Module({
  imports: [PassportModule.register({ session: true })],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, GoogleStrategy, SessionSerializer ],
})
export class AuthModule{}