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
      {/* Botón con animación de escala en hover y tap */}
      <motion.button
        onClick={toggleDarkMode}
        className="mb-6 px-3 py-1 border rounded text-sm"
        whileHover={{ scale: 1.05, backgroundColor: darkMode ? '#4b5563' : '#e5e7eb' }} 
        whileTap={{ scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
      </motion.button>

      {/* Login con animación de aparición en fade y slide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Login onLogin={onLogin} darkMode={darkMode} />
      </motion.div>
    </motion.div>
  );
}
