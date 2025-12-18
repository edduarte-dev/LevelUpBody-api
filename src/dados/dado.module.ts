import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dados } from './entities/dado.entity';
import { DadosService } from './services/dado.service';
import { DadosController } from './controllers/dado.controller';
import { Usuario } from '../usuarios/entities/usuario.entity';
import { LocalStrategy } from '../auth/strategy/local.strategy';
import { JwtStrategy } from '../auth/strategy/jwt.strategy';
import { Bcrypt } from '../auth/bcrypt/bcrypt';

@Module({
  imports: [TypeOrmModule.forFeature([Dados, Usuario])],
  providers: [DadosService, Bcrypt],
  controllers: [DadosController],
  exports: [DadosService],
})
export class DadosModule {}
