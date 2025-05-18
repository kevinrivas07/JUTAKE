import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class User {
  /**
   * Una clave primaria (o primary key) es un atributo o conjunto de atributos que
   * identifica de forma única a cada fila en una tabla de base de datos. Autogenerado
   */

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({default:"123456"})
  password!: string;
}