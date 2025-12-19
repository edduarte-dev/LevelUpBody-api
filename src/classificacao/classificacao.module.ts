import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassificacaoImc } from './entities/classificacao.entity';
import { ClassificacaoController } from './controller/classificacao.controller';
import { ClassificacaoService } from './services/classificacao.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClassificacaoImc])],
  providers: [ClassificacaoService],
  controllers: [ClassificacaoController],
  exports: [ClassificacaoService],
})
export class ClassificacaoImcModule {}
