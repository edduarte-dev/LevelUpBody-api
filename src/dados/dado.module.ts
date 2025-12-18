import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Dados } from "./entities/dado.entity";
import { DadosService } from "./services/dado.service";
import { DadosController } from "./controllers/dado.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Dados])],
    providers: [DadosService],
    controllers: [DadosController],
    exports: [],
})
export class DadosModule {}