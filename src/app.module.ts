import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DadosModule } from './dados/dado.module';
import { Dados } from './dados/entities/dado.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from './usuarios/entities/usuario.entity';
import { UsuarioModule } from './usuarios/usuario.module';
import { AuthModule } from './auth/auth.module';
import { UsuarioLogin } from './auth/entities/usuarioLogin.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_levelup',
      entities: [Dados, Usuario, UsuarioLogin],
      synchronize: true,
      logging: true,
    }),
    DadosModule,
    UsuarioModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
