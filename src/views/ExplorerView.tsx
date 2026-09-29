import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { FunctionCategory } from '../types';
import { LayoutGrid, ArrowUpRight } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';

export const ExplorerView: React.FC = () => {
  const { openFunctionDetail, selectedCategory, setSelectedCategory, setActiveTab } = useApp();

  const categoryPills: { id: FunctionCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'Toutes' },
    { id: 'equations', label: 'Équations' },
    { id: 'fonctions_analyse', label: 'Fonctions' },
    { id: 'trigonometrie', label: 'Trigonométrie' },
    { id: 'statistiques', label: 'Statistiques' },
    { id: 'geometrie_vecteurs', label: 'Vecteurs' },
    { id: 'matrices', label: 'Matrices' },
    { id: 'nombres_complexes', label: 'Complexes' },
    { id: 'fractions_puissances', label: 'Fractions' },
    { id: 'memoires_variables', label: 'Mémoires' },
    { id: 'constantes_conversions', label: 'Constantes' }
  ];

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

  const filteredItems = useMemo(() => {
    return FX991ES_DATABASE.filter(item => {
      if (selectedCategory !== 'all' && item.categorie !== selectedCategory) {
        return false;
      }
      return true;
    });
  }, [selectedCategory]);

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-150">
      {/* A. En-tête (Header Capture 1) */}
      <div className="flex items-start justify-between gap-3 pt-1">
        <div>
          <div className="text-[11px] font-mono tracking-wider uppercase text-[#7A8C82] dark:text-[#8EA397]">
            LA FX-991ES, FONCTION PAR FONCTION
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#123C2A] dark:text-white mt-0.5">
            Explorer
          </h1>
        </div>

        {/* Bouton d'action carré arrondi avec icône grille à 4 carrés qui ouvre "Les touches" */}
        <button
          onClick={() => {
            triggerHaptic('light');
            soundManager.playSectionTap();
            setActiveTab('keypad');
          }}
          aria-label="Repérer les touches de la calculatrice"
          className="w-10 h-10 rounded-xl bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-center text-[#123C2A] dark:text-[#58D68D] hover:bg-[#EEF4F0] dark:hover:bg-[#193A2E] active:scale-95 transition-all shadow-xs shrink-0"
        >
          <LayoutGrid className="w-5 h-5" />
        </button>
      </div>

      {/* B. Carte d'Introduction (Banner Capture 1) */}
      <div className="bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 sm:p-5 shadow-xs space-y-1.5">
        <h2 className="text-base sm:text-lg font-bold text-[#123C2A] dark:text-white leading-snug">
          Une calculatrice. Plusieurs modes.
        </h2>
        <p className="text-xs sm:text-sm text-[#5A7365] dark:text-[#8EA397] leading-relaxed">
          Parcours les fonctions par thème. Chaque fiche indique clairement si la procédure est vérifiée.
        </p>
      </div>

      {/* C. Filtres « Familles » (Sélecteur Horizontal Capture 1) */}
      <div className="space-y-2.5 pt-1">
        <h3 className="text-base font-bold text-[#123C2A] dark:text-white px-0.5">
          Familles
        </h3>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 py-1">
          {categoryPills.map(cat => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  triggerHaptic('selection');
                  soundManager.playOptionToggle(true);
                  setSelectedCategory(cat.id);
                }}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 active:scale-95 ${
                  isSelected
                    ? 'bg-[#123C2A] text-white dark:bg-[#58D68D] dark:text-[#0B1713] shadow-xs'
                    : 'bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] text-[#5A7365] dark:text-[#C2D6CC] hover:text-[#123C2A] dark:hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* D. Section « Catalogue fx-991ES » (Capture 1) */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between px-0.5">
          <h3 className="text-base sm:text-lg font-bold text-[#123C2A] dark:text-white">
            Catalogue fx-991ES
          </h3>
          <span className="text-xs text-[#7A8C82] dark:text-[#8EA397] font-medium font-mono">
            {filteredItems.length} fiches
          </span>
        </div>

        {/* Cartes de fiches verticales (Stack) */}
        <div className="space-y-3">
          {filteredItems.map(item => (
            <div
              key={item.id}
              onClick={() => {
                triggerHaptic('light');
                soundManager.playCardOpen();
                openFunctionDetail(item);
              }}
              className="bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 space-y-2.5 shadow-xs hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] transition-colors cursor-pointer text-left active:scale-[0.99] group"
            >
              {/* En-tête interne : Tag de catégorie en vert + Bouton rond ↗ */}
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
      </div>
    </div>
  );
};
