import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity"
import { Dados } from "../../dados/entities/dado.entity";
import { ClassificacaoImc } from "../../classificacao/entities/classificacao.entity";

@Injectable()
export class DevService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'Souprogramadora520',
            database: 'db_levelup',
            entities: [Usuario, Dados, ClassificacaoImc],
            synchronize: true,
    };
  }
}