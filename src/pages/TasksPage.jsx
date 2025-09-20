// src/pages/TasksPage.jsx
import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import FilterBar from '../components/FilterBar';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

export default function TasksPage({ user, onLogout, darkMode, toggleDarkMode }) {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const API_URL = 'http://localhost:3001/tasks';
  const TASKS_PER_PAGE = 8;

  useEffect(() => {
    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error('Error al obtener tareas: ' + res.status);
        return res.json();
      })
      .then((data) => {
        setTasks(data);
      })
      .catch((err) => {
        console.error('Error al cargar tareas:', err);
        toast.error('Error al cargar tareas');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reiniciar a la página 1 si cambia filtro o búsqueda
  }, [filter, search]);

  const addTask = (task) => {
    setLoading(true);
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al agregar tarea: ' + res.status);
        return res.json();
      })
      .then((newTask) => {
        setTasks((prev) => [...prev, newTask]);
        toast.success('Tarea agregada');
      })
      .catch((err) => {
        console.error(err);
        toast.error('Error al agregar tarea');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const toggleTask = async (id) => {
    const task = tasks.find((t) => String(t.id) === String(id));
    if (!task) {
      toast.error("Tarea no encontrada");
      return;
    }

    const newCompleted = !Boolean(task.completed);
    const prevTasks = [...tasks];

    setTasks((prev) =>
      prev.map((t) =>
        String(t.id) === String(id) ? { ...t, completed: newCompleted } : t
      )
    );

    toast.info(Tarea marcada como ${newCompleted ? "completada ✅" : "pendiente ⏳"});

    try {
      const res = await fetch(${API_URL}/${task.id}, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...task, completed: newCompleted }),
      });

      if (!res.ok) throw new Error(Error al actualizar tarea: ${res.status});

      const updatedTask = await res.json();
      setTasks((prev) =>
        prev.map((t) =>
          String(t.id) === String(updatedTask.id) ? updatedTask : t
        )
      );
    } catch (err) {
      console.error("Error en toggleTask:", err);
      toast.error("Error al actualizar tarea, revirtiendo cambios");
      setTasks(prevTasks);
    }
  };

  const deleteTask = (id) => {
    setLoading(true);
    fetch(${API_URL}/${id}, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) throw new Error('Error al eliminar tarea: ' + res.status);
        setTasks((prev) => prev.filter((t) => String(t.id) !== String(id)));
        toast.warn('Tarea eliminada');
      })
      .catch((err) => {
        console.error('Error al eliminar tarea:', err);
        toast.error('Error al eliminar tarea');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const editTask = async (id, newTitle) => {
    const task = tasks.find((t) => String(t.id) === String(id));
    if (!task) return;

    const updatedTask = { ...task, title: newTitle };

    try {
      const res = await fetch(${API_URL}/${id}, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask),
      });

      if (!res.ok) throw new Error(Error al editar tarea: ${res.status});

      const data = await res.json();
      setTasks((prev) =>
        prev.map((t) => (String(t.id) === String(id) ? data : t))
      );
      toast.success("Tarea actualizada ✏️");
    } catch (err) {
      console.error("Error editando tarea:", err);
      toast.error("Error al editar tarea");
    }
  };

  // Filtrar tareas por búsqueda y filtro
  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === 'all'
        ? true
        : filter === 'completed'
        ? task.completed
        : !task.completed;
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calcular tareas por página
  const totalPages = Math.ceil(filteredTasks.length / TASKS_PER_PAGE);
  const startIndex = (currentPage - 1) * TASKS_PER_PAGE;
  const paginatedTasks = filteredTasks.slice(startIndex, startIndex + TASKS_PER_PAGE);

  return (
    <motion.div
      className="max-w-2xl mx-auto p-4 transition-colors duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
        <h1 className="text-2xl font-bold">Tareas de {user.username}</h1>
        <div className="flex gap-2">
          <button
            onClick={toggleDarkMode}
            className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
          <button
            onClick={onLogout}
            className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {loading && (
        <div className="w-full h-1 bg-blue-500 rounded mb-4 animate-pulse" />
      )}

      <TaskForm onAddTask={addTask} author={user.username} darkMode={darkMode} />

      <FilterBar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        darkMode={darkMode}
      />

      <TaskList 
        tasks={paginatedTasks} 
        onToggle={toggleTask} 
        onDelete={deleteTask} 
        onEdit={editTask}
        darkMode={darkMode}
      />

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2 flex-wrap">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 text-white font-semibold dark:bg-gray-700 text-gray-200 rounded disabled:opacity-50"
          >
            Anterior
          </button>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 rounded ${
                  currentPage === page
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-200 font-semibold dark:bg-gray-700 text-white'
                }`}
              >
                {page}
              </button>
            );
          })}

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-200 text-white font-semibold dark:bg-gray-700 text-gray-200 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </motion.div>
  );
}