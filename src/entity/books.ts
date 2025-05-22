import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column()
  year!: number;

  @Column()
  publisher!: string;

  @Column()
  genre!: string;

  @Column({ nullable: true })
  date?: string;

  @Column({ default: true })
  available!: boolean;

  @Column({ nullable: true })
  image!: string;
}
