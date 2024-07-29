import React, { useState, useEffect } from 'react';
import Todo from './components/Todo';
import TodoForm from './components/TodoForm';
import Search from './components/Search';
import Filter from './components/Filter';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './App.css';

// Registrar componentes do Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// URLs das APIs
const TODO_API_URL = 'http://localhost:8080/api/todos';  // API Spring Boot para "Todos"

// Função para converter data de dd/mm/yyyy para yyyy-mm-dd
const convertDate = (dateString) => {
  const parts = dateString.split('/');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];
  return new Date(`${year}-${month}-${day}`);
};

// Função para formatar data no formato dd/mm/yyyy
const formatDate = (dateString) => {
  const regex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!regex.test(dateString)) {
    throw new Error('Formato de data inválido. Use o formato dd/mm/yyyy.');
  }

  const parts = dateString.split('/');
  const day = parts[0];
  const month = parts[1];
  const year = parts[2];

  if (day > 31 || month > 12) {
    throw new Error('Data inválida. Dia ou mês fora do intervalo permitido.');
  }

  return `${day}/${month}/${year}`;
};

// Função para obter tarefas concluídas por mês
const getCompletedTasksByMonth = (todos) => {
  const completedTasks = todos.filter((todo) => todo.completed);
  const tasksByMonth = Array(12).fill(0);

  completedTasks.forEach((task) => {
    const month = convertDate(task.date).getMonth();
    tasksByMonth[month]++;
  });

  return tasksByMonth;
};

// Função para obter tarefas concluídas por categoria
const getCompletedTasksByCategory = (todos) => {
  const categories = ['Indefinido', 'Médio', 'Importante'];
  const counts = { Indefinido: 0, Médio: 0, Importante: 0 };

  todos
    .filter((todo) => todo.completed)
    .forEach((task) => {
      if (categories.includes(task.category)) {
        counts[task.category]++;
      }
    });

  return counts;
};

// Função para buscar "Todos" da API
const fetchTodosFromAPI = async () => {
  try {
    const response = await fetch(TODO_API_URL);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    return [];
  }
};

// Função para adicionar um "Todo" na API
const addTodoToAPI = async (todo) => {
  try {
    const response = await fetch(TODO_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
  } catch (error) {
    console.error('Error creating todo:', error);
    return null;
  }
};

// Função para deletar um "Todo" da API
const deleteTodoFromAPI = async (id) => {
  try {
    const response = await fetch(`${TODO_API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
  } catch (error) {
    console.error('Error deleting todo:', error);
  }
};

// Função para atualizar o status de um "Todo" na API
const updateTodoStatusInAPI = async (id) => {
  try {
    const response = await fetch(`${TODO_API_URL}/${id}/status`, {
      method: 'PUT',
    });
    if (!response.ok) throw new Error('Failed to update todo status');
    return response.json();
  } catch (error) {
    console.error('Error updating todo status:', error);
    return null;
  }
};

function App() {
  const [todos, setTodos] = useState([]);  // Estado para armazenar os "Todos"
  const [search, setSearch] = useState('');  // Estado para armazenar o termo de busca
  const [filter, setFilter] = useState('All');  // Estado para armazenar o filtro selecionado
  const [sort, setSort] = useState('AscAlpha');  // Estado para armazenar o tipo de ordenação
  const [completedTasksByMonth, setCompletedTasksByMonth] = useState([]);  // Estado para armazenar tarefas concluídas por mês
  const [completedTasksByCategory, setCompletedTasksByCategory] = useState({});  // Estado para armazenar tarefas concluídas por categoria

  useEffect(() => {
    const loadTodos = async () => {
      const todosFromAPI = await fetchTodosFromAPI();
      setTodos(todosFromAPI);
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const updateChartData = () => {
      console.log('Updating chart data...');
      setCompletedTasksByMonth(getCompletedTasksByMonth(todos));
      setCompletedTasksByCategory(getCompletedTasksByCategory(todos));
    };

    updateChartData();
  }, [todos]);

  const addTodo = async (text, category, date) => {
    const formattedDate = formatDate(date);
    const newTodo = {
      text,
      category,
      date: formattedDate,
      completed: false,
    };
    const createdTodo = await addTodoToAPI(newTodo);
    if (createdTodo) {
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    }
  };

  const removeTodo = async (id) => {
    await deleteTodoFromAPI(id);
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const completeTodo = async (id) => {
    const updatedTodo = await updateTodoStatusInAPI(id);
    if (updatedTodo) {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );
    }
  };

  const convertDateForSorting = (dateString) => {
    const parts = dateString.split('/');
    const day = parts[0];
    const month = parts[1];
    const year = parts[2];
    return new Date(`${year}-${month}-${day}`);
  };

  const sortTodos = (a, b) => {
    if (sort === 'AscAlpha') {
      return a.text.localeCompare(b.text);
    } else if (sort === 'DescAlpha') {
      return b.text.localeCompare(a.text);
    } else if (sort === 'Recente') {
      return convertDateForSorting(b.date) - convertDateForSorting(a.date);
    } else if (sort === 'Antigo') {
      return convertDateForSorting(a.date) - convertDateForSorting(b.date);
    }
    return 0;
  };

  const dataMonth = {
    labels: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
    datasets: [
      {
        label: 'Tarefas Concluídas por Mês',
        data: completedTasksByMonth,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const dataCategory = {
    labels: ['Indefinido', 'Médio', 'Importante'],
    datasets: [
      {
        label: 'Tarefas Concluídas por Categoria',
        data: [
          completedTasksByCategory.Indefinido || 0,
          completedTasksByCategory.Médio || 0,
          completedTasksByCategory.Importante || 0,
        ],
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="app">
      <h1>Lista de Tarefas</h1>
      <Search search={search} setSearch={setSearch} />
      <Filter filter={filter} setFilter={setFilter} setSort={setSort} />
      <div className="todo-list">
        {todos
          .filter((todo) =>
            filter === 'All'
              ? true
              : filter === 'Completed'
              ? todo.completed
              : !todo.completed
          )
          .filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
          )
          .sort(sortTodos)
          .map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              removeTodo={removeTodo}
              completeTodo={completeTodo}
            />
          ))}
      </div>
      <TodoForm addTodo={addTodo} />
      <h2>Gráfico de Tarefas Concluídas por Mês</h2>
      <div className="chart-container">
        <Bar data={dataMonth} options={options} />
      </div>
      <h2>Gráfico de Tarefas Concluídas por Categoria</h2>
      <div className="chart-container">
        <Bar data={dataCategory} options={options} />
      </div>
    </div>
  );
}

export default App;  // Exporta o componente App como padrão

