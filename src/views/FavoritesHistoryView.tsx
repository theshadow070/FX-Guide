import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { FunctionCard } from '../components/FunctionCard';
import { Bookmark, History, CheckCircle2, Trash2, ArrowRight, Zap } from 'lucide-react';

export const FavoritesHistoryView: React.FC = () => {
  const {
    favorites,
    history,
    clearHistory,
    mastered,
    openFunctionDetail,
    setActiveTab
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'favorites' | 'history' | 'mastery'>('favorites');

  const favoriteItems = FX991ES_DATABASE.filter(item => favorites.includes(item.id));
  const historyItems = history
    .map(id => FX991ES_DATABASE.find(item => item.id === id))
    .filter((item): item is typeof FX991ES_DATABASE[0] => item !== undefined);
  const masteredItems = FX991ES_DATABASE.filter(item => mastered.includes(item.id));

  return (
    <div className="space-y-4 pb-20">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#173126] dark:text-[#F0F4EF]">
          Favoris & Suivi de révision
        </h1>
        <p className="text-xs text-[#63736B] dark:text-[#B7C5BE] mt-0.5">
          Retrouve tes procédures enregistrées et suis ta maîtrise de la fx-991ES.
        </p>
      </div>

      {/* Sub Tabs Segmented Control */}
      <div className="flex p-1 bg-[#EEF2ED] dark:bg-[#1D3028] rounded-xl border border-[#E2E8E3] dark:border-[#2C4439]">
        <button
          onClick={() => setActiveSubTab('favorites')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeSubTab === 'favorites'
              ? 'bg-white dark:bg-[#244036] text-[#123C2A] dark:text-[#F0F4EF] shadow-sm'
              : 'text-[#63736B] dark:text-[#B7C5BE]'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          Favoris ({favorites.length})
        </button>
        <button
          onClick={() => setActiveSubTab('history')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeSubTab === 'history'
              ? 'bg-white dark:bg-[#244036] text-[#123C2A] dark:text-[#F0F4EF] shadow-sm'
              : 'text-[#63736B] dark:text-[#B7C5BE]'
          }`}
        >
          <History className="w-3.5 h-3.5" />
          Historique
        </button>
        <button
          onClick={() => setActiveSubTab('mastery')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeSubTab === 'mastery'
              ? 'bg-white dark:bg-[#244036] text-[#123C2A] dark:text-[#F0F4EF] shadow-sm'
              : 'text-[#63736B] dark:text-[#B7C5BE]'
          }`}
        >
          <CheckCircle2 className="w-3.5 h-3.5" />
          Maîtrise ({mastered.length})
        </button>
      </div>

      {/* Favorites Content */}
      {activeSubTab === 'favorites' && (
        <div className="space-y-3">
          {favoriteItems.length > 0 ? (
            favoriteItems.map(item => (
              <FunctionCard
                key={item.id}
                item={item}
                onClick={() => openFunctionDetail(item)}
              />
            ))
          ) : (
            <div className="p-8 text-center bg-white dark:bg-[#1D3028] rounded-2xl border border-[#E2E8E3] dark:border-[#2C4439] space-y-2">
              <Bookmark className="w-8 h-8 mx-auto text-[#8C9892] dark:text-[#879890] opacity-40" />
              <p className="text-sm font-semibold text-[#173126] dark:text-[#F0F4EF]">
                Aucun favori enregistré
              </p>
              <p className="text-xs text-[#63736B] dark:text-[#B7C5BE]">
                Appuie sur l’icône marque-page sur une fiche de fonction pour l’ajouter à tes favoris d’examen.
              </p>
            </div>
          )}
        </div>
      )}

      {/* History Content */}
      {activeSubTab === 'history' && (
        <div className="space-y-3">
          {historyItems.length > 0 && (
            <div className="flex justify-end">
              <button
                onClick={clearHistory}
                className="text-xs font-mono text-[#DC2626] dark:text-[#F87171] flex items-center gap-1 hover:underline"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Effacer l’historique
              </button>
            </div>
          )}

          {historyItems.length > 0 ? (
            historyItems.map(item => (
              <FunctionCard
                key={item.id}
                item={item}
                onClick={() => openFunctionDetail(item)}
              />
            ))
          ) : (
            <div className="p-8 text-center bg-white dark:bg-[#1D3028] rounded-2xl border border-[#E2E8E3] dark:border-[#2C4439] space-y-2">
              <History className="w-8 h-8 mx-auto text-[#8C9892] dark:text-[#879890] opacity-40" />
              <p className="text-sm font-semibold text-[#173126] dark:text-[#F0F4EF]">
                Historique vide
              </p>
              <p className="text-xs text-[#63736B] dark:text-[#B7C5BE]">
                Les fiches que tu consultes apparaîtront ici pour que tu puisses les retrouver rapidement.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mastery Content */}
      {activeSubTab === 'mastery' && (
        <div className="space-y-4">
          {/* Progress Card */}
          <div className="p-4 bg-white dark:bg-[#1D3028] border border-[#E2E8E3] dark:border-[#2C4439] rounded-2xl space-y-2 shadow-sm">
            <div className="flex items-center justify-between text-xs font-mono text-[#63736B] dark:text-[#879890]">
              <span>Progression globale</span>
              <span className="font-bold text-[#123C2A] dark:text-[#6FAF82]">
                {Math.round((mastered.length / FX991ES_DATABASE.length) * 100)} %
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-2.5 bg-[#EEF2ED] dark:bg-[#14231D] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#123C2A] dark:bg-[#6FAF82] rounded-full transition-all duration-300"
                style={{
                  width: `${(mastered.length / FX991ES_DATABASE.length) * 100}%`
                }}
              />
            </div>
            <div className="text-xs text-[#173126] dark:text-[#F0F4EF] font-semibold">
              {mastered.length} sur {FX991ES_DATABASE.length} fonctions maîtrisées pour la Première S2.
            </div>
          </div>

          {/* Mastered Functions List */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#123C2A] dark:text-[#6FAF82] px-1">
              Fonctions validées
            </div>
            {masteredItems.length > 0 ? (
              masteredItems.map(item => (
                <FunctionCard
                  key={item.id}
                  item={item}
                  onClick={() => openFunctionDetail(item)}
                />
              ))
            ) : (
              <div className="p-6 text-center bg-white dark:bg-[#1D3028] rounded-2xl border border-[#E2E8E3] dark:border-[#2C4439] space-y-1">
                <p className="text-xs font-semibold text-[#173126] dark:text-[#F0F4EF]">
                  Pas encore de fonction marquée comme maîtrisée
                </p>
                <p className="text-xs text-[#63736B] dark:text-[#B7C5BE]">
                  Ouvre une fonction et clique sur « Marquer comme maîtrisée » pour suivre tes révisions.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Discovery banner at bottom */}
      <div className="pt-2">
        <button
          onClick={() => setActiveTab('discover')}
          className="w-full p-3 bg-[#EEF2ED] dark:bg-[#1D3028] border border-[#E2E8E3] dark:border-[#2C4439] rounded-xl flex items-center justify-between text-xs font-bold text-[#123C2A] dark:text-[#6FAF82] hover:bg-[#E2E8E3] dark:hover:bg-[#244036] transition-colors"
        >
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-[#D4A017]" />
            Consulter les fonctions méconnues & erreurs fréquentes
          </span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
