import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { Book } from "../entity/books";

const bookRepo = AppDataSource.getRepository(Book);

// Crear libro
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, year, publisher, genre, date, image} = req.body;

    const book = bookRepo.create({
      title,
      author,
      year: +year,
      publisher,
      genre,
      date,
      available: true,
      image,
    });

    await bookRepo.save(book);
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el libro" });
  }
};

// Obtener todos los libros con filtros
export const getBooks = async (req: Request, res: Response) => {
  try {
    const { author, title, genre } = req.query as { [key: string]: string };

    const queryBuilder = bookRepo.createQueryBuilder("book");

    if (author) {
      queryBuilder.where("LOWER(book.author) LIKE :author", {
        author: `%${author.toLowerCase()}%`,
      });
    } else if (title) {
      queryBuilder.where("LOWER(book.title) LIKE :title", {
        title: `%${title.toLowerCase()}%`,
      });
    } else if (genre) {
      queryBuilder.where("LOWER(book.genre) LIKE :genre", {
        genre: `%${genre.toLowerCase()}%`,
      });
    }

    const books = await queryBuilder.getMany();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

// Obtener libro por ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await bookRepo.findOneBy({ id: +req.params.id });
    if (book) {
      res.json(book);
    } else {
      res.status(404).json({ error: "Libro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el libro" });
  }
};

// Actualizar libro por ID
export const updateBookById = async (req: Request, res: Response) => {
  try {
    const book = await bookRepo.findOneBy({ id: +req.params.id });
    if (book) {
      bookRepo.merge(book, req.body);
      await bookRepo.save(book);
      res.json(book);
    } else {
      res.status(404).json({ error: "Libro no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el libro" });
  }
};

// Eliminar libro por ID
export const deleteBookById = async (req: Request, res: Response) => {
  try {
    const result = await bookRepo.delete(+req.params.id);
    if (result.affected === 0) {
      res.status(404).json({ error: "Libro no encontrado" });
    } else {
      res.json({ message: "Libro eliminado" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
};

// Cambiar disponibilidad del libro
export const changeBookAvailability = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { available } = req.body;

    const book = await bookRepo.findOneBy({ id: +id });

    if (!book) {
      return res.status(404).json({ error: "Libro no encontrado" });
    }

    book.available = available;
    await bookRepo.save(book);

    res.json({ message: "Disponibilidad actualizada", book });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar disponibilidad" });
  }
};
