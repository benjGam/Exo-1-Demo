import { IsOptional } from 'class-validator';
import CreateProductDto from './create-product.dto';

export default class UpdateProductDto extends CreateProductDto {
  @IsOptional()
  public description: string;
  @IsOptional()
  public name: string;
  @IsOptional()
  public price: number;
  @IsOptional()
  public quantity: number;
}
