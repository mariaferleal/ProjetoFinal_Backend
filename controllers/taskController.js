import { Task } from '../models/Task.js';
import { User } from '../models/User.js';

export async function listTasks(req, res) {
  const tasks = await Task.getAll();
  res.json(tasks);
}

export async function getTask(req, res) {
  const task = await Task.getById(req.params.id);
  if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
  res.json(task);
}

export async function createTask(req, res) {
  try {
    const data = req.body || {};
    if (!data.title) return res.status(400).json({ message: 'title é obrigatório' });
    if (data.assignedTo) {
      const assignee = await User.getById(data.assignedTo);
      if (!assignee) return res.status(400).json({ message: 'Usuário não encontrado' });
    }
    const newTask = await Task.create(data);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar tarefa', error: err.message });
  }
}

export async function updateTask(req, res) {
  try {
    const task = await Task.getById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
    const updated = await Task.update(req.params.id, req.body || {});
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar tarefa', error: err.message });
  }
}

export async function deleteTask(req, res) {
  try {
    const task = await Task.getById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' });
    await Task.remove(req.params.id);
    res.json({ message: 'Tarefa removida com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover tarefa', error: err.message });
  }
}
