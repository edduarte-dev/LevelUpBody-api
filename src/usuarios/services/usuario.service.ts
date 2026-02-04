import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Bcrypt } from '../../auth/bcrypt/bcrypt';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
    private bcrypt: Bcrypt,
  ) {}

  async findByUsuario(usuario: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({
      where: { usuario },
    });
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findById(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id },
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado!', HttpStatus.NOT_FOUND);
    }

    return usuario;
  }

 
  async create(usuario: Usuario): Promise<Usuario> {
  const usuarioExistente = await this.findByUsuario(usuario.usuario);

  // 🟢 CASO 1 — Usuário NÃO existe → cria
  if (!usuarioExistente) {
    if (!usuario.senha) {
      throw new HttpException(
        'Senha é obrigatória para cadastro',
        HttpStatus.BAD_REQUEST,
      );
    }

    usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    usuario.provider = 'LOCAL';

    return this.usuarioRepository.save(usuario);
  }

  // 🟡 CASO 2 — Usuário existe, MAS NÃO tem senha (veio do Google)
  if (!usuarioExistente.senha) {
    if (!usuario.senha) {
      throw new HttpException(
        'Defina uma senha para essa conta',
        HttpStatus.BAD_REQUEST,
      );
    }

    usuarioExistente.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    usuarioExistente.provider = 'LOCAL';

    return this.usuarioRepository.save(usuarioExistente);
  }

  // 🔴 CASO 3 — Usuário já tem senha
  throw new HttpException(
    'Usuário já possui senha cadastrada',
    HttpStatus.BAD_REQUEST,
  );
}
  
  async update(usuario: Usuario): Promise<Usuario> {
    const usuarioExistente = await this.findById(usuario.id);

    const buscaUsuario = await this.findByUsuario(usuario.usuario);
    if (buscaUsuario && buscaUsuario.id !== usuario.id) {
      throw new HttpException(
        'Usuário (e-mail) já cadastrado!',
        HttpStatus.BAD_REQUEST,
      );
    }

    
    if (
      usuarioExistente.provider === 'LOCAL' &&
      usuario.senha &&
      usuario.senha !== usuarioExistente.senha
    ) {
      usuario.senha = await this.bcrypt.criptografarSenha(usuario.senha);
    } else {
      usuario.senha = usuarioExistente.senha;
    }

    usuario.provider = usuario.provider ?? usuarioExistente.provider;
    usuario.googleId = usuario.googleId ?? usuarioExistente.googleId;

    return this.usuarioRepository.save(usuario);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.usuarioRepository.delete(id);
  }
}
