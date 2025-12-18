import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { IsNotEmpty } from 'class-validator'

@Entity({name: "tb_dados"})

export class Dados{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    @IsNotEmpty()
    peso: number;

    @Column({nullable: false})
    @IsNotEmpty()
    altura: number;

    @Column({ length: 100, nullable: false})
    @IsNotEmpty()
    obetivo: string;

    @Column()
    @IsNotEmpty()   
    imc: number;

   
    @ManyToOne(() => Usuario, (usuario) => usuario.dados, {
        onDelete: "CASCADE"
    })
    usuario: Usuario;

}


