import { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import TasksPage from './pages/TasksPage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // Estado de usuario
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Estado de tema oscuro
  const [darkMode, setDarkMode] = useState(() => {
    // Leer localStorage o sistema operativo
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

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

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    toast.success('Sesión cerrada correctamente');
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <div className={min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-900'}}>
      {user ? (
        <TasksPage user={user} onLogout={handleLogout} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      ) : (
        <LoginPage onLogin={handleLogin} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      )}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;