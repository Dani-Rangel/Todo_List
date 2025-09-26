import React from 'react';
import { useState } from 'react';

export default function TaskForm({ onAddTask, author, darkMode }) {
  const [title, setTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (title.trim() === '') return;

    onAddTask({
      id: String,
      title,
      completed: false,
      author,
      date: new Date().toISOString(),
    });

    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 my-4">
      <input
        type="text"
        placeholder="Nueva tarea"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={`flex-1 p-2 border rounded transition-colors duration-300 ${
          darkMode
            ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        }`}
      />
      <button
        className={`px-4 rounded transition-colors duration-300 ${
          darkMode
            ? 'bg-green-600 text-white hover:bg-green-500'
            : 'bg-green-500 text-white hover:bg-green-600'
        }`}
      >
        Agregar
      </button>
    </form>
  );
}