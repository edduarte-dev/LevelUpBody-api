import {Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ClassificacaoImc } from "../entities/classificacao.entity";

@Injectable()
export class ClassificacaoService {
    constructor(
        @InjectRepository(ClassificacaoImc)
        private classiicacaoRepository: Repository<ClassificacaoImc>
    ) { }

    async findAll(): Promise<ClassificacaoImc[]> {
        return await this.classiicacaoRepository.find({
            relations: {
                dados: true
            }
        });
    }
}