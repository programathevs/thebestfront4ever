import { Link } from 'react-router-dom';

export default function Navbar({ usuario, onLogout }) {
  return (
    <nav>
      <div>
        <Link to="/dashboard">
          🔧 AutoCare
        </Link>

        {/* Menu de navegação para os recursos do sistema */}
        <div>
          <ul>
            <li>
              <Link to="/dashboard">
                Início
              </Link>
            </li>
            <li>
              <Link to="/clientes">
                Clientes
              </Link>
            </li>
            <li>
              <Link to="/veiculos">
                Veículos
              </Link>
            </li>
            <li>
              <Link to="/agendamentos">
                Agendamentos
              </Link>
            </li>
          </ul>

          {/* Exibição do Nome do Usuário Logado e Logout */}
          <div>
            <span>
              Usuário: <strong>{usuario?.nome || 'Usuário'}</strong>
            </span>
            <button
              onClick={onLogout}
              title="Encerrar sessão"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
