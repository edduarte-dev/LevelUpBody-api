import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClassificacaoImc } from '../entities/classificacao.entity';

@Injectable()
export class ClassificacaoService {
  constructor(
    @InjectRepository(ClassificacaoImc)
    private classificacaoRepository: Repository<ClassificacaoImc>,
  ) {}

  async create(classificacaoImc: ClassificacaoImc): Promise<ClassificacaoImc> {
    return await this.classificacaoRepository.save(classificacaoImc);
  }

  async findAll(): Promise<ClassificacaoImc[]> {
    return await this.classificacaoRepository.find({
      relations: {
        dados: true,
      },
    });
  }
}
