import { Request, Response } from 'express';
import { AppDataSource } from '../data-sources';
import { User } from '../entity/user';

const userRepo = AppDataSource.getRepository(User);

export const getUsers = async (req: Request, res: Response) => {
  const users = await userRepo.find();
  res.json(users);
};

export const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await userRepo.findOneBy({ id });
  user ? res.json(user) : res.status(404).json({ msg: 'Usuario no encontrado' });
};

export const createUser = async (req: Request, res: Response) => {
  const { name, card, phone, email, password } = req.body;

  // Validación de campos obligatorios
  if (!name || !card || !phone || !email || !password) {
    return res.status(400).json({ msg: 'Todos los campos son obligatorios' });
  }

  // Validación de email con expresión regular
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Correo electrónico inválido' });
  }

  // Verificar si ya existe usuario con la misma cédula o correo
  const cedulaExists = await userRepo.findOneBy({ card });
  const emailExists = await userRepo.findOneBy({ email });

  if (cedulaExists || emailExists) {
    return res.status(409).json({ msg: 'Ya existe un usuario con esa cédula o correo' });
  }

  // Crear usuario (sin encriptar contraseña)
  const user = userRepo.create({
    name,
    card,
    phone,
    email,
    password,
  });

  await userRepo.save(user);
  res.status(201).json({ msg: 'Usuario creado exitosamente' });
};

export const updateUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = await userRepo.findOneBy({ id });

  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }

  userRepo.merge(user, req.body);
  const updated = await userRepo.save(user);
  res.json(updated);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await userRepo.delete(id);
  result.affected
    ? res.status(204).send()
    : res.status(404).json({ msg: 'Usuario no encontrado' });
};



export const getUserProfile = async (req: Request, res: Response) => {
  console.log('Entrando a GET /profile/:id');
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ msg: 'ID inválido' });
  }

  const user = await userRepo.findOneBy({ id });

  if (!user) {
    return res.status(404).json({ msg: 'Usuario no encontrado' });
  }

  const { password, ...userWithoutPassword } = user;

  res.json(userWithoutPassword);
  
};