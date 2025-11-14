import { Schedule } from '../models/Schedule.js';

export async function listSchedules(req, res) {
  const schedules = await Schedule.getAll();
  res.json(schedules);
}

export async function getSchedule(req, res) {
  const schedule = await Schedule.getById(req.params.id);
  if (!schedule) return res.status(404).json({ message: 'Agenda não encontrada' });
  res.json(schedule);
}

export async function createSchedule(req, res) {
  try {
    const data = req.body || {};
    if (!data.name) return res.status(400).json({ message: 'name é obrigatório' });
    data.ownerId = req.session.userId;
    const newSchedule = await Schedule.create(data);
    res.status(201).json(newSchedule);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar agenda', error: err.message });
  }
}

export async function updateSchedule(req, res) {
  try {
    const updated = await Schedule.update(req.params.id, req.body || {});
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar agenda', error: err.message });
  }
}

export async function deleteSchedule(req, res) {
  try {
    await Schedule.remove(req.params.id);
    res.json({ message: 'Agenda removida com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover agenda', error: err.message });
  }
}
