import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Book } from "./books";
import { User } from "./user";

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Book)
  book!: Book;

  @ManyToOne(() => User)
  user!: User;

  @Column()
  loanDate!: Date;

  @Column({ nullable: true })
  returnDate?: Date;

  @Column({ default: false })
  returned!: boolean;
}