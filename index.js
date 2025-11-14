import { connectDB, disconnectDB } from './config/db.js';
import { Logger } from './logger.js';
import { User } from './models/User.js';
import { Task } from './models/Task.js';
import { Tag } from './models/Tag.js';
import { Schedule } from './models/Schedule.js';

async function main() {
  await connectDB();
  Logger.info('Aplicação iniciada. Pronta para executar métodos de CRUD nas classes.');

  const [u, t, g, s] = await Promise.all([
    User.getAll().then(a => a.length).catch(() => 0),
    Task.getAll().then(a => a.length).catch(() => 0),
    Tag.getAll().then(a => a.length).catch(() => 0),
    Schedule.getAll().then(a => a.length).catch(() => 0),
  ]);
  Logger.info('Resumo inicial', { users: u, tasks: t, tags: g, schedules: s });

  await disconnectDB();
}

if (process.argv[1]?.endsWith('index.js')) {
  main().catch(err => {
    Logger.error('Falha na execução do index', err);
    process.exit(1);
  });
}

export { main };
