import { Tag } from '../models/Tag.js';

export async function listTags(req, res) {
  const tags = await Tag.getAll();
  res.json(tags);
}

export async function getTag(req, res) {
  const tag = await Tag.getById(req.params.id);
  if (!tag) return res.status(404).json({ message: 'Tag não encontrada' });
  res.json(tag);
}

export async function createTag(req, res) {
  try {
    const data = req.body || {};
    if (!data.name) return res.status(400).json({ message: 'name é obrigatório' });
    data.userId = req.session.userId;
    const newTag = await Tag.create(data);
    res.status(201).json(newTag);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao criar tag', error: err.message });
  }
}

export async function updateTag(req, res) {
  try {
    const updated = await Tag.update(req.params.id, req.body || {});
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar tag', error: err.message });
  }
}

export async function deleteTag(req, res) {
  try {
    await Tag.remove(req.params.id);
    res.json({ message: 'Tag removida com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover tag', error: err.message });
  }
}
