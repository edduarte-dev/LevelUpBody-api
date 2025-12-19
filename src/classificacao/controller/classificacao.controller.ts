import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ClassificacaoService } from '../services/classificacao.service';
import { ClassificacaoImc } from '../entities/classificacao.entity';

@Controller('/classificacaoImc')
export class ClassificacaoController {
  constructor(private readonly classificacaoService: ClassificacaoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<ClassificacaoImc[]> {
    return this.classificacaoService.findAll();
  }
}
