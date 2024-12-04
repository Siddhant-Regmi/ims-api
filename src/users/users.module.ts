import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrganizationsService } from 'src/organizations/organizations.service';
import { RolesService } from 'src/roles/roles.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, OrganizationsService, RolesService],
})
export class UsersModule {}
