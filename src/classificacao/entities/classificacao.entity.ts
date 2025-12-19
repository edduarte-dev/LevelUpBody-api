import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dados } from '../../dados/entities/dado.entity';
import { IsNotEmpty } from 'class-validator';

@Entity({ name: 'tb_classificacao_imc' })
export class ClassificacaoImc {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 150 })
  mensagem: string;

  @OneToMany(() => Dados, (dados) => dados.classificacaoImc)
  dados: Dados[];
}
