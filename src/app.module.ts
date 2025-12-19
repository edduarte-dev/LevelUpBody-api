import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DadosModule } from './dados/dado.module';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UsuarioModule } from './usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ClassificacaoImcModule } from './classificacao/classificacao.module';
import { ConfigModule } from '@nestjs/config';
import { ProdService } from './data/service/prod.service';


@Module({
  imports: [
    ConfigModule.forRoot(),
TypeOrmModule.forRootAsync({
	useClass: ProdService,
    imports: [ConfigModule],
}),
    DadosModule,
    UsuarioModule,
    AuthModule,
    ClassificacaoImcModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
