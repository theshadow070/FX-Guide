import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { ArrowLeft, TrendingUp, Clock, ChevronRight } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';

export const ProgressView: React.FC = () => {
  const { setActiveTab, mastered, history, openFunctionDetail } = useApp();
  const totalCount = FX991ES_DATABASE.length;
  const masteredCount = mastered.length;
  const progressPercent = Math.min(100, Math.round((masteredCount / totalCount) * 100));

  const historyItems = history
    .map(id => FX991ES_DATABASE.find(item => item.id === id))
    .filter((item): item is (typeof FX991ES_DATABASE)[0] => item !== undefined);

  // iOS-style edge swipe to go back to home
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;

    if (diffX > 75 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      triggerHaptic('light');
      soundManager.playTap();
      setActiveTab('home');
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="space-y-6 pb-20 select-none animate-in fade-in duration-150"
    >
      {/* Header avec retour */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={() => {
            triggerHaptic('light');
            soundManager.playModalClose();
            setActiveTab('home');
          }}
          aria-label="Retour à l'accueil"
          className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-center text-[#123C2A] dark:text-white hover:bg-[#EEF4F0] dark:hover:bg-[#1A3429] active:scale-95 transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-[#5A7365] dark:text-[#8EA397]">
            TON ESPACE
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#123C2A] dark:text-white">
            Progression
          </h1>
        </div>
      </div>

      {/* Carte principale Procédures vérifiées */}
      <div className="bg-[#123C2A] dark:bg-[#143527] border border-[#1D4E38] dark:border-[#214937] rounded-2xl p-4 space-y-3 shadow-sm text-white">
        <div className="flex items-center justify-between">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#C2D6CC] dark:text-[#8EA397] font-mono">
            PROCÉDURES VÉRIFIÉES
          </div>
          <div className="w-9 h-9 rounded-xl bg-[#B8E86A] dark:bg-[#64B98E] text-[#123C2A] dark:text-[#0C1813] flex items-center justify-center font-bold">
            <TrendingUp className="w-5 h-5 stroke-[2.5]" />
          </div>
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-extrabold text-white">
            {masteredCount}
          </span>
          <span className="text-xl font-bold text-[#C2D6CC] dark:text-[#8EA397]">
            / {totalCount}
          </span>
        </div>

        {/* Barre de progression */}
        <div className="w-full h-1.5 bg-[#1D4A37] dark:bg-[#1F4232] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#B8E86A] dark:bg-[#64B98E] rounded-full transition-all duration-300"
            style={{ width: `${Math.max(masteredCount > 0 ? 5 : 0, progressPercent)}%` }}
          />
        </div>

        <p className="text-xs text-[#C2D6CC] dark:text-[#8EA397]">
          Choisis une fiche et avance à ton rythme.
        </p>
      </div>

      {/* Section Récemment consultées */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-[#123C2A] dark:text-white px-0.5">
          Récemment consultées
        </h2>

        {historyItems.length === 0 ? (
          <div className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-6 text-center space-y-2 shadow-xs">
            <div className="w-10 h-10 rounded-full bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center mx-auto mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-bold text-[#123C2A] dark:text-white">
              Ton historique est vide
            </h3>
            <p className="text-xs text-[#5A7365] dark:text-[#8EA397]">
              Les fiches que tu consultes apparaîtront ici.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {historyItems.slice(0, 4).map(item => (
              <button
                key={item.id}
                onClick={() => {
                  triggerHaptic('light');
                  soundManager.playCardOpen();
                  openFunctionDetail(item);
                }}
                className="w-full p-3 bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-xl flex items-center justify-between text-left hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] active:scale-[0.99] transition-all shadow-xs"
              >
                <div>
                  <div className="text-xs font-semibold text-[#123C2A] dark:text-white">
                    {item.nom}
                  </div>
                  <div className="text-[11px] font-mono text-[#5A7365] dark:text-[#8EA397]">
                    {item.modeCasio}
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-[#7A8C82] dark:text-[#8EA397] shrink-0" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
