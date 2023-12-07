import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  private async getProducts(productUUIDS: string[]) {
    return await this.prisma.products.findMany({
      where: {
        OR: productUUIDS.map((product) => ({
          UUID: product,
        })),
      },
    });
  }

  public async create(createOrderDto: CreateOrderDto) {
    const orderedProducts = await this.getProducts(
      createOrderDto.products_uuid,
    );

    const totalCost = orderedProducts
      .map((product) => product.price)
      .reduce((total, current) => total + current);

    return await this.prisma.orders.create({
      data: {
        total_cost: totalCost,
        user: {
          connect: {
            UUID: createOrderDto.user_uuid,
          },
        },
        Belong: {
          createMany: {
            data: orderedProducts.map((product) => ({
              product_UUID: product.UUID,
            })),
          },
        },
        total_product_quantity: orderedProducts.length,
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
