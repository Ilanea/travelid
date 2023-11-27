import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private prisma: PrismaService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const apiKeyHeader = request.headers['api-key'];

    if (!apiKeyHeader) {
      throw new UnauthorizedException('No API key provided');
    }

    // kA wie man user anhand vom encrypted api key findet ...

    return true;
  }
}