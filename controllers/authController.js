import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) return res.status(400).json({ message: 'Email e senha são obrigatórios' });

    const user = await User.findByEmail(email);
    if (!user || !user.passwordHash) return res.status(401).json({ message: 'Credenciais inválidas' });

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Credenciais inválidas' });

    req.session.userId = user._id.toString();
    req.session.userName = user.name;
    res.json({ message: 'Autenticado com sucesso', user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Erro no login', error: err.message });
  }
}

export function logout(req, res) {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ message: 'Erro ao encerrar sessão' });
    res.json({ message: 'Logout realizado' });
  });
}
