import { Body, Controller, Delete, Get, Param, Patch, Query, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard, RolesGuard } from '../auth/guard';
import { BookingService } from './booking.service';
import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';
import { Roles } from '../auth/decorator';
import { Role } from '../auth/roles/role.enum';

@ApiTags('booking')
@ApiCookieAuth()
@Controller('booking')
@UseGuards(AuthenticatedGuard, RolesGuard)
export class BookingController {
  constructor(private bookingService: BookingService) {}

}