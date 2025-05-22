import { Router } from "express";
import { AppDataSource } from "../data-sources";
import { User } from "../entity/user";
import { getUserProfile, loginUser } from '../controllers/userController';

const router = Router();

/**
 * Obtiene el repositorio de la entidad User desde la fuente de datos.
 * El repositorio permite ejecutar operaciones como save, find, delete, etc. sobre la tabla User.
 */
const userRepo = AppDataSource.getRepository(User);

router.post("/", async (req, res) => {
  const user = userRepo.create(req.body);
  await userRepo.save(user);
  res.json(user);
});

router.get("/", async (req, res) => {
  const users = await userRepo.find();
  res.json(users);
});

router.get("/:id", async (req, res) => {
  const user = await userRepo.findOneBy({ id: +req.params.id });
  user ? res.json(user) : res.status(404).json({ error: "Not found" });
});

router.put("/:id", async (req, res) => {
  const user = await userRepo.findOneBy({ id: +req.params.id });
  if (user) {
    userRepo.merge(user, req.body);
    await userRepo.save(user);
    res.json(user);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});

router.delete("/:id", async (req, res) => {
  const result = await userRepo.delete(req.params.id);
  res.json(result);
});

router.get('/profile/:id', getUserProfile);

router.post('/login', loginUser);

export default router;