import { useState } from 'react';
import { SerieCard } from './serie-cards';
import { SerieBase } from './shared/types';

interface MySeriesProps {
  mySeries: SerieBase[];
  setMySeries: React.Dispatch<React.SetStateAction<SerieBase[]>>;
}

export default function MySeries({ mySeries, setMySeries }: Readonly<MySeriesProps>) {
  const [selectedSerie, setSelectedSerie] = useState<SerieBase | null>(null);
  return (
    <>
      {mySeries.length > 0 && (
        <ul className="flex flex-wrap justify-center gap-6 p-4 w-full">
          {mySeries.map((serie) => (
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
