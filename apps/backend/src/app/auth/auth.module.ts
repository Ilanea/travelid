import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { LocalStrategy } from "./strategy";
import { GoogleStrategy } from "./strategy/oauth.strategy";
import { RefreshStrategy } from "./strategy/refresh.strategy";

@Module({
  imports: [JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, GoogleStrategy, RefreshStrategy],
})
export class AuthModule{}