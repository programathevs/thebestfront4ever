import { useState, useEffect } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { authService } from '../services/authService';

export default function ProtectedRoute() {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function verificarSessao() {
      try {
        const data = await authService.getMe();
        if (data?.usuario) {
          setUsuario(data.usuario);
        } else {
          setUsuario(null);
        }
      } catch {
        setUsuario(null);
      } finally {
        setCarregando(false);
      }
    }
    verificarSessao();
  }, []);

  const handleLogout = async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Erro ao encerrar sessão:', err);
    } finally {
      setUsuario(null);
      navigate('/login');
    }
  };

  if (carregando) {
    return (
      <div>
        <div role="status">
          <span>Verificando sessão segura...</span>
        </div>
      </div>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div>
      <Navbar usuario={usuario} onLogout={handleLogout} />
      
      <main>
        <Outlet context={{ usuario }} />
      </main>

      <footer>
        <span>AutoCare - Sistema de Gestão Automotiva &copy; {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
