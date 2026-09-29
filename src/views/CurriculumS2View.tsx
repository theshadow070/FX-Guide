import React, { useState, useRef } from 'react';
import { CURRICULUM_S2_TOPICS } from '../data/curriculumS2';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { useApp } from '../context/AppContext';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';
import {
  FileCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  ArrowLeft,
  Calculator
} from 'lucide-react';

export const CurriculumS2View: React.FC = () => {
  const { openFunctionDetail, setActiveTab } = useApp();
  const [expandedTopicId, setExpandedTopicId] = useState<string>(CURRICULUM_S2_TOPICS[0].id);

  // iOS-style swipe to go back
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
      soundManager.playModalClose();
      setActiveTab('home');
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const toggleExpand = (id: string) => {
    triggerHaptic('light');
    soundManager.playOptionToggle(expandedTopicId !== id);
    setExpandedTopicId(prev => (prev === id ? '' : id));
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="space-y-4 pb-20 select-none animate-in fade-in duration-150"
    >
      {/* View Header avec Retour */}
      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={() => {
            triggerHaptic('light');
            soundManager.playModalClose();
            setActiveTab('home');
          }}
          aria-label="Retour à l'accueil"
          className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-center text-[#123C2A] dark:text-white hover:bg-[#EEF4F0] dark:hover:bg-[#1A3429] active:scale-95 transition-all shadow-xs shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div>
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#123C2A] dark:text-[#58D68D] font-semibold">
            <span>Programme Officiel</span>
            <span aria-hidden="true">·</span>
            <span>Série Scientifique</span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-[#173126] dark:text-white mt-0.5">
            Première S2 — Méthodes & Rédaction
          </h1>
        </div>
      </div>

      {/* Distinction Rule Card */}
      <div className="p-3.5 bg-[#123C2A] dark:bg-[#143527] text-white rounded-2xl space-y-1.5 shadow-xs">
        <div className="text-xs font-bold text-[#58D68D] flex items-center gap-1.5">
          <FileCheck className="w-4 h-4" />
          Règle d’or en Première S2
        </div>
        <p className="text-xs text-[#E2E8E3] leading-relaxed">
          La calculatrice sert à <strong className="text-white">vérifier</strong>,{' '}
          <strong className="text-white">conjecturer</strong> et{' '}
          <strong className="text-white">sécuriser tes calculs</strong>. Sur ta copie, la justification mathématique littérale est obligatoire.
        </p>
      </div>

      {/* Chapters Accordion / List */}
      <div className="space-y-3 pt-1">
        {CURRICULUM_S2_TOPICS.map(topic => {
          const isExpanded = expandedTopicId === topic.id;
          const relatedFunctions = FX991ES_DATABASE.filter(f =>
            topic.fonctionsAssocieesIds.includes(f.id)
          );

          return (
            <article
              key={topic.id}
              className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl overflow-hidden shadow-xs transition-all"
            >
              {/* Accordion Trigger */}
              <div
                onClick={() => toggleExpand(topic.id)}
                role="button"
                tabIndex={0}
                className="p-4 flex items-start justify-between cursor-pointer hover:bg-[#F7F8F4] dark:hover:bg-[#19382B]/40 active:scale-[0.99] transition-all"
              >
                <div className="space-y-1 pr-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#63736B] dark:text-[#8EA397]">
                    <span className="font-bold text-[#123C2A] dark:text-[#58D68D]">
                      Chapitre {topic.chapitreNumero}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{relatedFunctions.length} procédure(s)</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#173126] dark:text-white leading-snug">
                    {topic.titre}
                  </h3>
                  <p className="text-xs text-[#63736B] dark:text-[#8EA397]">
                    {topic.sousTitre}
                  </p>
                </div>

                <div className="pt-1 text-[#8C9892] dark:text-[#8EA397]">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-[#EEF2ED] dark:border-[#1F3C2F] space-y-4 animate-in fade-in duration-150">
                  {/* Two columns or dual blocks: Machine vs Copie */}
                  <div className="space-y-2.5">
                    <div className="p-3 bg-[#EEF2ED] dark:bg-[#11241C] rounded-xl border border-[#E2E8E3] dark:border-[#1F3C2F] space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#123C2A] dark:text-[#58D68D]">
                        <Calculator className="w-3.5 h-3.5" />
                        Rôle de la calculatrice fx-991ES
                      </div>
                      <p className="text-xs text-[#173126] dark:text-white leading-relaxed">
                        {topic.calculatriceRôle}
                      </p>
                    </div>

                    <div className="p-3 bg-[#F7F8F4] dark:bg-[#1A382A]/40 rounded-xl border border-[#E2E8E3] dark:border-[#1F3C2F] space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#123C2A] dark:text-[#58D68D]">
                        <FileCheck className="w-3.5 h-3.5" />
                        Ce qu’il faut rédiger sur ta copie
                      </div>
                      <p className="text-xs text-[#63736B] dark:text-[#8EA397] leading-relaxed">
                        {topic.redactionSurCopie}
                      </p>
                    </div>
                  </div>

                  {/* Exam Pitfalls */}
                  {topic.piegesExamen.length > 0 && (
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#D97706] dark:text-[#FBBF24]">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        Pièges fréquents en contrôle
                      </div>
                      <div className="space-y-1">
                        {topic.piegesExamen.map((p, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-1.5 text-[11px] text-[#63736B] dark:text-[#8EA397]"
                          >
                            <span className="text-[#D97706] dark:text-[#FBBF24] font-bold">•</span>
                            <span>{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Associated Procedures Buttons */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-[11px] font-mono text-[#63736B] dark:text-[#8EA397]">
                      Procédures à maîtriser :
                    </div>
                    <div className="space-y-1.5">
                      {relatedFunctions.map(fn => (
                        <button
                          key={fn.id}
                          onClick={() => {
                            triggerHaptic('light');
                            soundManager.playCardOpen();
                            openFunctionDetail(fn);
                          }}
                          className="w-full p-2.5 text-left bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-xl flex items-center justify-between hover:border-[#123C2A]/30 dark:hover:border-[#58D68D]/50 active:scale-[0.99] transition-all shadow-2xs"
                        >
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono text-[#123C2A] dark:text-[#58D68D] font-semibold">
                              {fn.modeCasio}
                            </span>
                            <div className="text-xs font-bold text-[#173126] dark:text-white">
                              {fn.nom}
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#123C2A] dark:text-[#58D68D] shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
};
