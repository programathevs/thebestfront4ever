import { useState, useEffect } from 'react';

export default function AlterarDataModal({ isOpen, agendamento, onSalvar, onFechar }) {
  const [novaData, setNovaData] = useState('');

  useEffect(() => {
    if (agendamento && agendamento.data_agendamento) {
      const d = new Date(agendamento.data_agendamento);
      const tzOffset = d.getTimezoneOffset() * 60000;
      const localISOTime = new Date(d.getTime() - tzOffset).toISOString().slice(0, 16);
      setNovaData(localISOTime);
    } else {
      setNovaData('');
    }
  }, [agendamento]);

  if (!isOpen || !agendamento) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!novaData) return;
    onSalvar(novaData);
  };

  return (
    <div
      tabIndex="-1"
      role="dialog"
    >
      <div role="document">
        <div>
          <div>
            <h5>
              📅 Alterar Data do Agendamento
            </h5>
            <button
              type="button"
              onClick={onFechar}
              aria-label="Fechar"
            ></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div>
              <div>
                <div>Dados do Atendimento:</div>
                <div>👤 Cliente: {agendamento.cliente_nome}</div>
                <div>🚗 Veículo: {agendamento.veiculo_modelo} ({agendamento.veiculo_placa})</div>
                <div>Serviço: {agendamento.descricao_servico}</div>
              </div>

              <div>
                <label>Nova Data e Horário:</label>
                <input
                  type="datetime-local"
                  value={novaData}
                  onChange={(e) => setNovaData(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={onFechar}
              >
                Cancelar
              </button>
              <button
                type="submit"
              >
                Salvar Nova Data
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
