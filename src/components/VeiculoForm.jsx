import { useState } from 'react';

export default function VeiculoForm({ clientes, onSalvar }) {
  const [formData, setFormData] = useState({
    placa: '',
    modelo: '',
    marca: '',
    ano: new Date().getFullYear(),
    cliente_id: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);

    // Reseta o formulário após salvar
    setFormData({
      placa: '',
      modelo: '',
      marca: '',
      ano: new Date().getFullYear(),
      cliente_id: ''
    });
  };

  return (
    <div>
      <h5>🚗 Cadastrar Novo Veículo</h5>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Placa do Veículo</label>
            <input
              type="text"
              placeholder="Ex: ABC-1D23"
              value={formData.placa}
              onChange={(e) => setFormData({ ...formData, placa: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Modelo</label>
            <input
              type="text"
              placeholder="Ex: Civic, Corolla, Onix"
              value={formData.modelo}
              onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Marca / Fabricante</label>
            <input
              type="text"
              placeholder="Ex: Honda, Toyota, Chevrolet"
              value={formData.marca}
              onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Ano</label>
            <input
              type="number"
              value={formData.ano}
              onChange={(e) => setFormData({ ...formData, ano: e.target.value })}
              required
            />
          </div>

          {/* Seleção do Cliente via Lista Suspensa (Select) */}
          <div>
            <label>
              Proprietário do Veículo (Cliente) *
            </label>
            <select
              value={formData.cliente_id}
              onChange={(e) => setFormData({ ...formData, cliente_id: e.target.value })}
              required
            >
              <option value="">Selecione o Cliente</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome} (CPF: {c.cpf})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <button type="submit">
            Salvar Veículo
          </button>
        </div>
      </form>
    </div>
  );
}
