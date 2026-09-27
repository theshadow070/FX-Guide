import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { FunctionCard } from '../components/FunctionCard';
import { Search, X } from 'lucide-react';

export const SearchView: React.FC = () => {
  const { searchQuery, setSearchQuery, openFunctionDetail } = useApp();
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const results = useMemo(() => {
    const q = localQuery.trim().toLowerCase();
    if (!q) return FX991ES_DATABASE;
    const words = q.split(/\s+/).filter(Boolean);
    return FX991ES_DATABASE.filter(item => {
      const fullText = [
        item.nom,
        item.description,
        item.modeCasio,
        item.sousCategorie,
        item.contexteScolaire,
        ...item.motsClesRecherche
      ].join(' ').toLowerCase();

      return words.every(w => fullText.includes(w));
    });
  }, [localQuery]);

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
  };

  return (
    <div className="space-y-4 pb-24 pt-2">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#123C2A] dark:text-white">
          Recherche
        </h1>
        <p className="text-xs text-[#5A7365] dark:text-[#8EA397] mt-0.5">
          Tape un mot naturel ou une opération (ex: équation, dérivée, table, matrices...)
        </p>
      </div>

      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8C82] dark:text-[#8EA397]" />
        <input
          type="search"
          value={localQuery}
          onChange={e => {
            setLocalQuery(e.target.value);
            setSearchQuery(e.target.value);
          }}
          placeholder="Que veux-tu faire sur ta fx-991ES ?"
          className="w-full h-11 pl-10 pr-9 text-xs sm:text-sm bg-white dark:bg-[#10221A] text-[#123C2A] dark:text-white placeholder-[#7A8C82] dark:placeholder-[#8EA397] rounded-xl border border-[#E2E8E3] dark:border-[#1E3A2D] focus:outline-none focus:border-[#123C2A] dark:focus:border-[#57B88A] shadow-xs"
        />
        {localQuery && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8C82] hover:text-[#123C2A] dark:text-[#8EA397] dark:hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center justify-between text-xs font-mono text-[#5A7365] dark:text-[#8EA397] px-1">
        <span>{results.length} procédure(s) trouvée(s)</span>
      </div>

      <div className="space-y-2.5">
        {results.map(item => (
          <FunctionCard
            key={item.id}
            item={item}
            onClick={() => openFunctionDetail(item)}
          />
        ))}
      </div>
    </div>
  );
};
