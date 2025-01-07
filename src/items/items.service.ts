import { ConflictException, Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor (private readonly prismaService: PrismaService){}
  async create(createItemDto: CreateItemDto) {
    let item = await this.prismaService.item.findFirst({
      where: { name: createItemDto.name },
    });

    return this.prismaService.$transaction(async (tx) => {
      if (!item){
        item = await tx.item.create({ data: createItemDto });
      }

      const itemOrganization = await tx.itemOrganization.findFirst({
        where: {
          item_id: item.id,
          organization_id: createItemDto.organization_id,
        },
      });

      if (itemOrganization){
        throw new ConflictException('This item has already been added!');
      }

      await tx.itemOrganization.create({
        data: {
          item_id: item.id,
          organization_id: createItemDto.organization_id,
          ...(createItemDto.quantity && {
            quantity: createItemDto.quantity,
          }),
        },
      });
      return item;
    });
  }

  async findAll(organization_id: number) {
    return this.prismaService.itemOrganization.findMany({
      where: {
        organization_id,
      },
      include: {
        item: true,
      },
    });
  }

  async findOne(id: number) {
    return `This action returns a #${id} item`;
  }

  async update(id: number, updateItemDto: UpdateItemDto) {
    return `This action updates a #${id} item`;
  }

  async remove(id: number) {
    return `This action removes a #${id} item`;
  }
}
