// URL da API
const TODO_API_URL = 'http://localhost:8080/api/todos';  // URL base da API Spring Boot para "Todos"

// Função para buscar todos os "todos" da API
export const getTodos = async () => {
  try {
    // Realiza a requisição GET para obter todos os "todos"
    const response = await fetch(TODO_API_URL);
    if (!response.ok) throw new Error('Failed to fetch todos'); // Verifica se a resposta é bem-sucedida
    return response.json(); // Retorna os dados em formato JSON
  } catch (error) {
    console.error('Error fetching todos:', error); // Log de erro caso ocorra algum problema
    return []; // Retorna um array vazio em caso de erro
  }
};

// Função para criar um novo "todo"
export const createTodo = async (todo) => {
  try {
    // Realiza a requisição POST para criar um novo "todo"
    const response = await fetch(TODO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo), // Converte o objeto "todo" para JSON antes de enviar
    });
    if (!response.ok) throw new Error('Failed to create todo'); // Verifica se a resposta é bem-sucedida
    return response.json(); // Retorna o "todo" criado em formato JSON
  } catch (error) {
    console.error('Error creating todo:', error); // Log de erro caso ocorra algum problema
    return null; // Retorna null em caso de erro
  }
};

// Função para deletar um "todo" pelo ID
export const deleteTodo = async (id) => {
  try {
    // Realiza a requisição DELETE para remover um "todo" pelo ID
    const response = await fetch(`${TODO_API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo'); // Verifica se a resposta é bem-sucedida
  } catch (error) {
    console.error('Error deleting todo:', error); // Log de erro caso ocorra algum problema
  }
};

// Função para atualizar o status de um "todo" pelo ID
export const updateTodoStatus = async (id) => {
  try {
    // Realiza a requisição PUT para atualizar o status de um "todo" pelo ID
    const response = await fetch(`${TODO_API_URL}/${id}/status`, {
      method: 'PUT',
    });
    if (!response.ok) throw new Error('Failed to update todo status'); // Verifica se a resposta é bem-sucedida
    return response.json(); // Retorna o "todo" atualizado em formato JSON
  } catch (error) {
    console.error('Error updating todo status:', error); // Log de erro caso ocorra algum problema
    return null; // Retorna null em caso de erro
  }
};
