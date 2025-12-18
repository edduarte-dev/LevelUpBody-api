import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Dados } from '../../dados/entities/dado.entity';



@Entity({ name: "tb_usuarios"})
export class Usuario {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({ length: 100})
    nome: string;

    @Column({ length: 100, unique: true})
    usuario: string;
    
    @Column({ length: 255})
    senha: string;
    
    @Column({ length: 5000, nullable: true })
    foto: string;

    @OneToMany(() => Dados, (dado) => dado.usuario)
    dados: Dados[];
}

