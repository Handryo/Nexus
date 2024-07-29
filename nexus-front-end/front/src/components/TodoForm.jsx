import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
    const [value, setValue] = useState(""); // Estado para armazenar o título da tarefa
    const [category, setCategory] = useState(""); // Estado para armazenar a categoria da tarefa
    const [date, setDate] = useState(""); // Estado para armazenar a data da tarefa

    // Defina as categorias localmente
    const categories = ['Indefinido', 'Médio', 'Importante']; // Lista de categorias disponíveis

    // Função para lidar com o envio do formulário
    const handleSubmit = (e) => {
        e.preventDefault(); // Previne o comportamento padrão do formulário

        // Verifica se todos os campos estão preenchidos
        if (!value || !category || !date) return;

        // Formata a data para o formato dd/mm/yyyy
        const formattedDate = formatDate(date);
        
        // Adiciona a nova tarefa
        addTodo(value, category, formattedDate);

        // Limpa os campos do formulário após o envio
        setValue("");
        setCategory("");
        setDate("");
    };

    // Função para formatar a data de yyyy-mm-dd para dd/mm/yyyy
    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="todo-form">
            <h2>Criar tarefa</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Insira o título"
                    value={value}
                    onChange={(e) => setValue(e.target.value)} // Atualiza o estado do título da tarefa
                />
                <select value={category} onChange={(e) => setCategory(e.target.value)}> {/* Atualiza o estado da categoria */}
                    <option value="">Selecione a prioridade</option>
                    {categories.map((option, index) => (
                        <option
                            value={option}
                            key={index}>
                            {option}
                        </option>
                    ))}
                </select>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)} // Atualiza o estado da data
                />
                <button type="submit">Criar tarefa</button> {/* Botão para enviar o formulário */}
            </form>
        </div>
    );
}

export default TodoForm; // Exporta o componente TodoForm como padrão
