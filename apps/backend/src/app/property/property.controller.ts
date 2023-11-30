import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { AuthenticatedGuard } from '../auth/guard';
import { PropertyService } from './property.service';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { CreatePropertyDto } from './dto';
import { Role } from '../auth/roles/role.enum';
import { Roles } from '../auth/roles/role.decorator';


@ApiTags('properties')
@Controller('properties')
export class PropertyController {
  constructor(private propertyService: PropertyService) {}

  @Get('')
  async getAllProperties(
  ) {
    return this.propertyService.getAllProperties();
  }
/*   @Roles(Role.ADMIN) */
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Post('')
  async createProperty(@Body() dto: CreatePropertyDto) {
    return await this.propertyService.createProperty(dto);
  }


 /*  @Get('/:propertyId')
  async getProperty(@Param('propertyId') propertyId: string) {
    return await this.propertyService.getProperty(parseInt(propertyId));
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Post('')
  async createProperty(@Body() dto: CreatePropertyDto) {
    return await this.propertyService.createProperty(dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Patch(':propertyId')
  async editProperty(@Param('propertyId') propertyId: string, @Body() dto: CreatePropertyDto) {
    return await this.propertyService.editProperty(parseInt(propertyId), dto);
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthenticatedGuard)
  @ApiCookieAuth()
  @Delete(':propertyId')
  async deleteProperty(@Param('propertyId') propertyId: string) {
    return await this.propertyService.deleteProperty(parseInt(propertyId));
  } */

}