import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, ExternalLink, Minus, Plus, X, Volume2, VolumeX, Smartphone } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReplayTour?: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onReplayTour }) => {
  const {
    theme,
    setTheme,
    textSize,
    setTextSize,
    soundEnabled,
    setSoundEnabled,
    hapticEnabled,
    setHapticState
  } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#F7F8F4] dark:bg-[#0C1813] text-[#123C2A] dark:text-[#F1F5F2] animate-in fade-in duration-150 transition-colors">
      <div className="max-w-md mx-auto min-h-screen px-4 pt-12 pb-10 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Header avec bouton fermer discret */}
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-mono uppercase tracking-wider text-[#5A7365] dark:text-[#8EA397]">
              Paramètres
            </span>
            <button
              onClick={() => {
                triggerHaptic('light');
                onClose();
              }}
              aria-label="Fermer les paramètres"
              className="w-9 h-9 rounded-xl bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-center text-[#5A7365] dark:text-[#8EA397] hover:text-[#123C2A] dark:hover:text-white active:scale-95 transition-all shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 1. Carte Thème et Taille du texte */}
          <div className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 space-y-4 shadow-xs">
            {/* Sous-bloc Thème */}
            <div className="space-y-2.5">
              <div className="text-sm font-bold text-[#123C2A] dark:text-white">
                Thème d'affichage
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'system', label: 'Auto' },
                  { id: 'light', label: 'Clair' },
                  { id: 'dark', label: 'Sombre' }
                ].map(t => {
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        triggerHaptic('selection');
                        soundManager.playTap();
                        setTheme(t.id as any);
                      }}
                      className={`h-10 rounded-xl text-xs font-semibold flex items-center justify-center transition-all active:scale-95 ${
                        isSelected
                          ? 'bg-[#123C2A] text-white dark:bg-[#58D68D] dark:text-[#0C1813] shadow-xs'
                          : 'bg-[#EEF4F0] dark:bg-[#183428] border border-[#DCE5DF] dark:border-[#234535] text-[#123C2A] dark:text-white hover:bg-[#E2EBE5] dark:hover:bg-[#1E4032]'
                      }`}
                    >
                      {t.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sous-bloc Taille du texte */}
            <div className="pt-2 border-t border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-between">
              <div>
                <div className="text-sm font-bold text-[#123C2A] dark:text-white">
                  Taille du texte
                </div>
                <div className="text-xs text-[#5A7365] dark:text-[#8EA397] mt-0.5">
                  Adaptée à ton confort de lecture.
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0 ml-3">
                <button
                  onClick={() => {
                    triggerHaptic('light');
                    soundManager.playTap();
                    setTextSize('normal');
                  }}
                  aria-label="Réduire la taille du texte"
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center active:scale-95 transition-all ${
                    textSize === 'normal'
                      ? 'bg-[#123C2A] border-[#123C2A] text-white dark:bg-[#183428] dark:border-[#2B5441] dark:text-white shadow-xs'
                      : 'bg-white dark:bg-[#142920] border-[#E2E8E3] dark:border-[#1F3C2F] text-[#5A7365] dark:text-[#8EA397] hover:text-[#123C2A] dark:hover:text-white'
                  }`}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    triggerHaptic('light');
                    soundManager.playTap();
                    setTextSize('large');
                  }}
                  aria-label="Augmenter la taille du texte"
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center active:scale-95 transition-all ${
                    textSize === 'large'
                      ? 'bg-[#123C2A] border-[#123C2A] text-white dark:bg-[#58D68D] dark:border-[#58D68D] dark:text-[#0C1813] shadow-xs'
                      : 'bg-white dark:bg-[#142920] border-[#E2E8E3] dark:border-[#1F3C2F] text-[#5A7365] dark:text-[#8EA397] hover:text-[#123C2A] dark:hover:text-white'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Micro-interactions : Sons & Haptiques */}
          <div className="space-y-2.5">
            <h2 className="text-base font-bold text-[#123C2A] dark:text-white px-0.5">
              Sensations & Retours
            </h2>

            <div className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl overflow-hidden shadow-xs divide-y divide-[#E2E8E3] dark:divide-[#1F3C2F]">
              {/* Sons toggle */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center shrink-0">
                    {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#123C2A] dark:text-white">
                      Micro-sons d'interaction
                    </div>
                    <div className="text-xs text-[#5A7365] dark:text-[#8EA397]">
                      Effets sonores légers et discrets
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const next = !soundEnabled;
                    setSoundEnabled(next);
                    if (next) soundManager.playTap();
                    triggerHaptic('selection');
                  }}
                  className={`w-12 h-7 rounded-full p-1 transition-colors ${
                    soundEnabled ? 'bg-[#123C2A] dark:bg-[#58D68D]' : 'bg-[#E2E8E3] dark:bg-[#254234]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      soundEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Haptique toggle */}
              <div className="p-3.5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#123C2A] dark:text-white">
                      Retour haptique
                    </div>
                    <div className="text-xs text-[#5A7365] dark:text-[#8EA397]">
                      Vibrations tactiles sur mobile
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    const next = !hapticEnabled;
                    setHapticState(next);
                    if (next) triggerHaptic('medium');
                  }}
                  className={`w-12 h-7 rounded-full p-1 transition-colors ${
                    hapticEnabled ? 'bg-[#123C2A] dark:bg-[#58D68D]' : 'bg-[#E2E8E3] dark:bg-[#254234]'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white transition-transform ${
                      hapticEnabled ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* 3. Section Outils */}
          <div className="space-y-2.5">
            <h2 className="text-base font-bold text-[#123C2A] dark:text-white px-0.5">
              Outils & Visite
            </h2>

            <div className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl overflow-hidden shadow-xs divide-y divide-[#E2E8E3] dark:divide-[#1F3C2F]">
              {onReplayTour && (
                <button
                  onClick={() => {
                    triggerHaptic('light');
                    soundManager.playTap();
                    onClose();
                    onReplayTour();
                  }}
                  className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#F7F8F4] dark:hover:bg-[#183428] active:bg-[#EEF4F0] dark:active:bg-[#1C3B2E] transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#123C2A] dark:text-white flex items-center gap-1.5">
                        <span>Revoir la visite guidée</span>
                      </div>
                      <div className="text-xs text-[#5A7365] dark:text-[#8EA397]">
                        Relancer le tutoriel interactif à travers l'application
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#123C2A] dark:text-[#58D68D] shrink-0 font-mono">
                    Revoir ↗
                  </span>
                </button>
              )}

              <a
                href="https://support.casio.com/pdf/004/fx-115ES_991ES_Eng.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#F7F8F4] dark:hover:bg-[#183428] active:bg-[#EEF4F0] dark:active:bg-[#1C3B2E] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#123C2A] dark:text-white flex items-center gap-1.5">
                      <span>Guide constructeur Casio</span>
                    </div>
                    <div className="text-xs text-[#5A7365] dark:text-[#8EA397]">
                      Manuel officiel fx-115ES / fx-991ES (PDF)
                    </div>
                  </div>
                </div>
                <ExternalLink className="w-4 h-4 text-[#7A8C82] group-hover:text-[#123C2A] dark:text-[#8EA397] dark:group-hover:text-white shrink-0 ml-2 transition-colors" />
              </a>
            </div>
          </div>

          {/* 4. Section À propos */}
          <div className="space-y-2.5">
            <h2 className="text-base font-bold text-[#123C2A] dark:text-white px-0.5">
              À propos
            </h2>

            <div className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 space-y-3 shadow-xs">
              <p className="text-xs text-[#123C2A] dark:text-[#DCE6E0] leading-relaxed">
                FX Guide est un compagnon d’apprentissage indépendant. Il ne remplace ni le raisonnement mathématique ni la documentation Casio.
              </p>
              <div className="text-xs text-[#5A7365] dark:text-[#8EA397]">
                Modèle visé : fx-991ES originale · conforme Première S2 et Terminale
              </div>
            </div>
          </div>
        </div>

        {/* Footer centré */}
        <div className="text-center pt-6 text-xs text-[#7A8C82] dark:text-[#6C8377]">
          FX Guide · Contenu consultable hors ligne
        </div>
      </div>
    </div>
  );
};
