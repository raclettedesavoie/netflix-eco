import { useState } from 'react';
import { SearchResult, SerieBase, SerieDetails } from './shared/types';
import { SerieCard } from './serie-cards';

export interface SeriesResultsProps {
  results: SearchResult[];
  serieDetails: SerieDetails[] | null;
  mySeries: SerieBase[];
  setMySeries: React.Dispatch<React.SetStateAction<SerieBase[]>>;
}

export default function SeriesResults({
  results,
  serieDetails,
  mySeries,
  setMySeries,
}: Readonly<SeriesResultsProps>) {
  const [selectedSerie, setSelectedSerie] = useState<SerieBase | null>(null);
  const seriesWithDetails: SerieBase[] = results.map((r) => {
    const details = serieDetails?.find((d) => d.id === r.id);
    return {
      id: r.id,
      name: r.name,
      first_air_date: r.first_air_date,
      poster_path: r.poster_path,
      next_episode_to_air: details?.next_episode_to_air ?? null,
      overview: r.overview,
      original_language: r.original_language,
      type: r.type,
    };
  });
  console.log('serie-results', seriesWithDetails);
  return (
    <>
      {seriesWithDetails.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-6 p-4 w-full">
          {seriesWithDetails.map((serie) => (
            <SerieCard
              key={serie.id}
              serie={serie}
              mySeries={mySeries}
              setMySeries={setMySeries}
              selectedSerie={selectedSerie}
              onSelect={setSelectedSerie}
            />
          ))}
        </ul>
      )}
    </>
  );
}
