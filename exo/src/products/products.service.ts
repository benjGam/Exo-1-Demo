import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createProductDto: CreateProductDto) {
    return await this.prisma.products.create({
      data: {
        name: createProductDto.name,
        description: createProductDto.description,
        price: createProductDto.price,
        quantity: createProductDto.quantity,
      },
    });
  }

  public async getByUUID(uuid: string) {
    return await this.prisma.products.findUnique({
      where: {
        UUID: uuid,
      },
    });
  }

  public async updateByUUID(uuid: string, updateProductDto: UpdateProductDto) {
    return await this.prisma.products.update({
      where: {
        UUID: uuid,
      },
      data: {
        name: updateProductDto.name,
        description: updateProductDto.description,
        price: updateProductDto.price,
        quantity: updateProductDto.quantity,
      },
    });
  }

  public async deleteByUUID(uuid: string) {
    return await this.prisma.products.delete({
      where: {
        UUID: uuid,
      },
    });
  }
}
