import React, { useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { FunctionCategory } from '../types';
import { Heart, ArrowUpRight } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';

export const FavoritesHistoryView: React.FC = () => {
  const {
    favorites,
    toggleFavorite,
    openFunctionDetail,
    setActiveTab
  } = useApp();

  const favoriteItems = useMemo(() => {
    return FX991ES_DATABASE.filter(item => favorites.includes(item.id));
  }, [favorites]);

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

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-150">
      {/* A. En-tête (Header conforme à la capture d'écran) */}
      <div className="pt-1">
        <div className="text-[11px] font-mono tracking-wider uppercase text-[#7A8C82] dark:text-[#8EA397]">
          TES REPÈRES
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#123C2A] dark:text-white mt-0.5">
          Favoris
        </h1>
        <p className="text-xs sm:text-sm text-[#5A7365] dark:text-[#8EA397] mt-3 leading-relaxed">
          Les procédures que tu veux retrouver rapidement, même hors ligne.
        </p>
      </div>

      {/* ========================================================================= */}
      {/* ÉTAT 1 : VIDE (AUCUN FAVORIS - STRICTEMENT CONFORME À LA CAPTURE D'ÉCRAN)  */}
      {/* ========================================================================= */}
      {favoriteItems.length === 0 ? (
        <div className="mt-4 sm:mt-6 bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-8 sm:p-10 flex flex-col items-center justify-center text-center shadow-xs space-y-3">
          {/* Icône cœur au centre dans un conteneur arrondi */}
          <div className="w-12 h-12 rounded-2xl bg-[#EEF4F0] dark:bg-[#193A2E] text-[#123C2A] dark:text-[#58D68D] flex items-center justify-center shadow-xs">
            <Heart className="w-5 h-5 stroke-[2]" />
          </div>

          {/* Titre central en gras */}
          <h2 className="text-base sm:text-lg font-bold text-[#123C2A] dark:text-white">
            Tes favoris apparaîtront ici
          </h2>

          {/* Description sous le titre */}
          <p className="text-xs sm:text-sm text-[#5A7365] dark:text-[#8EA397] max-w-xs leading-relaxed">
            Ouvre une fiche et appuie sur le cœur pour l'enregistrer.
          </p>

          {/* Bouton raccourci discret vers l'explorateur */}
          <button
            onClick={() => setActiveTab('explorer')}
            className="mt-2 px-4 py-2 rounded-xl bg-[#EEF4F0] dark:bg-[#193A2E] text-[#123C2A] dark:text-[#58D68D] text-xs font-bold hover:opacity-90 active:scale-95 transition-all shadow-xs"
          >
            Explorer les procédures
          </button>
        </div>
      ) : (
        /* ========================================================================= */
        /* ÉTAT 2 : AVEC FAVORIS (STACK VERTICAL DES FICHES SAUVEGARDÉES)           */
        /* ========================================================================= */
        <div className="space-y-3 pt-1 animate-in fade-in duration-150">
          <div className="flex items-center justify-between px-0.5">
            <span className="text-xs text-[#7A8C82] dark:text-[#8EA397] font-medium font-mono">
              {favoriteItems.length} fiche{favoriteItems.length > 1 ? 's' : ''} enregistrée{favoriteItems.length > 1 ? 's' : ''}
            </span>
          </div>

          <div className="space-y-3">
            {favoriteItems.map(item => (
              <div
                key={item.id}
                onClick={() => {
                  triggerHaptic('light');
                  soundManager.playTap();
                  openFunctionDetail(item);
                }}
                className="bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 space-y-2.5 shadow-xs hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] transition-colors cursor-pointer text-left active:scale-[0.99] group relative"
              >
                {/* En-tête interne : Tag de catégorie en vert pastel + Bouton cœur rempli */}
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#123C2A] dark:text-[#58D68D]">
                    {getCategoryShortName(item.categorie)}
                  </span>

                  <div className="flex items-center gap-1.5">
                    {/* Bouton pour retirer/gérer le favori */}
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleFavorite(item.id);
                      }}
                      aria-label="Retirer des favoris"
                      className="w-8 h-8 rounded-xl bg-[#EEF4F0] dark:bg-[#193A2E] text-[#DC2626] dark:text-[#58D68D] flex items-center justify-center shrink-0 hover:scale-110 active:scale-95 transition-transform"
                    >
                      <Heart className="w-4 h-4 fill-current stroke-current" />
                    </button>

                    {/* Flèche d'ouverture */}
                    <div className="w-8 h-8 rounded-xl bg-[#EEF4F0] dark:bg-[#193A2E] text-[#123C2A] dark:text-[#58D68D] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Titre de la fiche */}
                <h3 className="text-base font-bold text-[#123C2A] dark:text-white leading-snug">
                  {item.nom}
                </h3>

                {/* Description courte */}
                <p className="text-xs text-[#5A7365] dark:text-[#8EA397] leading-relaxed">
                  {item.description}
                </p>

                {/* Pied de fiche : Badges d'état discrets */}
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
      )}
    </div>
  );
};
