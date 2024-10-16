import express from 'express';
import jwt from 'jsonwebtoken'; // Para gerar o token
/import usuarioService from '../services/user.service.js'
const router = express.Router();

// Rota de login
router.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    // Verifica as credenciais do usuário
    const usuario = await usuarioService.verificarCredenciais(email, senha);
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Se as credenciais forem válidas, gere o token JWT
    const token = jwt.sign(
      { id: usuario.id, email: usuario.email }, // Payload do token (ID e email)
      'seuSegredoSuperSecreto', // Chave secreta para assinar o token
      { expiresIn: '1h' } // Expiração do token
    );

    // Envia o token na resposta
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
});

export default router;
