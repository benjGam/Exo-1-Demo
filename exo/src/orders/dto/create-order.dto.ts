export class CreateOrderDto {
  public user_uuid: string;
  public total_cost: number;
  public products_uuid: { product_UUID: string }[];
}
