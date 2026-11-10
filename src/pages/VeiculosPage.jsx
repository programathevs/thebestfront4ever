import { useState, useEffect } from 'react';
import { veiculoService } from '../services/veiculoService';
import { clienteService } from '../services/clienteService';
import VeiculoForm from '../components/VeiculoForm';

export default function VeiculosPage() {
  const [veiculos, setVeiculos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [carregando, setCarregando] = useState(false);

  const carregarDados = async () => {
    setCarregando(true);
    try {
      const [dataV, dataC] = await Promise.all([
        veiculoService.listar(),
        clienteService.listar()
      ]);
      setVeiculos(dataV);
      setClientes(dataC);
    } catch {
      setMensagem({ tipo: 'danger', texto: 'Erro ao carregar dados dos veículos.' });
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarDados();
  }, []);

  const handleSalvarVeiculo = async (novoVeiculo) => {
    try {
      await veiculoService.criar(novoVeiculo);
      setMensagem({ tipo: 'success', texto: 'Veículo cadastrado e associado ao cliente com sucesso!' });
      carregarDados();
    } catch (err) {
      setMensagem({ tipo: 'danger', texto: err.response?.data?.error || 'Erro ao cadastrar veículo.' });
    }
  };

  return (
    <div>
      <div>
        <h3>Gerenciamento de Veículos</h3>
      </div>

      {mensagem.texto && (
        <div role="alert">
          {mensagem.texto}
          <button type="button" onClick={() => setMensagem({ tipo: '', texto: '' })}></button>
        </div>
      )}

      <VeiculoForm
        clientes={clientes}
        onSalvar={handleSalvarVeiculo}
      />

      {/* Tabela de Listagem de Veículos */}
      <div>
        <div>
          <h6>Veículos Cadastrados no Sistema</h6>
        </div>
        <div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Placa</th>
                  <th>Modelo</th>
                  <th>Marca</th>
                  <th>Ano</th>
                  <th>Cliente Proprietário</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="5">Carregando veículos...</td>
                  </tr>
                ) : veiculos.length === 0 ? (
                  <tr>
                    <td colSpan="5">Nenhum veículo cadastrado.</td>
                  </tr>
                ) : (
                  veiculos.map((v) => (
                    <tr key={v.id}>
                      <td><span>{v.placa}</span></td>
                      <td>{v.modelo}</td>
                      <td>{v.marca}</td>
                      <td>{v.ano}</td>
                      <td>
                        <span>👤 {v.cliente_nome}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
