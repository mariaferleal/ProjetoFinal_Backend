import dotenv from 'dotenv';
import express from 'express';
import session from 'express-session';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import taskRoutes from './routes/tasks.js';
import tagRoutes from './routes/tags.js';
import scheduleRoutes from './routes/schedules.js';

dotenv.config();
const PORT = process.env.PORT || 3000;

await connectDB();

const app = express();
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'troque_este_segredo_em_producao',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }, // em produção usar secure: true com HTTPS
}));

// middleware simples de autenticação usado pelos controllers que precisam
function ensureAuth(req, res, next) {
  if (!req.session?.userId) return res.status(401).json({ message: 'Usuário não autenticado' });
  next();
}

// expor middleware para rotas que precisarem (rotas podem usar own checks)
app.use((req, res, next) => {
  req.ensureAuth = ensureAuth;
  next();
});

// rotas (controllers implementam a lógica)
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
app.use('/tags', tagRoutes);
app.use('/schedules', scheduleRoutes);

// default 404
app.use((req, res) => res.status(404).json({ message: 'Endpoint não encontrado' }));

app.listen(PORT, () => console.log(`🚀 Servidor Express rodando na porta ${PORT}`));
