import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { FunctionCategory } from '../types';
import { FunctionCard } from '../components/FunctionCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export const ExplorerView: React.FC = () => {
  const { openFunctionDetail, selectedCategory, setSelectedCategory } = useApp();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'Essentiel' | 'Intermédiaire' | 'Avancé'>('all');

  const categories: { id: FunctionCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Toutes' },
    { id: 'equations', label: 'Équations (EQN)' },
    { id: 'fonctions_analyse', label: 'Analyse & Dérivées' },
    { id: 'trigonometrie', label: 'Trigonométrie' },
    { id: 'statistiques', label: 'Statistiques' },
    { id: 'geometrie_vecteurs', label: 'Vecteurs' },
    { id: 'nombres_complexes', label: 'Complexes' },
    { id: 'matrices', label: 'Matrices' },
    { id: 'fractions_puissances', label: 'Fractions' },
    { id: 'constantes_conversions', label: 'Constantes & Conv.' },
    { id: 'memoires_variables', label: 'Mémoires' }
  ];

  const filteredItems = useMemo(() => {
    return FX991ES_DATABASE.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.categorie !== selectedCategory) {
        return false;
      }
      // Level filter
      if (levelFilter !== 'all' && item.niveau !== levelFilter) {
        return false;
      }
      // Search query
      if (search.trim()) {
        const q = search.toLowerCase();
        const matches =
          item.nom.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.motsClesRecherche.some(k => k.toLowerCase().includes(q)) ||
          item.modeCasio.toLowerCase().includes(q);
        if (!matches) return false;
      }
      return true;
    });
  }, [selectedCategory, levelFilter, search]);

  return (
    <div className="space-y-4 pb-20">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#173126] dark:text-[#F0F4EF]">
          Explorateur des fonctions
        </h1>
        <p className="text-xs text-[#63736B] dark:text-[#B7C5BE] mt-0.5">
          Toutes les fonctionnalités vérifiées de la Casio fx-991ES originale.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8C9892] dark:text-[#879890]" />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Filtrer par nom, touche ou mode..."
          className="w-full h-11 pl-10 pr-4 text-xs sm:text-sm bg-white dark:bg-[#1D3028] text-[#173126] dark:text-[#F0F4EF] placeholder-[#8C9892] dark:placeholder-[#879890] rounded-xl border border-[#E2E8E3] dark:border-[#2C4439] focus:outline-none focus:border-[#123C2A] dark:focus:border-[#6FAF82]"
        />
      </div>

      {/* Category Pills Scroller (Interactive filter tabs) */}
      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 py-1 flex items-center gap-1.5">
        {categories.map(cat => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap px-3 py-1.5 text-xs font-medium rounded-lg transition-colors shrink-0 ${
                isActive
                  ? 'bg-[#123C2A] text-white dark:bg-[#6FAF82] dark:text-[#0E1914] font-semibold'
                  : 'bg-white dark:bg-[#1D3028] text-[#63736B] dark:text-[#B7C5BE] border border-[#E2E8E3] dark:border-[#2C4439]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Level filter segmented control */}
      <div className="flex items-center justify-between text-xs text-[#63736B] dark:text-[#B7C5BE] pt-1">
        <span className="font-mono">{filteredItems.length} fonction(s)</span>

        <div className="flex items-center gap-1 bg-[#EEF2ED] dark:bg-[#1D3028] p-1 rounded-lg border border-[#E2E8E3] dark:border-[#2C4439]">
          {(['all', 'Essentiel', 'Intermédiaire', 'Avancé'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-2 py-0.5 text-[11px] rounded transition-colors ${
                levelFilter === lvl
                  ? 'bg-white dark:bg-[#244036] text-[#123C2A] dark:text-[#F0F4EF] font-bold shadow-sm'
                  : 'text-[#63736B] dark:text-[#879890]'
              }`}
            >
              {lvl === 'all' ? 'Tous' : lvl}
            </button>
          ))}
        </div>
      </div>

      {/* List of Functions */}
      {filteredItems.length > 0 ? (
        <div className="space-y-3">
          {filteredItems.map(item => (
            <FunctionCard
              key={item.id}
              item={item}
              onClick={() => openFunctionDetail(item)}
            />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white dark:bg-[#1D3028] rounded-2xl border border-[#E2E8E3] dark:border-[#2C4439] space-y-2">
          <p className="text-sm font-semibold text-[#173126] dark:text-[#F0F4EF]">
            Aucune fonction ne correspond à ces critères
          </p>
          <p className="text-xs text-[#63736B] dark:text-[#B7C5BE]">
            Essaie de réinitialiser la catégorie ou le niveau.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setLevelFilter('all');
              setSearch('');
            }}
            className="mt-2 text-xs font-bold text-[#123C2A] dark:text-[#6FAF82] underline"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
};
