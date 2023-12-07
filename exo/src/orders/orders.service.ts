import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  private async generateForwardDate(daysToAdd: number, from?: Date) {
    const newDate = from ?? new Date();
    newDate.setDate(newDate.getDate() + daysToAdd);
    return newDate;
  }

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
        deliver_at: await this.generateForwardDate(7),
      },
      select: {
        total_cost: true,
        user: true,
        total_product_quantity: true,
        Belong: {
          select: {
            Product: true,
          },
        },
      },
    });
  }

  public async getByNumber(orderNumber: number) {
    return await this.prisma.orders.findUnique({
      where: {
        number: orderNumber,
      },
      include: {
        Belong: {
          select: {
            Product: true,
          },
        },
      },
    });
  }

  public async deleteByNumber(orderNumber: number) {
    return await this.prisma.orders.delete({
      where: {
        number: orderNumber,
      },
    });
  }
}
