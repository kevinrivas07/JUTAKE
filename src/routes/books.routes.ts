import { Router } from "express";
import { AppDataSource } from "../data-sources";
import { Book } from "../entity/books";
import { getBooks } from "../controllers/booksController";
import { changeBookAvailability } from "../controllers/booksController";

const router = Router();

// Obtener el repositorio de la entidad Book
const bookRepo = AppDataSource.getRepository(Book);

// Crear libro
router.post("/", async (req, res) => {
  const book = bookRepo.create(req.body);
  await bookRepo.save(book);
  res.json(book);
});

router.patch("/:id/availability", changeBookAvailability);

/* Obtener todos los libros
router.get("/", async (req, res) => {
  const books = await bookRepo.find();
  res.json(books);
});*/


//Obtener libro con filtros
router.get("/", getBooks);

// Obtener libro por ID
router.get("/:id", async (req, res) => {
  const book = await bookRepo.findOneBy({ id: +req.params.id });
  book ? res.json(book) : res.status(404).json({ error: "Libro no encontrado" });
});

// Actualizar libro por ID
router.put("/:id", async (req, res) => {
  const book = await bookRepo.findOneBy({ id: +req.params.id });
  if (book) {
    bookRepo.merge(book, req.body);
    await bookRepo.save(book);
    res.json(book);
  } else {
    res.status(404).json({ error: "Libro no encontrado" });
  }
});

// Eliminar libro por ID
router.delete("/:id", async (req, res) => {
  const result = await bookRepo.delete(req.params.id);
  res.json(result);
});


export default router;