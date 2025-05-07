import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { Book } from "../entity/books";

const bookRepo = AppDataSource.getRepository(Book);

// Crear libro
export const createBook = async (req: Request, res: Response) => {
  try {
    const book = bookRepo.create(req.body);
    await bookRepo.save(book);
    res.json(book);  // Retorna el libro creado
  } catch (error) {
    res.status(500).json({ error: "Error al crear el libro" });
  }
};

// Obtener todos los libros
export const getBooks = async (_req: Request, res: Response) => {
  try {
    const books = await bookRepo.find();
    res.json(books);  // Retorna todos los libros
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los libros" });
  }
};

// Obtener libro por ID
export const getBookById = async (req: Request, res: Response) => {
  try {
    const book = await bookRepo.findOneBy({ id: +req.params.id });
    if (book) {
      res.json(book);  // Retorna el libro si se encuentra
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
      res.json(book);  // Retorna el libro actualizado
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
    const result = await bookRepo.delete(req.params.id);
    if (result.affected === 0) {
      res.status(404).json({ error: "Libro no encontrado" });  
    } else {
      res.json({ message: "Libro eliminado" });  // Retorna mensaje de eliminación
    }
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el libro" });
  }
};
