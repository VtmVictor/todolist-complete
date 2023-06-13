import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [tarefas, setTarefas] = useState([]);
  const [nome, setNome] = useState('');

  useEffect(() => {
    carregarTarefas();
  }, []);

  const carregarTarefas = async () => {
    try {
      const response = await axios.get('http://localhost:3002/tarefas');
      setTarefas(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const adicionarTarefa = async () => {
    try {
      await axios.post('http://localhost:3002/tarefas', { nome });
      setNome('');
      carregarTarefas();
    } catch (error) {
      console.error(error);
    }
  };

  const concluirTarefa = async (id, feito, nome) => {
    try {
      await axios.put(`http://localhost:3002/tarefas/${id}`, { feito: !feito, nome});
      carregarTarefas();
    } catch (error) {
      console.error(error);
    }
  };

  const removerTarefa = async (id) => {
    try {
      await axios.delete(`http://localhost:3002/tarefas/${id}`);
      carregarTarefas();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="title">Tarefas</h1>
      <form className="form" onSubmit={(e) => {
        e.preventDefault();
        adicionarTarefa();
      }}>
        <input className="input" type="text" value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Nome da tarefa" />
        <button className="button" type="submit">Adicionar</button>
      </form>
      <ul className="task-list">
        {tarefas.map((tarefa) => (
          <li className="task-item" key={tarefa.id}>
            <span className={`task-name ${tarefa.feito ? 'task-done' : ''}`}>{tarefa.nome}</span>
            <div>
              <button
                className={`task-button ${tarefa.feito ? 'task-undone' : 'task-done'}`}
                onClick={() => concluirTarefa(tarefa.id, tarefa.feito, tarefa.nome)}
              >
                {tarefa.feito ? 'Desfazer' : 'Concluir'}
              </button>
              <button className="task-button task-delete" onClick={() => removerTarefa(tarefa.id)}>Remover</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
