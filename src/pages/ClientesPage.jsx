import { useState, useEffect } from 'react';
import { clienteService } from '../services/clienteService';
import ClienteForm from '../components/ClienteForm';

export default function ClientesPage() {
  const [clientes, setClientes] = useState([]);
  const [termoBusca, setTermoBusca] = useState('');
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' });
  const [carregando, setCarregando] = useState(false);
  const [clienteEditando, setClienteEditando] = useState(null);

  const carregarClientes = async (termo = '') => {
    setCarregando(true);
    try {
      const data = await clienteService.listar(termo);
      setClientes(data);
    } catch {
      setMensagem({ tipo: 'danger', texto: 'Erro ao carregar clientes do servidor.' });
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarClientes();
  }, []);

  const handleBuscar = (e) => {
    e.preventDefault();
    carregarClientes(termoBusca);
  };

  const handleLimparBusca = () => {
    setTermoBusca('');
    carregarClientes('');
  };

  const handleSalvarCliente = async (dadosCliente) => {
    try {
      if (clienteEditando) {
        await clienteService.atualizar(clienteEditando.id, dadosCliente);
        setMensagem({ tipo: 'success', texto: 'Dados do cliente atualizados com sucesso!' });
      } else {
        await clienteService.criar(dadosCliente);
        setMensagem({ tipo: 'success', texto: 'Cliente cadastrado com sucesso!' });
      }
      setClienteEditando(null);
      carregarClientes(termoBusca);
    } catch (err) {
      setMensagem({ tipo: 'danger', texto: err.response?.data?.error || 'Erro ao salvar cliente.' });
    }
  };

  const handleCancelarEdicao = () => {
    setClienteEditando(null);
  };

  return (
    <div>
      <div>
        <h3>Gerenciamento de Clientes</h3>
      </div>

      {mensagem.texto && (
        <div role="alert">
          {mensagem.texto}
          <button type="button" onClick={() => setMensagem({ tipo: '', texto: '' })}></button>
        </div>
      )}

      {/* Busca com inserção e confirmação */}
      <div>
        <form onSubmit={handleBuscar}>
          <div>
            <label>Buscar Cliente:</label>
          </div>
          <div>
            <input
              type="text"
              placeholder="Digite o termo (nome ou e-mail)..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
            />
          </div>
          <div>
            <button type="submit">
              Buscar
            </button>
            {termoBusca && (
              <button type="button" onClick={handleLimparBusca}>
                Limpar
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Formulário Componentizado de Cadastro e Edição */}
      <ClienteForm
        clienteEditando={clienteEditando}
        onSalvar={handleSalvarCliente}
        onCancelar={handleCancelarEdicao}
      />

      {/* Listagem dos Clientes */}
      <div>
        <div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Nome do Cliente</th>
                  <th>CPF</th>
                  <th>Telefone</th>
                  <th>E-mail</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {carregando ? (
                  <tr>
                    <td colSpan="5">Carregando dados...</td>
                  </tr>
                ) : clientes.length === 0 ? (
                  <tr>
                    <td colSpan="5">Nenhum cliente encontrado para o termo pesquisado.</td>
                  </tr>
                ) : (
                  clientes.map((c) => (
                    <tr key={c.id}>
                      <td>{c.nome}</td>
                      <td>{c.cpf}</td>
                      <td>{c.telefone}</td>
                      <td>{c.email}</td>
                      <td>
                        <button
                          onClick={() => setClienteEditando(c)}
                          title="Editar dados do cliente"
                        >
                          ✏️ Editar
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
    </div>
  );
}
