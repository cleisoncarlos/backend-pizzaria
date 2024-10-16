import Pizza from '../models/pizza.model.js';
import  TamanhoPizza from '../models/tamanhoPizza.model.js';


// Função para listar todas as pizzas

const listarPizzas = async () => {
    return await Pizza.findAll({
      include: TamanhoPizza // Inclui os tamanhos das pizzas na resposta
    });
  };

// Função para criar uma pizza com seus tamanhos
async function criarPizza({ nome, descricao, tamanhos }) {
  try {
    const novaPizza = await Pizza.create({
      nome,
      descricao,
      TamanhoPizzas: tamanhos // Array de tamanhos com preço
    }, {
      include: [TamanhoPizza] // Inclui os tamanhos na criação
    });
    return novaPizza;
  } catch (error) {
    console.error('Erro ao criar pizza:', error);
    throw error;
  }
}

// Função para editar uma pizza e seus tamanhos
async function editarPizza(id, { nome, descricao, tamanhos }) {
  try {
    const pizza = await Pizza.findByPk(id);
    if (!pizza) {
      throw new Error('Pizza não encontrada');
    }

    // Atualiza a pizza
    await pizza.update({ nome, descricao });

    // Atualiza os tamanhos (primeiro exclui os existentes, depois recria)
    await TamanhoPizza.destroy({ where: { pizzaId: id } });
    const novosTamanhos = tamanhos.map(tamanho => ({ ...tamanho, pizzaId: id }));
    await TamanhoPizza.bulkCreate(novosTamanhos);

    return pizza;
  } catch (error) {
    console.error('Erro ao editar pizza:', error);
    throw error;
  }
}

// Função para excluir uma pizza
async function excluirPizza(id) {
  try {
    const pizza = await Pizza.findByPk(id);
    if (!pizza) {
      throw new Error('Pizza não encontrada');
    }

    // Exclui os tamanhos associados
    await TamanhoPizza.destroy({ where: { pizzaId: id } });
    // Exclui a pizza
    await pizza.destroy();

    return { message: 'Pizza excluída com sucesso' };
  } catch (error) {
    console.error('Erro ao excluir pizza:', error);
    throw error;
  }
}

export default {
    listarPizzas,
    criarPizza,
    editarPizza,
    excluirPizza
};
