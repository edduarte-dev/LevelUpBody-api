import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { UsuarioLogin } from '../entities/usuarioLogin.entity';
import { LocalAuthGuard } from '../guard/local-auth.guard';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('/logar')
  async login(@Body() user: UsuarioLogin): Promise<any> {
    return this.authService.login(user);
  }
}
