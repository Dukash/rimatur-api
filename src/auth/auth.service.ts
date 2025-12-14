import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user || user.password !== loginDto.password) {
      throw new UnauthorizedException('Email ou senha inválidos');
    }

    // Token simples só para o case (id do usuário em string)
    const token = `token-${user.id}`;

    return {
      token,
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role  // Adicione esta linha
    };
  }

  async register(createUserDto: CreateUserDto) {
    // cria o usuário usando o UsersService
    const user = await this.usersService.create(createUserDto);

    // já devolve no mesmo formato do login
    const token = `token-${user.id}`;

    return {
      token,
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role  // Adicione esta linha
    };
  }
}
