import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    private config: ConfigService,
    private authService: AuthService,
  ) {
    super({
      clientID: config.get('OAUTH_CLIENT_ID'),
      clientSecret: config.get('OAUTH_CLIENT_SECRET'),
      callbackURL: config.get('OAUTH_CALLBACK_URL'),
      scope: ["email", "profile"],
    });
  }

  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: any,
  ) {
    const { name, emails } = profile
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName
    }
    return user;
  }
}