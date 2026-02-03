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

  // =========================
  // LOGIN LOCAL
  // =========================
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

  // =========================
  // LOGIN GOOGLE (CORRIGIDO)
  // =========================
  async loginWithGoogle(idToken: string) {
    if (!idToken) {
      throw new UnauthorizedException('ID Token não informado');
    }

    // 1️⃣ Valida token com Google
    const googleUser = await this.googleService.verifyToken(idToken);

    // 2️⃣ Busca usuário pelo e-mail
    let usuario = await this.usuarioService.findByUsuario(googleUser.email);

    // 3️⃣ Se NÃO existir → cria usuário GOOGLE
    if (!usuario) {
      const novoUsuario: Usuario = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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
    // 4️⃣ Se existir → vincula Google se necessário
    else {
      if (!usuario.googleId) {
        usuario.googleId = googleUser.googleId;
        usuario.provider = 'GOOGLE';
        usuario.foto = usuario.foto ?? googleUser.foto ?? null;

        await this.usuarioService.update(usuario);
      }
    }

    // 5️⃣ Gera JWT
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
