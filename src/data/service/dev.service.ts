import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { Usuario } from '../../usuarios/entities/usuario.entity';
import { Dados } from '../../dados/entities/dado.entity';
import { ClassificacaoImc } from '../../classificacao/entities/classificacao.entity';

@Injectable()
export class DevService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.configService.get<string>('DB_HOST'),
      port: Number(this.configService.get<string>('DB_PORT')),
      username: this.configService.get<string>('DB_USERNAME'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_DATABASE'),

      entities: [Usuario, Dados, ClassificacaoImc],
      synchronize: true, // depois você pode desligar
    };
  }
}

