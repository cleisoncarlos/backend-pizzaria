import express from 'express';
import pizzaService from '../services/pizza.service.js'
import authenticateToken from '../middleware/authMiddleware.js';

const router = express.Router();


// Rota para exibir as pizzas cadastradas
router.get('/pizzas', async (req_, res) => {
    try {
      const pizzas = await pizzaService.listarPizzas(); // Método que lista todas as pizzas
      res.status(200).json(pizzas);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

// Rota para criar uma nova pizza
router.post('/pizzas', authenticateToken, async (req, res) => {
  try {
    const { nome, descricao, tamanhos } = req.body;
    const novaPizza = await pizzaService.criarPizza({ nome, descricao, tamanhos });
    res.status(201).json(novaPizza);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para editar uma pizza existente
router.put('/pizzas/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, tamanhos } = req.body;
    const pizzaEditada = await pizzaService.editarPizza(id, { nome, descricao, tamanhos });
    res.status(200).json(pizzaEditada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Rota para excluir uma pizza
router.delete('/pizzas/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const resultado = await pizzaService.excluirPizza(id);
    res.status(200).json(resultado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
