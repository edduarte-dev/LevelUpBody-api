import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DadosModule } from './dados/dado.module';
import { UsuarioModule } from './usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';
import { ClassificacaoImcModule } from './classificacao/classificacao.module';
import { ProdService } from './data/service/prod.service';
import { DevService } from './data/service/dev.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: ProdService,
    }),

    DadosModule,
    UsuarioModule,
    AuthModule,
    ClassificacaoImcModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
