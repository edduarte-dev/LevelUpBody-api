import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_usuariosLogin"})
export class UsuarioLogin {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number
    
    @ApiProperty()
    public usuario: string;

    @ApiProperty()
    public senha: string;
}