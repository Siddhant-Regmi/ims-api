import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrganizationDto } from './dto/create-organization.dto';
import { UpdateOrganizationDto } from './dto/update-organization.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrganizationsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createOrganizationDto: CreateOrganizationDto) {
    await this.checkIfOrganizatonExists(createOrganizationDto.name);
    return this.prismaService.organization.create({ data: createOrganizationDto});
  }

  async findAll() {
    return this.prismaService.organization.findMany();
  }

  async findOne(id: number) {
    return this.getOrganization(id);
  }

  async update(id: number, updateOrganizationDto: UpdateOrganizationDto) {
    await this.getOrganization(id);
    await this.checkIfOrganizatonExists(updateOrganizationDto.name, id);
    return this.prismaService.organization.update({
      where: { id },
      data: updateOrganizationDto,
    });
  }

  async remove(id: number) {
    await this.getOrganization(id);
    return this.prismaService.organization.delete({ where: { id }});
  }

  private async getOrganization(id: number){
    const organization = await this.prismaService.organization.findFirst({ where: { id }});

    if (!organization){ 
      throw new NotFoundException('Organization not found');
    }
    return organization;
  }

  private async checkIfOrganizatonExists(name: string, id?: number){
    const doesOrganizationExist = await this.prismaService.organization.findFirst({ where: { name },});
    if (doesOrganizationExist){ 
      if (id && doesOrganizationExist.id !== id){
        throw new BadRequestException(`Organization ${name} already exists`);
      } else if (!id){
        throw new BadRequestException(`Organization ${name} already exists`);
      }
    }
  }
}
