import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Estado de usuario, cargado desde localStorage si existe
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Estado de modo oscuro, inicializado en false y actualizado en useEffect
  const [darkMode, setDarkMode] = useState(false);

  // En useEffect detectamos la preferencia y localStorage para darkMode
  useEffect(() => {
    // Verificamos localStorage primero
    const saved = localStorage.getItem('darkMode');

    if (saved !== null) {
      setDarkMode(JSON.parse(saved));
    } else {
      // Si no hay guardado, verificamos la preferencia del sistema
      if (typeof window !== 'undefined' && window.matchMedia) {
        setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
      } else {
        setDarkMode(false);
      }
    }
  }, []);

  // Sincronizamos la clase 'dark' en <html> y guardamos en localStorage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Función para manejar login simple con usuarios hardcodeados
  const handleLogin = ({ username, password }) => {
    const validUsers = [
      { username: 'usuario', password: '1234' },
      { username: 'admin', password: '5678' },
    ];

    const match = validUsers.find(
      (u) => u.username === username && u.password === password
    );

    if (match) {
      const userData = { username };
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
    } else {
      toast.error('Usuario o contraseña incorrectos');
    }
  };

  // Función para cerrar sesión y limpiar estado y localStorage
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Sesión cerrada correctamente');
  };

  // Alternar modo oscuro
  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'
      }`}
    >
      {user ? (
        <TasksPage
          user={user}
          onLogout={handleLogout}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      ) : (
        <LoginPage
          onLogin={handleLogin}
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
