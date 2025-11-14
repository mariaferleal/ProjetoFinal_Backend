import connectDB from './config/db.js';
import disconnectDB from './config/db.js';
import { Logger } from './logger.js';
import { User } from './models/User.js';
import { Task } from './models/Task.js';

async function run() {
  await connectDB();

  try {
    // Create
    const user = await User.create({ name: 'Maria', email: `maria_${Date.now()}@teste.com`, role: 'user' });
    Logger.info('User criado', user.toObject());

    const task = await Task.create({ title: 'Estudar', description: 'Revisar conteúdo', priority: 'alta' });
    Logger.info('Task criada', task.toObject());

    // Read
    const users = await User.getAll();
    const tasks = await Task.getAll();
    Logger.info('Quantidade de users/tasks', { users: users.length, tasks: tasks.length });

    // Update
    const userUpd = await User.update(user._id, { name: 'Maria Atualizada' });
    const taskUpd = await Task.update(task._id, { status: 'done' });
    Logger.info('Atualizados', { user: userUpd?.name, task: taskUpd?.status });

    // Delete
    await Task.remove(task._id);
    await User.remove(user._id);
    Logger.info('Remoção concluída');
  } catch (err) {
    Logger.error('Erro no teste', err);
  } finally {
    await disconnectDB();
  }
}

// Execute com: npm test (mapeado para node test.js)
run();
