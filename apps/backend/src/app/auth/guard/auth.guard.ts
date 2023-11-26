import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  // Passport Logs
  handleRequest(err, user, info, context, status) {
    console.log('LocalAuthGuard - err:', err);
    console.log('LocalAuthGuard - user:', user);
    console.log('LocalAuthGuard - info:', info);
    console.log('LocalAuthGuard - context:', context);
    console.log('LocalAuthGuard - status:', status);
    return super.handleRequest(err, user, info, context, status);
  }
  async canActivate(context: ExecutionContext) {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    await super.logIn(request);
    return result;
  }
}