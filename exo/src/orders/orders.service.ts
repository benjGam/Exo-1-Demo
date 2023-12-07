import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  private async filterProductsUUID(productUUIDS: { product_UUID: string }[]) {
    return (
      await this.prisma.products.findMany({
        where: {
          OR: productUUIDS.map((uuid) => ({ UUID: uuid.product_UUID })),
        },
      })
    ).map((product) => ({ product_UUID: product.UUID }));
  }

  public async createOrder(createOrderDto: CreateOrderDto) {
    return await this.prisma.orders.create({
      data: {
        total_cost: createOrderDto.total_cost,
        user: {
          connect: {
            UUID: createOrderDto.user_uuid,
          },
        },
        Belong: {
          createMany: {
            data: await this.filterProductsUUID(createOrderDto.products_uuid),
          },
        },
        total_product_quantity: createOrderDto.products_uuid.length,
        deliver_at: new Date(),
      },
    });
  }

  findAll() {
    return `This action returns all orders`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
