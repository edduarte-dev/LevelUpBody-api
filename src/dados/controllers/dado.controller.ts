import { Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { DadosService } from "../services/dado.service";

@Controller('/dados')
export class DadosController {

    constructor(private readonly dadosService: DadosService) {}


    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(){
        return this.dadosService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number){
        return this.dadosService.findById(id);
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    create(){
        return this.dadosService.create;
    }

    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    update(){
        return this.dadosService.update;
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(id:number){
        return this.dadosService.delete(id);
    }
}