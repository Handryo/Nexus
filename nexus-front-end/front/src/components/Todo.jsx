import React from 'react';

// Componente Todo que recebe as props `todo`, `removeTodo` e `completeTodo`
const Todo = ({ todo, removeTodo, completeTodo }) => {
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}  // Aplica sublinhado se a tarefa estiver concluída
    >
      <div className="content">
        {/* Exibe o texto da tarefa */}
        <p>{todo.text}</p>
        {/* Exibe a categoria da tarefa */}
        <p className="category">({todo.category})</p>
        {/* Exibe a data da tarefa */}
        <p className="date">{todo.date}</p>
      </div>
      <div>
        {/* Botão para marcar a tarefa como completa ou incompleta */}
        <button className="complete" onClick={() => completeTodo(todo.id)}>
          {todo.completed ? 'Desmarcar' : 'Completar'}
        </button>
        {/* Botão para remover a tarefa */}
        <button className="remove" onClick={() => removeTodo(todo.id)}>
          x
        </button>
      </div>
    </div>
  );
};

export default Todo;  // Exporta o componente Todo como padrão
