import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
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

  @Post()
  create(@Body() classificacaoImc: ClassificacaoImc): Promise<ClassificacaoImc>{
    return this.classificacaoService.create(classificacaoImc);
  }

 


  

}
