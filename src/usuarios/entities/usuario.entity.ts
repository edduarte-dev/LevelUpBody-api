import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Dados } from '../../dados/entities/dado.entity';

@Entity({ name: 'tb_usuarios' })
export class Usuario {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 100 })
  @ApiProperty()
  nome: string;

  @IsNotEmpty()
  @IsEmail()
  @Column({ type: 'varchar', length: 100, unique: true })
  @ApiProperty({ example: 'usuario@email.com' })
  usuario: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @ApiProperty({ nullable: true })
  senha: string | null;

  @Column({
    type: 'varchar',
    length: 20,
    default: 'LOCAL',
  })
  @ApiProperty({ example: 'LOCAL | GOOGLE' })
  provider: 'LOCAL' | 'GOOGLE';

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  @ApiProperty({ nullable: true })
  googleId?: string | null;

  @Column({
    type: 'varchar',
    length: 5000,
    nullable: true,
  })
  @ApiProperty({ nullable: true })
  foto?: string | null;

  @OneToMany(() => Dados, (dado) => dado.usuario)
  @ApiProperty()
  dados: Dados[];
}
