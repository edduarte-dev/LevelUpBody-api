import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { Dados } from "../entities/dado.entity";

@Injectable()
export class DadosService {
    constructor(
        @InjectRepository(Dados)
        private dadosRepository: Repository<Dados>
    ) { }

    async findAll(): Promise<Dados[]> {
        return await this.dadosRepository.find();
    }

    async findById(id: number): Promise<Dados> {
        const dados = await this.dadosRepository.findOne({
            where: {
                id
            }
        });

        if (!dados)
            throw new HttpException('Informação não encontrada!', HttpStatus.NOT_FOUND);
        return dados;
    }

    async create(dados: Dados): Promise<Dados> {
        return await this.dadosRepository.save(dados);
    }

    async update(dados: Dados): Promise<Dados>{
        await this.findById(dados.id)
        return await this.dadosRepository.save(dados);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id)

        return await this.dadosRepository.delete(id)
    }
}