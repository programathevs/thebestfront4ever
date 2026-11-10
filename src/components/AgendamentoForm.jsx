import { useState } from 'react';

export default function AgendamentoForm({ veiculos, onSalvar }) {
  const [formData, setFormData] = useState({
    veiculo_id: '',
    data_agendamento: '',
    descricao_servico: '',
    status: 'Agendado'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);

    setFormData({
      veiculo_id: '',
      data_agendamento: '',
      descricao_servico: '',
      status: 'Agendado'
    });
  };

  return (
    <div>
      <h5>📅 Novo Agendamento</h5>

      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label>Veículo do Atendimento *</label>
            <select
              value={formData.veiculo_id}
              onChange={(e) => setFormData({ ...formData, veiculo_id: e.target.value })}
              required
            >
              <option value="">Selecione o Veículo</option>
              {veiculos.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.modelo} - {v.placa} (Proprietário: {v.cliente_nome})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Data e Horário *</label>
            <input
              type="datetime-local"
              value={formData.data_agendamento}
              onChange={(e) => setFormData({ ...formData, data_agendamento: e.target.value })}
              required
            />
          </div>

          <div>
            <label>Descrição do Serviço / Reparo *</label>
            <textarea
              rows="2"
              placeholder="Ex: Troca de óleo e filtro, alinhamento, balanceamento..."
              value={formData.descricao_servico}
              onChange={(e) => setFormData({ ...formData, descricao_servico: e.target.value })}
              required
            ></textarea>
          </div>
        </div>

        <div>
          <button type="submit">
            Confirmar Agendamento
          </button>
        </div>
      </form>
    </div>
  );
}
