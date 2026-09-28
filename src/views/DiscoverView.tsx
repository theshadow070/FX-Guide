import React, { useState } from 'react';
import { HIDDEN_GEMS_DATABASE, CASIO_ERRORS_DATABASE } from '../data/errorsAndTips';
import { KeyBadge } from '../components/KeyBadge';
import { LcdScreen } from '../components/LcdScreen';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';
import { Zap, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

export const DiscoverView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gems' | 'errors'>('gems');
  const [expandedError, setExpandedError] = useState<string>(CASIO_ERRORS_DATABASE[0].nom);

  return (
    <div className="space-y-4 pb-20 select-none animate-in fade-in duration-150">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#173126] dark:text-white">
          Astuces secrètes & Guide des erreurs
        </h1>
        <p className="text-xs text-[#63736B] dark:text-[#8EA397] mt-0.5">
          Découvre les fonctions cachées et résous immédiatement les messages d’erreur Casio.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-[#EEF2ED] dark:bg-[#142920] rounded-2xl border border-[#E2E8E3] dark:border-[#1F3C2F]">
        <button
          onClick={() => {
            triggerHaptic('selection');
            soundManager.playTap();
            setActiveTab('gems');
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'gems'
              ? 'bg-white dark:bg-[#1E3A2D] text-[#123C2A] dark:text-white shadow-xs font-bold'
              : 'text-[#63736B] dark:text-[#8EA397]'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          Fonctions méconnues ({HIDDEN_GEMS_DATABASE.length})
        </button>
        <button
          onClick={() => {
            triggerHaptic('selection');
            soundManager.playTap();
            setActiveTab('errors');
          }}
          className={`flex-1 py-2 text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'errors'
              ? 'bg-white dark:bg-[#1E3A2D] text-[#123C2A] dark:text-white shadow-xs font-bold'
              : 'text-[#63736B] dark:text-[#8EA397]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Guide des erreurs Casio
        </button>
      </div>

      {/* Hidden Gems Content */}
      {activeTab === 'gems' && (
        <div className="space-y-3">
          <div className="text-xs font-mono text-[#63736B] dark:text-[#8EA397] px-1">
            « Tu ne savais probablement pas que ta fx-991ES pouvait faire ça »
          </div>

          {HIDDEN_GEMS_DATABASE.map(gem => (
            <article
              key={gem.id}
              className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 space-y-3 shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-bold text-[#173126] dark:text-white leading-snug">
                    {gem.titre}
                  </h3>
                  <p className="text-xs font-semibold text-[#123C2A] dark:text-[#58D68D] mt-0.5">
                    {gem.accroche}
                  </p>
                </div>
              </div>

              <p className="text-xs text-[#52645B] dark:text-[#A1B8AA] leading-relaxed">
                {gem.explication}
              </p>

              <div className="p-3 bg-[#F7F8F4] dark:bg-[#101F17] rounded-xl border border-[#E2E8E3] dark:border-[#1F3C2F] space-y-1.5">
                <div className="text-[11px] font-mono text-[#63736B] dark:text-[#8EA397]">
                  Touches :
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {gem.touches.map((k, i) => (
                    <KeyBadge key={i} label={k} size="sm" showConnector={i < gem.touches.length - 1} />
                  ))}
                </div>
              </div>

              <p className="text-xs text-[#123C2A] dark:text-[#58D68D] bg-[#EEF2ED] dark:bg-[#18362B] p-2.5 rounded-xl font-medium">
                💡 {gem.gainDeTemps}
              </p>
            </article>
          ))}
        </div>
      )}

      {/* Errors Guide Content */}
      {activeTab === 'errors' && (
        <div className="space-y-3">
          {CASIO_ERRORS_DATABASE.map(err => {
            const isExp = expandedError === err.nom;
            return (
              <article
                key={err.nom}
                className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl overflow-hidden shadow-xs"
              >
                <div
                  onClick={() => {
                    triggerHaptic('light');
                    soundManager.playTap();
                    setExpandedError(prev => (prev === err.nom ? '' : err.nom));
                  }}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#F7F8F4] dark:hover:bg-[#18362B] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs text-[#DC2626] dark:text-[#F87171] bg-[#FEE2E2] dark:bg-[#7F1D1D]/30 px-2 py-0.5 rounded">
                      {err.nom.split(' ')[0]} {err.nom.split(' ')[1]}
                    </span>
                    <span className="text-xs text-[#63736B] dark:text-[#8EA397]">
                      {err.nom}
                    </span>
                  </div>
                  {isExp ? <ChevronUp className="w-4 h-4 text-[#8C9892]" /> : <ChevronDown className="w-4 h-4 text-[#8C9892]" />}
                </div>

                {isExp && (
                  <div className="p-4 pt-0 border-t border-[#EEF2ED] dark:border-[#1F3C2F] space-y-3">
                    <div className="pt-3">
                      <LcdScreen expression={err.exempleTypique} result={err.nom.split(' ')[0]} modeIndicator="COMP" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#173126] dark:text-white mb-1">Causes fréquentes :</div>
                      <ul className="text-xs text-[#52645B] dark:text-[#A1B8AA] space-y-1 pl-4 list-disc">
                        {err.causes.map((c, i) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-[#EEF2ED] dark:bg-[#11241C] rounded-xl text-xs text-[#123C2A] dark:text-[#58D68D] font-medium space-y-1">
                      <div className="font-bold">Solutions recommandées :</div>
                      {err.solutions.map((s, i) => (
                        <div key={i}>✓ {s}</div>
                      ))}
                    </div>
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};
