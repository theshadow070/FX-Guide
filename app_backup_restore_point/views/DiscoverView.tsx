import React, { useState } from 'react';
import { HIDDEN_GEMS_DATABASE, CASIO_ERRORS_DATABASE } from '../data/errorsAndTips';
import { KeyBadge } from '../components/KeyBadge';
import { LcdScreen } from '../components/LcdScreen';
import { Zap, AlertTriangle, ChevronDown, ChevronUp, Sparkles, Check } from 'lucide-react';

export const DiscoverView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gems' | 'errors'>('gems');
  const [expandedError, setExpandedError] = useState<string>(CASIO_ERRORS_DATABASE[0].nom);

  return (
    <div className="space-y-4 pb-20">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#173126] dark:text-[#F0F4EF]">
          Astuces secrètes & Guide des erreurs
        </h1>
        <p className="text-xs text-[#63736B] dark:text-[#B7C5BE] mt-0.5">
          Découvre les fonctions cachées et résous immédiatement les messages d’erreur Casio.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-[#EEF2ED] dark:bg-[#1D3028] rounded-xl border border-[#E2E8E3] dark:border-[#2C4439]">
        <button
          onClick={() => setActiveTab('gems')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'gems'
              ? 'bg-white dark:bg-[#244036] text-[#123C2A] dark:text-[#F0F4EF] shadow-sm'
              : 'text-[#63736B] dark:text-[#B7C5BE]'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          Fonctions méconnues ({HIDDEN_GEMS_DATABASE.length})
        </button>
        <button
          onClick={() => setActiveTab('errors')}
          className={`flex-1 py-2 text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition-all ${
            activeTab === 'errors'
              ? 'bg-white dark:bg-[#244036] text-[#123C2A] dark:text-[#F0F4EF] shadow-sm'
              : 'text-[#63736B] dark:text-[#B7C5BE]'
          }`}
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Guide des erreurs Casio
        </button>
      </div>

      {/* Hidden Gems Content */}
      {activeTab === 'gems' && (
        <div className="space-y-3">
          <div className="text-xs font-mono text-[#63736B] dark:text-[#879890] px-1">
            « Tu ne savais probablement pas que ta fx-991ES pouvait faire ça »
          </div>

          {HIDDEN_GEMS_DATABASE.map(gem => (
            <article
              key={gem.id}
              className="bg-white dark:bg-[#1D3028] border border-[#E2E8E3] dark:border-[#2C4439] rounded-2xl p-4 space-y-3 shadow-sm"
            >
              <div>
                <span className="text-[10px] font-mono uppercase font-bold text-[#D4A017] dark:text-[#E5B329]">
                  Astuce Pro
                </span>
                <h3 className="text-sm font-bold text-[#173126] dark:text-[#F0F4EF] leading-snug">
                  {gem.titre}
                </h3>
                <p className="text-xs text-[#63736B] dark:text-[#B7C5BE] mt-1 leading-relaxed">
                  {gem.explication}
                </p>
              </div>

              {/* Key Combination */}
              <div className="p-2.5 bg-[#F7F8F4] dark:bg-[#14231D] rounded-xl border border-[#E2E8E3] dark:border-[#2C4439] flex items-center gap-1.5 flex-wrap">
                {gem.touches.map((k, i) => (
                  <KeyBadge key={i} label={k} size="sm" />
                ))}
              </div>

              {/* Practical Example */}
              <div className="text-xs bg-[#EEF2ED] dark:bg-[#244036]/50 p-3 rounded-xl border border-[#E2E8E3] dark:border-[#2C4439] space-y-1">
                <div className="font-bold text-[#123C2A] dark:text-[#6FAF82]">
                  Exemple concret :
                </div>
                <div className="text-[#173126] dark:text-[#F0F4EF] leading-relaxed">
                  {gem.exemplePratique}
                </div>
              </div>

              <div className="text-[11px] font-mono text-[#2E7D32] dark:text-[#B8E86A] font-semibold">
                ⚡ Gain : {gem.gainDeTemps}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Errors Content */}
      {activeTab === 'errors' && (
        <div className="space-y-3">
          {/* Goto Arrow Tip Banner */}
          <div className="p-3.5 bg-[#123C2A] text-white rounded-2xl space-y-1 shadow-sm">
            <div className="text-xs font-bold text-[#B8E86A] flex items-center gap-1.5">
              💡 Le réflexe magique de la touche Goto [◀] ou [▶]
            </div>
            <p className="text-xs text-[#E2E8E3] leading-relaxed">
              Quand un message Math ERROR ou Syntax ERROR apparaît, <strong className="text-white">n’appuie PAS sur AC !</strong> Appuie sur la flèche gauche <strong className="text-[#B8E86A]">[◀]</strong> : le curseur se placera pile à l’endroit exact de ta faute.
            </p>
          </div>

          {CASIO_ERRORS_DATABASE.map(err => {
            const isExpanded = expandedError === err.nom;
            return (
              <article
                key={err.nom}
                className="bg-white dark:bg-[#1D3028] border border-[#E2E8E3] dark:border-[#2C4439] rounded-2xl overflow-hidden shadow-sm"
              >
                <div
                  onClick={() => setExpandedError(isExpanded ? '' : err.nom)}
                  role="button"
                  tabIndex={0}
                  className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#F7F8F4] dark:hover:bg-[#14231D]/40 transition-colors"
                >
                  <div className="space-y-0.5">
                    <h3 className="text-sm font-bold text-[#DC2626] dark:text-[#F87171]">
                      {err.nom}
                    </h3>
                    <p className="text-xs text-[#63736B] dark:text-[#B7C5BE]">
                      {err.causes.length} causes fréquentes répertoriées
                    </p>
                  </div>
                  <div className="text-[#8C9892] dark:text-[#879890]">
                    {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-[#EEF2ED] dark:border-[#2C4439] space-y-3">
                    <LcdScreen expression={err.ecranMessage} />

                    <div className="space-y-1.5">
                      <div className="text-xs font-bold text-[#173126] dark:text-[#F0F4EF]">
                        Pourquoi cette erreur survient :
                      </div>
                      {err.causes.map((c, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-[#63736B] dark:text-[#B7C5BE]">
                          <span className="text-[#DC2626] dark:text-[#F87171] font-bold">•</span>
                          <span>{c}</span>
                        </div>
                      ))}
                    </div>

                    <div className="p-3 bg-[#EEF2ED] dark:bg-[#14231D] rounded-xl border border-[#E2E8E3] dark:border-[#2C4439] space-y-1">
                      <div className="text-xs font-bold text-[#123C2A] dark:text-[#6FAF82]">
                        Comment corriger immédiatement :
                      </div>
                      {err.solutions.map((s, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-[#173126] dark:text-[#F0F4EF]">
                          <Check className="w-3.5 h-3.5 text-[#2E7D32] dark:text-[#6FAF82] shrink-0 mt-0.5" />
                          <span>{s}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-[11px] font-mono text-[#8C9892] dark:text-[#879890]">
                      Exemple : {err.exempleTypique}
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
