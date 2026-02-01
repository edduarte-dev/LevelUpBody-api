import { JwtService } from '@nestjs/jwt';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Bcrypt } from '../bcrypt/bcrypt';
import { UsuarioService } from '../../usuarios/services/usuario.service';
import { UsuarioLogin } from '../entities/usuarioLogin.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { GoogleService } from '../google/google.service';

@Injectable()
export class AuthService {
  constructor(
    private usuarioService: UsuarioService,
    private jwtService: JwtService,
    private bcrypt: Bcrypt,
    private googleService: GoogleService,
  ) {}

  // ============================
  // 🔐 LOGIN TRADICIONAL (LOCAL)
  // ============================
  async validateUser(username: string, password: string) {
    const usuario = await this.usuarioService.findByUsuario(username);

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    if (usuario.provider === 'GOOGLE') {
      throw new UnauthorizedException(
        'Usuário cadastrado com Google. Use login com Google.',
      );
    }

    if (!usuario.senha) {
      throw new UnauthorizedException('Usuário não possui senha cadastrada.');
    }

    const senhaValida = await this.bcrypt.compararSenhas(
      password,
      usuario.senha,
    );

    if (!senhaValida) {
      throw new UnauthorizedException('Senha inválida');
    }

    // remove senha do retorno
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha, ...resultado } = usuario;
    return resultado;
  }

  async login(usuarioLogin: UsuarioLogin) {
    const usuario = await this.usuarioService.findByUsuario(
      usuarioLogin.usuario,
    );

    if (!usuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const payload = { sub: usuario.usuario };

    return {
      id: usuario.id,
      nome: usuario.nome,
      usuario: usuario.usuario,
      foto: usuario.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }

  // ============================
  // 🔐 LOGIN COM GOOGLE (CORRIGIDO)
  // ============================
  async loginWithGoogle(idToken: string) {
    if (!idToken) {
      throw new UnauthorizedException('ID Token não informado');
    }

    let googleUser;

    try {
      // 🔍 valida token com o Google (ponto CRÍTICO)
      googleUser = await this.googleService.verifyToken(idToken);
    } catch {
      throw new UnauthorizedException('Token do Google inválido');
    }

    let usuario = await this.usuarioService.findByUsuario(googleUser.email);

    // 🆕 usuário não existe → cria
    if (!usuario) {
      const novoUsuario: Usuario = {
        id: undefined as any,
        nome: googleUser.nome,
        usuario: googleUser.email,
        senha: null,
        foto: googleUser.foto ?? null,
        provider: 'GOOGLE',
        googleId: googleUser.googleId,
        dados: [],
      };

      usuario = await this.usuarioService.create(novoUsuario);
    }

    // ⚠️ usuário existe mas é LOCAL
    if (usuario.provider === 'LOCAL') {
      throw new HttpException(
        'Usuário já cadastrado com senha. Use login tradicional.',
        HttpStatus.CONFLICT,
      );
    }

    const payload = { sub: usuario.usuario };

    return {
      id: usuario.id,
      nome: usuario.nome,
      usuario: usuario.usuario,
      foto: usuario.foto,
      token: `Bearer ${this.jwtService.sign(payload)}`,
    };
  }
}
