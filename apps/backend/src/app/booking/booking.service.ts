import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '../auth/roles/role.enum';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}


}