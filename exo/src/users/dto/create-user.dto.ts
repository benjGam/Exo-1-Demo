import { IsString, Length } from 'class-validator';

export default class CreateUserDto {
  @IsString()
  @Length(2, 20)
  public nickname: string;

  @IsString()
  @Length(7, 30)
  public username: string;

  @IsString()
  @Length(8, 140)
  public password: string;
}
