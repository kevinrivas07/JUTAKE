import { Request, Response } from 'express';
import { User } from '../entity/user';

let users: User[] = [];

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const getUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = users.find(u => u.id === id);
  user ? res.json(user) : res.status(404).json({ msg: 'Usuario no encontrado' });
};

export const createUser = (req: Request, res: Response) => {
  const newUser: User = req.body;
  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const index = users.findIndex(u => u.id === id);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ msg: 'Usuario no encontrado' });
  }
};

export const deleteUser = (req: Request, res: Response) => {
  users = users.filter(u => u.id !== Number(req.params.id));
  res.status(204).send();
};
