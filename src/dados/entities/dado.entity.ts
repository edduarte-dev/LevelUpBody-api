import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Usuario } from '../../usuarios/entities/usuario.entity';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'tb_dados' })
export class Dados {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @ApiProperty()
  peso: number;

  @Column({ nullable: false })
  @IsNotEmpty()
  @ApiProperty()
  altura: number;

  @Column({ length: 100, nullable: false })
  @IsNotEmpty()
  @ApiProperty()
  objetivo: string;

  @Column()
  @ApiProperty()
  imc: number;

  @ApiProperty()
  @ManyToOne(() => Usuario, (usuario) => usuario.dados, {
    onDelete: 'CASCADE',
  })
  usuario: Usuario;

}
