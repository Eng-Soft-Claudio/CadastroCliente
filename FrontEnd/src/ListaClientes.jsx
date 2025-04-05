import React from 'react';

const ListaClientes = ({ clientes, onEditar, onDeletar }) => {
  return (
    <div style={{ padding: '20px' }}>
      <h2>📋 Lista de Clientes</h2>
      {clientes.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: '1rem', width: '100%' }}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Email</th>
              <th>Telefone</th>
              <th>CPF</th>
              <th>Endereço</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente._id}>
                <td>{cliente.nome}</td>
                <td>{cliente.email}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.cpf}</td>
                <td>
                  {cliente.endereco?.rua}, {cliente.endereco?.numero}<br />
                  {cliente.endereco?.cidade} - {cliente.endereco?.estado}<br />
                  CEP: {cliente.endereco?.cep}
                </td>
                <td>
                <button className="edit" onClick={() => onEditar(cliente)}>✏️ Editar</button>
                <button className="delete" onClick={() => onDeletar(cliente._id)}>🗑️ Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListaClientes;
