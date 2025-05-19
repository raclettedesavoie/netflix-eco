/* eslint-disable @next/next/no-img-element */
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { InlineModal } from './shared/modal';
import { SerieBase } from './shared/types';

interface SerieCardProps {
  serie: SerieBase;
  mySeries: SerieBase[];
  setMySeries: React.Dispatch<React.SetStateAction<SerieBase[]>>;
  selectedSerie: SerieBase | null;
  onSelect: (serie: SerieBase | null) => void;
}

const IMG_BASE_URL = 'https://image.tmdb.org/t/p/w500';

export function SerieCard({
  serie,
  mySeries,
  setMySeries,
  selectedSerie,
  onSelect,
}: Readonly<SerieCardProps>) {
  const openModal = (serie: SerieBase) => onSelect(serie);
  const closeModal = () => onSelect(null);

  const isInMySeries = mySeries.some((s) => s.id === serie.id);

  const formatNextAir = () => {
    if (!serie.next_episode_to_air?.air_date) return 'Aucune date disponible';
    return new Date(serie.next_episode_to_air.air_date).toLocaleDateString();
  };

  const removeSerie = () => {
    setMySeries((prev) => prev.filter((s) => s.id !== serie.id));
  };

  const addSerie = () => {
    debugger;
    if (isInMySeries) return;
    setMySeries((prev) => [...prev, serie]);
  };

  return (
    <li key={serie.id} className="w-[254px] relative">
      <div className="cursor-pointer w-64 hover:shadow-lg rounded overflow-hidden border relative overflow-visible ">
        <button
          type="button"
          onClick={() => {
            openModal(serie);
            console.log(selectedSerie);
          }}
          className="w-full text-left cursor-pointer overflow-hidden "
        >
          {serie.poster_path ? (
            <img
              src={`${IMG_BASE_URL}${serie.poster_path}`}
              alt={`Affiche ${serie.name}`}
              className="w-[254px] h-[381px]"
            />
          ) : (
            <div className="w-full h-40 bg-gray-300 flex items-center justify-center text-gray-500 text-xs w-[254px] h-[381px]">
              Pas d’image
            </div>
          )}
          <div className="p-3">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold truncate ">{serie.name}</h3>
              <span className="text-gray-500 text-sm truncate">{serie.first_air_date}</span>
            </div>
            {serie.type == 'tv' ? (
              <p className="relative">
                Prochaine saison prévue le&nbsp;<strong>{formatNextAir()}</strong>
                {isInMySeries ? (
                  <FaHeart
                    className="text-red-500 cursor-pointer hover:scale-110 transition-transform absolute top-[5px] right-[5px]"
                    title="Retirer de mes séries"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeSerie();
                    }}
                  />
                ) : (
                  <FaRegHeart
                    className="text-gray-400 cursor-pointer hover:text-red-500 hover:scale-110 transition-transform absolute top-[5px] right-[5px]"
                    title="Ajouter à mes séries"
                    onClick={(e) => {
                      e.stopPropagation();
                      addSerie();
                    }}
                  />
                )}
              </p>
            ) : (
              <span>
                Prochain film prévue le&nbsp;<strong>{formatNextAir()}</strong>
              </span>
            )}
          </div>
        </button>
      </div>
      {selectedSerie && selectedSerie.id == serie.id && (
        <InlineModal isOpen={!!selectedSerie} onClose={closeModal} title={selectedSerie.name}>
          <p>Langue : {selectedSerie.original_language}</p>
          <p>{selectedSerie.overview}</p>
        </InlineModal>
      )}
    </li>
  );
}
