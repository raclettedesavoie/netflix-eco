'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Header from './header';
import SeriesResults from './series-results';
import MySeries from './my-series';
import { SearchResult, SerieBase, SerieDetails } from './shared/types';

export default function SeriesSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [serieDetails, setSerieDetails] = useState<SerieDetails[] | null>(null);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mySeries, setMySeries] = useState<SerieBase[]>([]);
  const [view, setView] = useState<'mySeries' | 'searchResults'>('mySeries');

  const handleSearch = async () => {
    try {
      setLoadingSearch(true);
      setError(null);
      setSerieDetails(null);
      setResults([]);

      // Requêtes TV et Movie en parallèle
      const [tvRes, movieRes] = await Promise.all([
        fetch(`https://localhost:7238/api/Movie/search?query=${encodeURIComponent(query)}&type=tv`),
        fetch(
          `https://localhost:7238/api/Movie/search?query=${encodeURIComponent(query)}&type=movie`
        ),
      ]);

      if (!tvRes.ok || !movieRes.ok) throw new Error('Erreur lors de la recherche');

      const tvJson = await tvRes.json();
      const movieJson = await movieRes.json();

      // Fusion des résultats
      const merged: SearchResult[] = [
        ...(tvJson.results ?? []).map((item: SearchResult) => ({ ...item, type: 'tv' })),
        ...(movieJson.results ?? []).map((item: SearchResult) => ({
          ...item,
          type: 'movie',
          name: item.title,
          first_air_date: item.release_date,
        })),
      ];

      // Tri personnalisé :
      // 1. Nom exact (non sensible à la casse),
      // 2. Puis popularité décroissante
      const sortedResults = merged
        .sort((a, b) => {
          const queryLower = query.trim().toLowerCase();

          const isExactA = a.name?.toLowerCase() === queryLower ? 1 : 0;
          const isExactB = b.name?.toLowerCase() === queryLower ? 1 : 0;

          if (isExactA !== isExactB) return isExactB - isExactA; // Exact match en premier
          return b.popularity - a.popularity; // Sinon, trier par popularité
        })
        .slice(0, 3);

      setResults(sortedResults);
      console.log(sortedResults);

      const detailsList = await Promise.all(
        sortedResults.map(async (item) => {
          const res = await fetch(
            `https://localhost:7238/api/Movie/details/${item.id}?type=${item.type}`
          );
          if (!res.ok)
            throw new Error(`Erreur lors de la récupération des détails pour id=${item.id}`);
          return await res.json();
        })
      );

      setSerieDetails(detailsList);
      console.log(detailsList);

      setView('searchResults');
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleGoHome = () => {
    setView('mySeries');
    setResults([]);
    setSerieDetails(null);
    setError(null);
    setQuery('');
  };

  return (
    <>
      <Header
        query={query}
        setQuery={setQuery}
        onSearch={handleSearch}
        loadingSearch={loadingSearch}
        onGoHome={handleGoHome}
      />

      <div className="w-full px-8 flex flex-col md:flex-row gap-8">
        {view === 'searchResults' && (
          <main className="flex-grow">
            {error && <p className="text-red-500 mb-4">{error}</p>}

            <SeriesResults
              results={results}
              serieDetails={serieDetails}
              mySeries={mySeries}
              setMySeries={setMySeries}
            />
          </main>
        )}

        {view === 'mySeries' && <MySeries mySeries={mySeries} setMySeries={setMySeries} />}
      </div>
    </>
  );
}
