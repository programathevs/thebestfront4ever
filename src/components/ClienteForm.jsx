import { useState, useEffect } from 'react';

export default function ClienteForm({ clienteEditando, onSalvar, onCancelar }) {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: ''
  });

  useEffect(() => {
    if (clienteEditando) {
      setFormData({
        nome: clienteEditando.nome || '',
        cpf: clienteEditando.cpf || '',
        telefone: clienteEditando.telefone || '',
        email: clienteEditando.email || ''
      });
    } else {
      setFormData({ nome: '', cpf: '', telefone: '', email: '' });
    }
  }, [clienteEditando]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);
  };

  return (
    <div>
      <h5>
        {clienteEditando ? `✏️ Editar Cliente: ${clienteEditando.nome}` : 'Cadastrar Novo Cliente'}
      </h5>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Nome Completo</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>CPF</label>
            <input
              type="text"
              name="cpf"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Telefone</label>
            <input
              type="text"
              name="telefone"
              placeholder="(00) 00000-0000"
              value={formData.telefone}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div>
          {clienteEditando && (
            <button type="button" onClick={onCancelar}>
              Cancelar
            </button>
          )}
          <button type="submit">
            Salvar Cliente
          </button>
        </div>
      </form>
    </div>
  );
}
