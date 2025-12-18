import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Dados } from '../../dados/entities/dado.entity';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


@Entity({ name: "tb_usuarios"})
export class Usuario {

    @PrimaryGeneratedColumn()
    @ApiProperty()
    id: number;
    
    @IsNotEmpty()
    @Column({ length: 100})
    @ApiProperty()
    nome: string;

    @IsNotEmpty()
    @Column({ length: 100, unique: true})
    @IsEmail()
    @ApiProperty({example: 'usuario@email.com'})
    usuario: string;
    
    @MinLength(8)
    @IsNotEmpty()
    @Column({ length: 255})
    @ApiProperty()
    senha: string;
    
    @Column({ length: 5000, nullable: true })
    @ApiProperty()
    foto: string;

    @ApiProperty()
    @OneToMany(() => Dados, (dado) => dado.usuario)
    dados: Dados[];
}

