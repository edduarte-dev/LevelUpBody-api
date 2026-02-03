import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { DadosService } from '../services/dado.service';
import { Dados } from '../entities/dado.entity';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Dados') 
@UseGuards(JwtAuthGuard)
@Controller('/dados')
@ApiBearerAuth()
export class DadosController {
  constructor(private readonly dadosService: DadosService) {}

  @Get()
  findAll() {
    return this.dadosService.findAll();
  }

  @Get('/:id')
  findById(@Param('id', ParseIntPipe) id: number) {
    return this.dadosService.findById(id);
  }

  @Get('/usuario/:id')
@HttpCode(HttpStatus.OK)
findByUsuario(@Param('id', ParseIntPipe) id: number) {
  return this.dadosService.findByUsuario(id);
}


  @Post()
  create(@Body() dados: Dados): Promise<Dados> {
    return this.dadosService.create(dados);
  }

  @Put()
  update(@Body() dados: Dados): Promise<Dados> {
    return this.dadosService.update(dados);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.dadosService.delete(id);
  }
}
