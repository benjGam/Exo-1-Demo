import { Injectable } from '@nestjs/common';
import CreateUserDto from './dto/create-user.dto';
import UpdateUserDto from './dto/update-user.dto';
import { PrismaService } from 'src/prisma.service';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    return await this.prisma.users.create({
      data: {
        nickname: createUserDto.nickname,
        username: createUserDto.username,
        password: await bcrypt.hash(createUserDto.password, 12),
      },
    });
  }

  public async getByUUID(uuid: string) {
    return await this.prisma.users.findUnique({
      where: {
        UUID: uuid,
      },
    });
  }
}
