import {
  IsInt,
  IsNumber,
  IsString,
  Length,
  MaxLength,
  Min,
} from 'class-validator';

export default class CreateProductDto {
  @IsString()
  @Length(3, 20)
  public name: string;

  @IsString()
  @MaxLength(500)
  public description: string;

  @IsNumber()
  @Min(1)
  public price: number;

  @IsInt()
  @Min(1)
  public quantity: number;
}
