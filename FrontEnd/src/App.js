import React, { useState, useEffect } from 'react';
import ListaClientes from './ListaClientes';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: {
      rua: '',
      numero: '',
      cidade: '',
      estado: '',
      cep: ''
    }
  });

  const [clientes, setClientes] = useState([]);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [idEditando, setIdEditando] = useState(null);

  const fetchClientes = async () => {
    try {
      const res = await fetch(`${API_URL}/usuarios`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setClientes(data);
      } else {
        console.error('Dados recebidos não são uma lista:', data);
        setClientes([]);
      }
    } catch (err) {
      console.error('Erro ao buscar clientes:', err);
      setClientes([]);
    }
  };
  

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('endereco.')) {
      const field = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        endereco: {
          ...prev.endereco,
          [field]: value
        }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const clienteData = { ...form };
    if (modoEdicao) {
      delete clienteData._id;
      delete clienteData.__v;
    
      if (clienteData.endereco && clienteData.endereco._id) {
        delete clienteData.endereco._id;
      }
    }
    

  const url = modoEdicao
    ? `${API_URL}/usuarios/${idEditando}`
    : `${API_URL}/usuarios`;

  const method = modoEdicao ? 'PUT' : 'POST';

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(clienteData) // ✅ agora sim, envia os dados certos
    });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.detalhes || errorData.message || 'Erro ao salvar cliente');
      }

      alert(modoEdicao ? 'Cliente atualizado!' : 'Cliente cadastrado!');
      setForm({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        endereco: {
          rua: '',
          numero: '',
          cidade: '',
          estado: '',
          cep: ''
        }
      });
      setModoEdicao(false);
      setIdEditando(null);
      fetchClientes();
    } catch (err) {
      alert('Erro ao salvar cliente');
      console.error(err);
    }
  };

  const handleEditar = (cliente) => {
    setForm(cliente);
    setModoEdicao(true);
    setIdEditando(cliente._id);
  };

  const handleDeletar = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir?')) {
      try {
        const response = await fetch(`${API_URL}/usuarios/${id}`, {
          method: 'DELETE'
        });
        if (!response.ok) {
          throw new Error('Erro ao excluir cliente');
        }
        fetchClientes();
      } catch (err) {
        alert('Erro ao excluir cliente');
        console.error(err);
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>{modoEdicao ? 'Editar Cliente' : 'Cadastro de Cliente'}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input type="text" name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} required />
        <input type="text" name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} required />

        <h3>Endereço</h3>
        <input type="text" name="endereco.rua" placeholder="Rua" value={form.endereco.rua} onChange={handleChange} required />
        <input type="text" name="endereco.numero" placeholder="Número" value={form.endereco.numero} onChange={handleChange} required />
        <input type="text" name="endereco.cidade" placeholder="Cidade" value={form.endereco.cidade} onChange={handleChange} required />
        <input type="text" name="endereco.estado" placeholder="Estado" value={form.endereco.estado} onChange={handleChange} required />
        <input type="text" name="endereco.cep" placeholder="CEP" value={form.endereco.cep} onChange={handleChange} required />

        <button type="submit" style={{ marginTop: '10px' }}>
          {modoEdicao ? 'Atualizar Cliente' : 'Cadastrar Cliente'}
        </button>
      </form>

      <hr style={{ margin: '2rem 0' }} />

      <ListaClientes
        clientes={clientes}
        onEditar={handleEditar}
        onDeletar={handleDeletar}
      />
    </div>
  );
}

export default App;
