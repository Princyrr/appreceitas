const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt'); // <-- só uma vez

const app = express();
app.use(cors());
app.use(express.json());

const users = []; // Armazenamento em memória

// Cadastro
app.post('/register', async (req, res) => {
  const { username, email, phone, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email e senha são obrigatórios.' });
  }

  const existingUser = users.find(u => u.email === email.trim().toLowerCase());
  if (existingUser) {
    return res.status(400).json({ message: 'Usuário já existe.' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    username,
    email: email.trim().toLowerCase(),
    phone,
    password: hashedPassword,
  };

  users.push(newUser);

  return res.status(201).json({ message: 'Usuário cadastrado com sucesso.' });
});

// Login
app.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Campos email e password são obrigatórios.' });
    }

    email = email.trim().toLowerCase();

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciais inválidas!' });
    }

    console.log(`🔑 Login realizado por: ${user.email}`);

    return res.json({
      message: 'Login bem-sucedido!',
      user: {
        username: user.username,
        email: user.email,
        phone: user.phone
      }
    });
  } catch (error) {
    console.error('Erro no /login:', error);
    return res.status(500).json({ message: 'Erro interno do servidor.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
