import { Router, Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { Book } from "../entity/books";

const router = Router();
const bookRepo = AppDataSource.getRepository(Book);

// Crear
router.post("/", async (req: Request, res: Response) => {
  const book = bookRepo.create(req.body);
  await bookRepo.save(book);
  res.status(201).json(book);
});

// mostrar todos los libros
router.get("/", async (_req: Request, res: Response) => {
  const books = await bookRepo.find();
  res.json(books);
});

// mostrar un libro por ID
router.get("/:id", async (req: Request, res: Response) => {
  const book = await bookRepo.findOneBy({ id: +req.params.id });
  book ? res.json(book) : res.status(404).json({ message: "Libro no encontrado" });
});


// Eliminar
router.delete("/:id", async (req: Request, res: Response) => {
  const result = await bookRepo.delete(req.params.id);
  result.affected === 0
    ? res.status(404).json({ message: "Libro no encontrado" })
    : res.json({ message: "Libro eliminado" });
});

export default router;
