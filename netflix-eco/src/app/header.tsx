import { FaHome } from 'react-icons/fa'; // par ex. react-icons

interface HeaderProps {
  query: string;
  setQuery: (q: string) => void;
  onSearch: () => void;
  loadingSearch: boolean;
  onGoHome: () => void;
}

export default function Header({
  query,
  setQuery,
  onSearch,
  loadingSearch,
  onGoHome,
}: Readonly<HeaderProps>) {
  return (
    <header className="flex items-center justify-between p-6 bg-white shadow mb-8 gap-4">
      <button
        onClick={onGoHome}
        aria-label="Accueil"
        className="cursor-pointer text-2xl text-blue-600 hover:text-blue-800"
      >
        <FaHome />
      </button>

      <div className="flex flex-grow gap-2 max-w-lg">
        <input
          type="text"
          placeholder="Nom de la série/film ..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onSearch();
            }
          }}
          className="flex-grow p-3 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={onSearch}
          disabled={loadingSearch || !query.trim()}
          className="cursor-pointer px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loadingSearch ? 'Recherche...' : 'Rechercher'}
        </button>
      </div>
    </header>
  );
}
