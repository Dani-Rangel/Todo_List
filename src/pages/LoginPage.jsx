import Login from '../components/Login';
import { motion } from 'framer-motion';

export default function LoginPage({ onLogin, darkMode, toggleDarkMode }) {
  return (
    <motion.div
      className={`min-h-screen flex flex-col items-center justify-center transition-colors duration-300 ${
        darkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
      }`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={toggleDarkMode}
        className="mb-6 px-3 py-1 border rounded text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition"
      >
        {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </button>

      {/* 🔑 pasamos darkMode como prop */}
      <Login onLogin={onLogin} darkMode={darkMode} />
    </motion.div>
  );
}
