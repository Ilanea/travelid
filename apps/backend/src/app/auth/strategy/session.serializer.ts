import { Injectable } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { AuthService } from "../auth.service";
import { User } from "@prisma/client";

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, id: number) => void): any {
    done(null, user.id);
  }

  deserializeUser(id: number, done: (err: Error, user: User) => void): any {
    this.authService.getUserById(id).then((user) => {
      done(null, user);
    }).catch((err) => {
      done(err, null);
    });
  }
}
