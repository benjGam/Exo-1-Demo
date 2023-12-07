import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  public create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get(':id')
  public getByNumber(@Param('id') id: string) {
    return this.ordersService.getByNumber(+id);
  }

  @Delete(':id')
  public deleteByNumber(@Param('id') id: string) {
    return this.ordersService.deleteByNumber(+id);
  }
}
