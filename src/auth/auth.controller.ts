import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    
    // Retorna o role junto com os dados
    return {
      token: user.token,
      userId: user.userId,
      name: user.name,
      role: user.role 
    };
  }

  @Post('register')
  async register(@Body() createUserDto) {
    return this.authService.register(createUserDto);
  }
}
