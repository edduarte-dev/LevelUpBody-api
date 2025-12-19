import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Dados } from '../entities/dado.entity';
import { Usuario } from '../../usuarios/entities/usuario.entity';

@Injectable()
export class DadosService {
  constructor(
    @InjectRepository(Dados)
    private dadosRepository: Repository<Dados>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  private classificacaoImc(imc: number): string {
    if (imc < 18.5) return 'Abaixo do peso';
    if (imc < 25) return 'Peso normal';
    if (imc < 30) return 'Sobrepeso';
    return 'Obesidade';
  }

  async findAll(): Promise<Dados[]> {
    return this.dadosRepository.find({
      relations: ['usuario'],
    });
  }

  async findById(id: number): Promise<Dados> {
    const dados = await this.dadosRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });

    if (!dados) {
      throw new HttpException(
        'Informação não encontrada!',
        HttpStatus.NOT_FOUND,
      );
    }

    return dados;
  }

  async create(dados: Dados): Promise<Dados> {
    if (dados.altura <= 0) {
      throw new BadRequestException('Altura inválida');
    }

    const usuario = await this.usuarioRepository.findOne({
      where: { id: dados.usuario.id },
    });

    if (!usuario) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    // Função Especial
    const imcCalculado = dados.peso / (dados.altura * dados.altura);
    const imcFormatado = Number(imcCalculado.toFixed(2));

    dados.imc = imcFormatado;
    dados.classificacao = this.classificacaoImc(imcFormatado);
    dados.usuario = usuario;

    return await this.dadosRepository.save(dados);
  }

  async update(dados: Dados): Promise<Dados> {
    await this.findById(dados.id);
    return this.dadosRepository.save(dados);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.dadosRepository.delete(id);
  }
}
