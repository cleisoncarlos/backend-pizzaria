import express from 'express';
import { createUser, authenticateUser } from '../services/user.service.js';
import authenticateToken from '../middleware/authMiddleware.js' ;
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await createUser(username, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await authenticateUser(username, password);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ message: 'Acesso permitido', user: req.user });
});

export default router;
