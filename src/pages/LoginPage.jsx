import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setCarregando(true);

    try {
      await authService.login(email, senha);
      navigate('/dashboard');
    } catch (err) {
      const mensagemErro = err.response?.data?.error || 'Falha ao autenticar. Verifique suas credenciais.';
      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div>
      <div>
        <div>
          <h2>AutoCare</h2>
          <p>Sistema de Gestão Automotiva</p>
        </div>

        {erro && (
          <div role="alert">
            <strong>Erro: </strong>{erro}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div>
            <label>E-mail</label>
            <input
              type="email"
              placeholder="Digite seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Senha</label>
            <input
              type="password"
              placeholder="Digite sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={carregando}
          >
            {carregando ? 'Autenticando...' : 'Entrar no Sistema'}
          </button>
        </form>
      </div>
    </div>
  );
}
