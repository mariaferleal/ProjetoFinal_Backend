import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export async function listUsers(req, res) {
  const users = await User.getAll();
  res.json(users);
}

export async function getUser(req, res) {
  const user = await User.getById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
  res.json(user);
}

export async function createUser(req, res) {
  try {
    const data = req.body || {};
    if (!data.name || !data.email || !data.password) return res.status(400).json({ message: 'name, email e password são obrigatórios' });

    const existing = await User.findByEmail(data.email);
    if (existing) return res.status(400).json({ message: 'Email já cadastrado' });

    const hash = await bcrypt.hash(data.password, 10);
    const toCreate = { ...data, passwordHash: hash };
    delete toCreate.password;
    const newUser = await User.create(toCreate);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar usuário', error: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    const updated = await User.update(req.params.id, req.body || {});
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar usuário', error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.getById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    await User.remove(req.params.id);
    res.json({ message: 'Usuário removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover usuário', error: err.message });
  }
}
