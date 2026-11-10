import { useState, useEffect } from 'react';
import { agendamentoService } from '../services/agendamentoService';
import { veiculoService } from '../services/veiculoService';
import AgendamentoForm from '../components/AgendamentoForm';
import AlterarDataModal from '../components/AlterarDataModal';

export default function AgendamentosPage() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [veiculos, setVeiculos] = useState([]);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [carregando, setCarregando] = useState(false);
  const [agendamentoModal, setAgendamentoModal] = useState(null);

  const carregarAgendamentos = async () => {
    setCarregando(true);
    try {
      const data = await agendamentoService.listar();
      setAgendamentos(data);
    } catch {
      setMensagem({ tipo: 'danger', texto: 'Erro ao carregar agendamentos do servidor.' });
    } finally {
      setCarregando(false);
    }
  };

  const carregarVeiculos = async () => {
    try {
      const dataV = await veiculoService.listar();
      setVeiculos(dataV);
    } catch {
      // Silencioso
    }
  };

  useEffect(() => {
    carregarAgendamentos();
    carregarVeiculos();
  }, []);

  const handleCriarAgendamento = async (dadosAgendamento) => {
    try {
      const dataFormatada = dadosAgendamento.data_agendamento.replace('T', ' ') + ':00';
      await agendamentoService.criar({
        ...dadosAgendamento,
        data_agendamento: dataFormatada
      });

      setMensagem({ tipo: 'success', texto: 'Agendamento cadastrado com sucesso!' });
      carregarAgendamentos();
    } catch (err) {
      setMensagem({ tipo: 'danger', texto: err.response?.data?.error || 'Erro ao agendar serviço.' });
    }
  };

  const handleSalvarNovaData = async (novaData) => {
    try {
      const dataFormatada = novaData.replace('T', ' ') + ':00';
      await agendamentoService.atualizarData(agendamentoModal.id, dataFormatada);

      setMensagem({ tipo: 'success', texto: 'Data do agendamento atualizada com sucesso!' });
      setAgendamentoModal(null);
      carregarAgendamentos();
    } catch (err) {
      setMensagem({ tipo: 'danger', texto: err.response?.data?.error || 'Erro ao atualizar data.' });
    }
  };

  return (
    <div>
      <div>
        <h3>Gerenciamento de Agendamentos</h3>
      </div>

      {mensagem.texto && (
        <div role="alert">
          {mensagem.texto}
          <button type="button" onClick={() => setMensagem({ tipo: '', texto: '' })}></button>
        </div>
      )}

      {/* Formulário de Novo Agendamento */}
      <AgendamentoForm
        veiculos={veiculos}
        onSalvar={handleCriarAgendamento}
      />

      {/* Listagem de Agendamentos (Ordenada por dia de agendamento) */}
      <div>
        <div>
          <h6>Agendamentos Cadastrados (Ordenados por Data)</h6>
        </div>
        <div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Data e Horário</th>
                  <th>Serviço / Status</th>
                  <th>Dados do Cliente</th>
                  <th>Dados do Veículo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="5">Carregando agendamentos...</td>
                  </tr>
                ) : agendamentos.length === 0 ? (
                  <tr>
                    <td colSpan="5">Nenhum agendamento encontrado.</td>
                  </tr>
                ) : (
                  agendamentos.map((ag) => (
                    <tr key={ag.id}>
                      <td>
                        <div>
                          {new Date(ag.data_agendamento).toLocaleDateString('pt-BR')}
                        </div>
                        <div>
                          {new Date(ag.data_agendamento).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td>
                        <div>{ag.descricao_servico}</div>
                        <span>{ag.status}</span>
                      </td>

                      {/* Todos os dados do cliente */}
                      <td>
                        <div>👤 {ag.cliente_nome}</div>
                        <div>CPF: {ag.cliente_cpf}</div>
                        <div>Tel: {ag.cliente_telefone}</div>
                        <div>E-mail: {ag.cliente_email}</div>
                      </td>

                      {/* Todos os dados do veículo */}
                      <td>
                        <div>🚗 {ag.veiculo_modelo} ({ag.veiculo_ano})</div>
                        <div>Placa: <span>{ag.veiculo_placa}</span></div>
                        <div>Marca: {ag.veiculo_marca}</div>
                      </td>

                      <td>
                        <button
                          onClick={() => setAgendamentoModal(ag)}
                          title="Remarcar atendimento"
                        >
                          📅 Alterar Data
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de Alteração de Data */}
      <AlterarDataModal
        isOpen={!!agendamentoModal}
        agendamento={agendamentoModal}
        onSalvar={handleSalvarNovaData}
        onFechar={() => setAgendamentoModal(null)}
      />
    </div>
  );
}
