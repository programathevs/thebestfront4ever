import { useOutletContext, Link } from 'react-router-dom';

export default function DashboardPage() {
  const { usuario } = useOutletContext();

  return (
    <div>
      {/* Exibição do Nome do Usuário Logado */}
      <div>
        <h3>Bem-vindo(a), {usuario?.nome}!</h3>
        <p>Selecione um dos módulos abaixo para gerenciar os registros do sistema.</p>
      </div>

      {/* Cards de Acesso aos Recursos */}
      <div>
        <div>
          <div>
            <h5>Gerenciar Clientes</h5>
            <p>Cadastro, busca e edição de dados de clientes.</p>
            <Link to="/clientes">
              Acessar Clientes &rarr;
            </Link>
          </div>
        </div>

        <div>
          <div>
            <h5>Gerenciar Veículos</h5>
            <p>Cadastro e listagem de veículos vinculados aos clientes.</p>
            <Link to="/veiculos">
              Acessar Veículos &rarr;
            </Link>
          </div>
        </div>

        <div>
          <div>
            <h5>Agendamentos</h5>
            <p>Listagem ordenada por data, novos agendamentos e alteração de data.</p>
            <Link to="/agendamentos">
              Acessar Agendamentos &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
