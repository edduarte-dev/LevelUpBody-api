import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Body,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioLogin } from '../entities/usuarioLogin.entity';
import { LocalAuthGuard } from '../guard/local-auth.guard';

class GoogleLoginDto {
  idToken: string;
}

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ============================
  // 🔐 LOGIN TRADICIONAL (LOCAL)
  // ============================
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/logar')
  async login(@Body() user: UsuarioLogin) {
    return this.authService.login(user);
  }

  // ============================
  // 🔐 LOGIN COM GOOGLE
  // ============================
  @HttpCode(HttpStatus.OK)
  @Post('/google')
  async loginWithGoogle(@Body() body: GoogleLoginDto) {
    if (!body?.idToken) {
      throw new BadRequestException('idToken não informado');
    }

    return this.authService.loginWithGoogle(body.idToken);
  }
}
