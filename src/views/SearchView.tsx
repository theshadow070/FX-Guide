import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { FunctionCategory } from '../types';
import { Search, X, Zap, ArrowUpRight, Clock, AlertOctagon } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';

export const SearchView: React.FC = () => {
  const { searchQuery, setSearchQuery, openFunctionDetail, openErrorDecoder } = useApp();
  const [localQuery, setLocalQuery] = useState(searchQuery || '');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<FunctionCategory | 'all'>('all');

  // Recherches récentes persistées localement (jusqu'à 5 requêtes)
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('fxguide_recent_searches');
      return stored ? JSON.parse(stored).slice(0, 5) : [];
    } catch {
      return [];
    }
  });

  const addRecentSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < 2) return;

    setRecentSearches(prev => {
      const filtered = prev.filter(q => q.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, 5);
      try {
        localStorage.setItem('fxguide_recent_searches', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to save recent searches', err);
      }
      return updated;
    });
  };

  const removeRecentSearch = (queryToRemove: string) => {
    setRecentSearches(prev => {
      const updated = prev.filter(q => q !== queryToRemove);
      try {
        localStorage.setItem('fxguide_recent_searches', JSON.stringify(updated));
      } catch (err) {
        console.error('Failed to update recent searches', err);
      }
      return updated;
    });
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    try {
      localStorage.removeItem('fxguide_recent_searches');
    } catch (err) {
      console.error('Failed to clear recent searches', err);
    }
  };

  // Suggestions de recherche fidèles à la Capture 1
  const suggestions = [
    'équation degré 2',
    'tableau de valeurs',
    'sin(60°)',
    'fraction décimale',
    'dérivée'
  ];

  // Thèmes à parcourir fidèles à la Capture 1
  const themes: { id: FunctionCategory; label: string; query: string }[] = [
    { id: 'equations', label: 'Équations', query: 'équation' },
    { id: 'fonctions_analyse', label: 'Fonctions', query: 'fonction' },
    { id: 'trigonometrie', label: 'Trigonométrie', query: 'trigonométrie' },
    { id: 'statistiques', label: 'Statistiques', query: 'statistiques' },
    { id: 'geometrie_vecteurs', label: 'Vecteurs', query: 'vecteur' },
    { id: 'matrices', label: 'Matrices', query: 'matrice' },
    { id: 'nombres_complexes', label: 'Complexes', query: 'complexe' },
    { id: 'fractions_puissances', label: 'Fractions', query: 'fraction' },
    { id: 'memoires_variables', label: 'Mémoires', query: 'mémoire' }
  ];

  // Catégories pour filtrer les résultats actifs (Capture 2)
  const resultCategoryFilters: { id: FunctionCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Toutes' },
    { id: 'equations', label: 'Équations' },
    { id: 'fonctions_analyse', label: 'Fonctions' },
    { id: 'trigonometrie', label: 'Trigonométrie' },
    { id: 'statistiques', label: 'Statistiques' },
    { id: 'geometrie_vecteurs', label: 'Vecteurs' },
    { id: 'matrices', label: 'Matrices' },
    { id: 'nombres_complexes', label: 'Complexes' },
    { id: 'fractions_puissances', label: 'Fractions' }
  ];

  // Normalisation du texte (minuscules, sans accents, tolérant au singulier/pluriel)
  const normalize = (str: string): string => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/['’]/g, ' ')
      .trim();
  };

  const cleanWord = (w: string): string => {
    const norm = normalize(w);
    // Gestion simplifiée singulier/pluriel (ex: equations -> equation, racines -> racine)
    if (norm.length > 4 && norm.endsWith('s')) {
      return norm.slice(0, -1);
    }
    return norm;
  };

  // Résultats de recherche avec tolérance phonétique/syntaxique
  const searchResults = useMemo(() => {
    const raw = localQuery.trim();
    if (!raw) return [];

    const searchWords = raw.split(/\s+/).map(cleanWord).filter(Boolean);

    return FX991ES_DATABASE.filter(item => {
      // Filtrage par catégorie si actif
      if (activeCategoryFilter !== 'all' && item.categorie !== activeCategoryFilter) {
        return false;
      }

      const searchableFields = [
        item.nom,
        item.description,
        item.modeCasio,
        item.sousCategorie,
        item.contexteScolaire,
        item.touchesRapides.join(' '),
        item.exemple.enonce,
        item.exemple.entree,
        ...item.motsClesRecherche
      ];

      const fullCorpus = normalize(searchableFields.join(' '));

      // Tous les mots de la requête doivent concorder (ou concorder de manière floue)
      return searchWords.every(word => {
        return fullCorpus.includes(word);
      });
    });
  }, [localQuery, activeCategoryFilter]);

  const handleSelectQuery = (q: string) => {
    setLocalQuery(q);
    setSearchQuery(q);
    setActiveCategoryFilter('all');
    addRecentSearch(q);
  };

  const handleSelectTheme = (theme: { id: FunctionCategory; query: string }) => {
    setLocalQuery(theme.query);
    setSearchQuery(theme.query);
    setActiveCategoryFilter(theme.id);
    addRecentSearch(theme.query);
  };

  const handleClear = () => {
    setLocalQuery('');
    setSearchQuery('');
    setActiveCategoryFilter('all');
  };

  const getCategoryShortName = (cat: FunctionCategory) => {
    switch (cat) {
      case 'equations':
        return 'ÉQUATIONS';
      case 'fonctions_analyse':
        return 'FONCTIONS';
      case 'trigonometrie':
        return 'TRIGONOMÉTRIE';
      case 'statistiques':
        return 'STATISTIQUES';
      case 'geometrie_vecteurs':
        return 'VECTEURS';
      case 'matrices':
        return 'MATRICES';
      case 'nombres_complexes':
        return 'COMPLEXES';
      case 'fractions_puissances':
        return 'FRACTIONS';
      case 'memoires_variables':
        return 'MÉMOIRES';
      case 'constantes_conversions':
        return 'CONSTANTES';
      default:
        return 'GÉNÉRAL';
    }
  };

  const isSearching = localQuery.trim().length > 0;

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-150">
      {/* A. En-tête (Header Capture 1 & 2) */}
      <div className="pt-1">
        <div className="text-[11px] font-mono tracking-wider uppercase text-[#7A8C82] dark:text-[#8EA397]">
          ACCÈS DIRECT
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#123C2A] dark:text-white mt-0.5">
          Recherche
        </h1>
      </div>

      {/* B. Champ de Saisie (Input Bar Capture 1 & 2) */}
      <form
        onSubmit={e => {
          e.preventDefault();
          if (localQuery.trim().length > 1) {
            addRecentSearch(localQuery.trim());
          }
        }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#7A8C82] dark:text-[#8EA397]" />
        <input
          type="search"
          value={localQuery}
          onChange={e => {
            setLocalQuery(e.target.value);
            setSearchQuery(e.target.value);
          }}
          onKeyDown={e => {
            if (e.key === 'Enter' && localQuery.trim().length > 1) {
              addRecentSearch(localQuery.trim());
            }
          }}
          placeholder="Ex. résoudre une équation..."
          className="w-full h-12 pl-12 pr-10 text-sm sm:text-base bg-white dark:bg-[#132B22] text-[#123C2A] dark:text-white placeholder-[#7A8C82] dark:placeholder-[#8EA397] rounded-2xl border border-[#E2E8E3] dark:border-[#1F3C2F] focus:outline-none focus:border-[#123C2A] dark:focus:border-[#58D68D] shadow-xs"
        />
        {isSearching && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="Effacer la recherche"
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#7A8C82] hover:text-[#123C2A] dark:text-[#8EA397] dark:hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </form>

      {/* ========================================================================= */}
      {/* ÉTAT 1 : INITIAL / PAR DÉFAUT (AVANT SAISIE - CAPTURE 1)                   */}
      {/* ========================================================================= */}
      {!isSearching && (
        <div className="space-y-5 animate-in fade-in duration-150">
          {/* Section « Suggestions » (Puces de recherche) */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 px-0.5 text-xs sm:text-sm text-[#7A8C82] dark:text-[#8EA397] font-medium">
              <Zap className="w-4 h-4 text-[#123C2A] dark:text-[#58D68D] shrink-0" />
              <span>Essaie une notion ou une question</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {suggestions.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectQuery(chip)}
                  className="bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] text-[#123C2A] dark:text-white rounded-xl px-3.5 py-2 text-xs sm:text-sm font-semibold hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] active:scale-95 transition-all shadow-xs"
                >
                  {chip}
                </button>
              ))}
            </div>
          </div>

          {/* Décodeur d'Erreurs Casio - Accès Rapide & Intelligent */}
          <div
            onClick={() => {
              triggerHaptic('medium');
              openErrorDecoder();
            }}
            className="p-3.5 bg-gradient-to-r from-[#FEF2F2] to-white dark:from-[#2B1B1B]/40 dark:to-[#132B22] border border-[#FCA5A5]/70 dark:border-[#7F1D1D]/70 rounded-2xl flex items-center justify-between cursor-pointer hover:border-[#EF4444] active:scale-[0.99] transition-all shadow-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FEE2E2] dark:bg-[#7F1D1D]/50 text-[#DC2626] dark:text-[#F87171] flex items-center justify-center shrink-0">
                <AlertOctagon className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-[#123C2A] dark:text-white leading-tight">
                  Blocage ou message d'erreur Casio ?
                </div>
                <div className="text-[11px] text-[#7A8C82] dark:text-[#8EA397] mt-0.5">
                  Résoudre Syntax ERROR, Math ERROR... sans tout perdre
                </div>
              </div>
            </div>
            <span className="text-xs font-bold text-[#DC2626] dark:text-[#F87171] font-mono px-2 py-1 rounded-lg bg-white dark:bg-[#1A2C22] border border-[#FCA5A5]/60 dark:border-[#7F1D1D]/60 shrink-0">
              SOS ↗
            </span>
          </div>

          {/* Section « Recherches récentes » (Persistée localement - 5 dernières requêtes sous les suggestions) */}
          {recentSearches.length > 0 && (
            <div className="space-y-2.5 animate-in fade-in duration-150">
              <div className="flex items-center justify-between px-0.5">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm text-[#7A8C82] dark:text-[#8EA397] font-medium">
                  <Clock className="w-4 h-4 text-[#123C2A] dark:text-[#58D68D] shrink-0" />
                  <span>Recherches récentes</span>
                </div>
                <button
                  onClick={clearRecentSearches}
                  className="text-[11px] font-mono text-[#7A8C82] hover:text-[#DC2626] dark:text-[#8EA397] dark:hover:text-[#F87171] transition-colors"
                >
                  Effacer
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {recentSearches.map((query, idx) => (
                  <div
                    key={idx}
                    className="inline-flex items-center bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-xl overflow-hidden shadow-xs hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] transition-all group"
                  >
                    <button
                      onClick={() => handleSelectQuery(query)}
                      className="px-3 py-2 text-xs sm:text-sm font-semibold text-[#123C2A] dark:text-white active:scale-95 transition-all text-left flex items-center gap-1.5"
                    >
                      <span>{query}</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeRecentSearch(query);
                      }}
                      aria-label={`Supprimer ${query}`}
                      className="pr-2 pl-0.5 py-2 text-[#7A8C82] hover:text-[#DC2626] dark:text-[#8EA397] dark:hover:text-[#F87171] transition-colors"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section « Parcourir par thème » (Sélecteur Horizontal) */}
          <div className="space-y-2.5 pt-1">
            <h2 className="text-base font-bold text-[#123C2A] dark:text-white px-0.5">
              Parcourir par thème
            </h2>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
              {themes.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleSelectTheme(t)}
                  className="bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] text-[#5A7365] dark:text-[#C2D6CC] hover:text-[#123C2A] dark:hover:text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold shrink-0 active:scale-95 transition-all shadow-xs"
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Carte d'Accueil de la recherche (Placeholder central Capture 1) */}
          <div className="bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-xs mt-2 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#EEF4F0] dark:bg-[#193A2E] text-[#123C2A] dark:text-[#58D68D] flex items-center justify-center shadow-xs">
              <Search className="w-5 h-5 stroke-[2.2]" />
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#123C2A] dark:text-white">
              La bonne fiche, tout de suite
            </h3>

            <p className="text-xs sm:text-sm text-[#5A7365] dark:text-[#8EA397] max-w-xs leading-relaxed">
              Recherche par exemple « moyenne », « sin(60°) » ou « fonction secondaire ».
            </p>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ÉTAT 2 : RECHERCHE ACTIVE (AVEC RÉSULTATS - CAPTURE 2)                     */}
      {/* ========================================================================= */}
      {isSearching && (
        <div className="space-y-4 animate-in fade-in duration-150">
          {/* A. Indicateur de Résultats & Filtres de catégories (Capture 2) */}
          <div className="space-y-2">
            <div className="text-xs text-[#7A8C82] dark:text-[#8EA397] font-medium font-mono px-0.5">
              {searchResults.length} résultat{searchResults.length > 1 ? 's' : ''}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
              {resultCategoryFilters.map(filter => {
                const isSelected = activeCategoryFilter === filter.id;
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveCategoryFilter(filter.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 active:scale-95 ${
                      isSelected
                        ? 'bg-[#123C2A] text-white dark:bg-[#58D68D] dark:text-[#0B1713] shadow-xs'
                        : 'bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] text-[#5A7365] dark:text-[#C2D6CC] hover:text-[#123C2A] dark:hover:text-white'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* B. Liste des Fiches Résultats (Stack vertical Capture 2) */}
          {searchResults.length > 0 ? (
            <div className="space-y-3">
              {searchResults.map(item => (
                <div
                  key={item.id}
                  onClick={() => {
                    triggerHaptic('light');
                    soundManager.playTap();
                    if (localQuery.trim().length > 1) {
                      addRecentSearch(localQuery.trim());
                    }
                    openFunctionDetail(item);
                  }}
                  className="bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 space-y-2.5 shadow-xs hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] transition-colors cursor-pointer text-left active:scale-[0.99] group"
                >
                  {/* Tag de catégorie en vert pastel + Bouton action rapide rond ↗ */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#123C2A] dark:text-[#58D68D]">
                      {getCategoryShortName(item.categorie)}
                    </span>

                    <div className="w-8 h-8 rounded-xl bg-[#EEF4F0] dark:bg-[#193A2E] text-[#123C2A] dark:text-[#58D68D] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Titre de la fiche */}
                  <h4 className="text-base font-bold text-[#123C2A] dark:text-white leading-snug">
                    {item.nom}
                  </h4>

                  {/* Description courte */}
                  <p className="text-xs text-[#5A7365] dark:text-[#8EA397] leading-relaxed">
                    {item.description}
                  </p>

                  {/* Pied de fiche : Badges d’état discrets */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#EEF4F0] dark:bg-[#18362B] text-xs font-medium text-[#123C2A] dark:text-[#58D68D]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#123C2A] dark:bg-[#58D68D]" />
                      <span>Procédure vérifiée</span>
                    </div>

                    <span className="text-xs text-[#7A8C82] dark:text-[#8EA397] font-medium">
                      {item.niveau}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* État vide : Aucun résultat */
            <div className="bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-6 text-center space-y-3 mt-2 shadow-xs">
              <div className="w-12 h-12 rounded-2xl bg-[#EEF4F0] dark:bg-[#193A2E] text-[#123C2A] dark:text-[#58D68D] flex items-center justify-center mx-auto shadow-xs">
                <Search className="w-5 h-5 stroke-[2.2]" />
              </div>

              <h4 className="text-base font-bold text-[#123C2A] dark:text-white">
                Aucune procédure trouvée
              </h4>

              <p className="text-xs sm:text-sm text-[#5A7365] dark:text-[#8EA397] max-w-xs mx-auto leading-relaxed">
                Aucune procédure trouvée pour «&nbsp;{localQuery}&nbsp;». Vérifie l’orthographe ou essaye une autre notion.
              </p>

              <button
                onClick={handleClear}
                className="px-4 py-2 rounded-xl bg-[#EEF4F0] dark:bg-[#193A2E] text-[#123C2A] dark:text-[#58D68D] text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs"
              >
                Réinitialiser la recherche
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
