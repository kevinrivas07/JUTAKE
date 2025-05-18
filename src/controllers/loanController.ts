import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { Loan } from "../entity/loan";
import { Book } from "../entity/books";
import { User } from "../entity/user";

const loanRepo = AppDataSource.getRepository(Loan);
const bookRepo = AppDataSource.getRepository(Book);
const userRepo = AppDataSource.getRepository(User);

export const registerLoan = async (req: Request, res: Response) => {
  const { bookId, userId } = req.body;

  try {
    const book = await bookRepo.findOneBy({ id: bookId });
    const user = await userRepo.findOneBy({ id: userId });

    if (!book || !user) {
      return res.status(404).json({ error: "Libro o usuario no encontrado" });
    }

    if (!book.available) {
      return res.status(400).json({ error: "El libro no está disponible" });
    }

    const loan = loanRepo.create({
      book,
      user,
      loanDate: new Date(),
      returned: false
    });

    await loanRepo.save(loan);

    // Marcar libro como no disponible
    book.available = false;
    await bookRepo.save(book);

    res.status(201).json({ message: "Préstamo registrado", loan });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el préstamo" });
  }
};