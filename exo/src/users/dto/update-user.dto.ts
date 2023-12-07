import { PartialType } from '@nestjs/mapped-types';
import CreateUserDto from './create-user.dto';
import { IsOptional } from 'class-validator';

export default class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  public nickname?: string;
  @IsOptional()
  public password?: string;
  @IsOptional()
  public username?: string;
}
