import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { Loan } from "../entity/loan";
import { Book } from "../entity/books";
import { User } from "../entity/user";

const loanRepo = AppDataSource.getRepository(Loan);
const bookRepo = AppDataSource.getRepository(Book);
const userRepo = AppDataSource.getRepository(User);

export const registerLoan = async (req: Request, res: Response) => {
  const { book, user, loanDate, returnDate, returned } = req.body;

  try {
    // Buscar libro y usuario por nombre
    const bookFound = await bookRepo.findOne({ where: { title: book } });
    const userFound = await userRepo.findOne({ where: { name: user } });

    if (!bookFound || !userFound) {
      return res.status(404).json({ error: "Libro o usuario no encontrado" });
    }

    if (!bookFound.available) {
      return res.status(400).json({ error: "El libro no está disponible" });
    }

    // Crear el préstamo usando valores válidos para TypeORM
    const loan = loanRepo.create({
      book: bookFound,
      user: userFound,
      loanDate: new Date(loanDate),
      returnDate: returnDate ? new Date(returnDate) : undefined, // ✅ Usa undefined
      returned: returned ?? false,
    });

    await loanRepo.save(loan);

    // Marcar el libro como no disponible
    bookFound.available = false;
    await bookRepo.save(bookFound);

    res.status(201).json({ message: "Préstamo registrado", loan });
  } catch (error) {
    console.error("Error al registrar el préstamo:", error);
    res.status(500).json({ error: "Error al registrar el préstamo" });
  }
};