import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "./entities/usuario.entity";
import { UsuarioService } from "./services/usuario.service"; 
import { UsuarioController } from "./controllers/usuario.controller";
import { LocalStrategy } from "../auth/strategy/local.strategy";
import { JwtStrategy } from "../auth/strategy/jwt.strategy";
import { Bcrypt } from "../auth/bcrypt/bcrypt";

@Module({
    imports: [TypeOrmModule.forFeature([Usuario])],
    providers: [UsuarioService, JwtStrategy, Bcrypt],
    controllers: [UsuarioController],
    exports: [UsuarioService] 
})
export class UsuarioModule {}