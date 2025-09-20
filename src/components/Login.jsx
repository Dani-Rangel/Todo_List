import { useState } from 'react';

export default function Login({ onLogin, darkMode }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username.trim() === '' || password.trim() === '') {
      alert('Campos vacíos');
      return;
    }

    onLogin({ username, password });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 p-4 h-100 w-100 items-center justify-center max-w-sm mx-auto mt-10 border rounded shadow transition-colors duration-300  ${
        darkMode
          ? 'bg-gray-800 border-gray-700 text-gray-100'
          : 'bg-white border-gray-300 text-gray-900'
      }`}
    >
      <h2 className="text-xl font-bold text-center mb-10">Iniciar Sesion</h2>

      <input
        type="text"
        placeholder="Usuario"
        className={`p-2 border rounded w-70 transition-colors duration-300 ${
          darkMode
            ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
        }`}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        className={`p-2 border rounded w-70 transition-colors duration-300 ${
          darkMode
            ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400'
            : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500'
        }`}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className={`p-2 rounded w-70 transition-colors duration-300 ${
          darkMode
            ? 'bg-cyan-600 text-white hover:bg-cyan-500'
            : 'bg-cyan-200 text-black hover:bg-cyan-300'
        }`}
      >
        Iniciar sesión
      </button>
    </form>
  );
}
