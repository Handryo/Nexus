import React from 'react';

// Componente para aplicar filtros e ordenação à lista de tarefas
const Filter = ({ filter, setFilter, setSort }) => {
    return (
        <div className="filter">
            <h2>Filtrar:</h2>
            <div className="filter-options">
                {/* Seção para seleção do status das tarefas */}
                <div>
                    <p>Status:</p>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">Todas</option>
                        <option value="Completed">Completas</option>
                        <option value="Incomplete">Incompletas</option>
                    </select>
                </div>

                {/* Seção para ordenação alfabética das tarefas */}
                <div>
                    <p>Ordem alfabética</p>
                    <button onClick={() => setSort("AscAlpha")}>Asc</button>
                    <button onClick={() => setSort("DescAlpha")}>Desc</button>
                </div>

                {/* Seção para ordenação por data das tarefas */}
                <div>
                    <p>Data</p>
                    <button onClick={() => setSort("Recente")}>Recente</button>
                    <button onClick={() => setSort("Antigo")}>Antigo</button>
                </div>
            </div>
        </div>
    );
}

export default Filter;

  