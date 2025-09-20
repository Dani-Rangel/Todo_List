export default function FilterBar({ filter, setFilter, search, setSearch, darkMode }) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between mb-4">
      <input
        type="text"
        placeholder="Buscar..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={`flex-1 p-2 border rounded transition-colors duration-300 ${
          darkMode
            ? 'bg-gray-800 border-gray-700 text-gray-100 placeholder-gray-400'
            : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
        }`}
      />
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className={`p-2 border rounded transition-colors duration-300 ${
          darkMode
            ? 'bg-gray-800 border-gray-700 text-gray-100'
            : 'bg-white border-gray-300 text-gray-900'
        }`}
      >
        <option value="all">Todas</option>
        <option value="completed">Completadas</option>
        <option value="pending">Pendientes</option>
      </select>
    </div>
  );
}