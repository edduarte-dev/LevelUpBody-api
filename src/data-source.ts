import * as dotenv from 'dotenv';
dotenv.config();

import 'reflect-metadata';
import { DataSource } from 'typeorm';

import { Usuario } from './usuarios/entities/usuario.entity';
import { Dados } from './dados/entities/dado.entity';
import { ClassificacaoImc } from './classificacao/entities/classificacao.entity';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Usuario, Dados, ClassificacaoImc],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
