import { useState } from "react";
import { motion } from "framer-motion";

export default function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = () => {
    if (newTitle.trim() === "") return;
    onEdit(task.id, newTitle);
    setIsEditing(false);
  };

  return (
    <motion.div
    layout
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    className={`flex flex-col justify-between h-30 p-4 rounded-2xl shadow-lg transition-colors duration-300
      ${task.completed
        ? "bg-green-100 dark:bg-green-900 opacity-70 line-through text-gray-500 dark:text-gray-400"
        : "bg-white dark:bg-gray-800"
      }
    `}
  >
      {/* 📌 Contenido principal */}
      <div className="flex-1">
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border px-2 py-1 rounded w-full dark:bg-gray-700 dark:text-white"
          />
        ) : (
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {task.title}
          </h2>
        )}
        <p className="text-base text-gray-500 dark:text-gray-400 flex items-center gap-2">
        {"Por:"}{task.author} <p className="text-sm"> | {new Date(task.date).toLocaleString() }  |</p>
        </p>
      </div>

      {/* 📌 Botones de acción */}
      <div className="flex  ml-4">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-3 py-1 text-green-500 text-white rounded hover:text-green-600 transition"
          >
            Guardar
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-yellow-600 text-white rounded hover:text-yellow-500 transition"
          >
            Editar
          </button>
        )}

        <button
          onClick={() => onToggle(task.id)}
          className={`px-3 py-1 rounded  transition ${
            task.completed
              ? "text-blue-400 hover:text-blue-500"
              : "text-stone-500 hover:text-stone-400"
          }`}
        >
          {task.completed ? "Completar" : "Pendiente"}
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="px-3 py-1 text-red-700  rounded hover:text-red-800 transition"
        >
          Eliminar
        </button>
      </div>
    </motion.div>
  );
}
