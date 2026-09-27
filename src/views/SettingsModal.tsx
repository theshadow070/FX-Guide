import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, ExternalLink, Minus, Plus, X } from 'lucide-react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const {
    theme,
    setTheme,
    textSize,
    setTextSize
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
              onClick={onClose}
              aria-label="Fermer les paramètres"
              className="w-9 h-9 rounded-xl bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-center text-[#5A7365] dark:text-[#8EA397] hover:text-[#123C2A] dark:hover:text-white active:scale-95 transition-all shadow-xs"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 1. Carte Thème et Taille du texte (Capture 3) */}
          <div className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 space-y-4 shadow-xs">
            {/* Sous-bloc Thème */}
            <div className="space-y-2.5">
              <div className="text-sm font-bold text-[#123C2A] dark:text-white">
                Thème
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'system', label: 'Automatique' },
                  { id: 'light', label: 'Clair' },
                  { id: 'dark', label: 'Sombre' }
                ].map(t => {
                  const isSelected = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id as any)}
                      className={`h-10 rounded-xl text-xs font-semibold flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-[#123C2A] text-white dark:bg-[#64B98E] dark:text-[#0C1813] shadow-xs'
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
                  onClick={() => setTextSize('normal')}
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
                  onClick={() => setTextSize('large')}
                  aria-label="Augmenter la taille du texte"
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center active:scale-95 transition-all ${
                    textSize === 'large'
                      ? 'bg-[#123C2A] border-[#123C2A] text-white dark:bg-[#64B98E] dark:border-[#64B98E] dark:text-[#0C1813] shadow-xs'
                      : 'bg-white dark:bg-[#142920] border-[#E2E8E3] dark:border-[#1F3C2F] text-[#5A7365] dark:text-[#8EA397] hover:text-[#123C2A] dark:hover:text-white'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* 2. Section Outils (Guide constructeur Casio) */}
          <div className="space-y-2.5">
            <h2 className="text-base font-bold text-[#123C2A] dark:text-white px-0.5">
              Outils
            </h2>

            <div className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl overflow-hidden shadow-xs">
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

          {/* 3. Section À propos (Capture 3) */}
          <div className="space-y-2.5">
            <h2 className="text-base font-bold text-[#123C2A] dark:text-white px-0.5">
              À propos
            </h2>

            <div className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 space-y-3 shadow-xs">
              <p className="text-xs text-[#123C2A] dark:text-[#DCE6E0] leading-relaxed">
                FX Guide est un compagnon d’apprentissage indépendant. Il ne remplace ni le raisonnement mathématique ni la documentation Casio.
              </p>
              <div className="text-xs text-[#5A7365] dark:text-[#8EA397]">
                Modèle visé : fx-991ES originale · pas ES PLUS, EX ou CW
              </div>
            </div>
          </div>
        </div>

        {/* Footer centré (Capture 3) */}
        <div className="text-center pt-6 text-xs text-[#7A8C82] dark:text-[#6C8377]">
          FX Guide · Contenu consultable hors ligne
        </div>
      </div>
    </div>
  );
};
