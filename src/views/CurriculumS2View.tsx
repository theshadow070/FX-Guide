import React, { useState } from 'react';
import { CURRICULUM_S2_TOPICS, CurriculumTopicInfo } from '../data/curriculumS2';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { useApp } from '../context/AppContext';
import { KeyBadge } from '../components/KeyBadge';
import {
  BookOpen,
  FileCheck,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Calculator
} from 'lucide-react';

export const CurriculumS2View: React.FC = () => {
  const { openFunctionDetail } = useApp();
  const [expandedTopicId, setExpandedTopicId] = useState<string>(CURRICULUM_S2_TOPICS[0].id);

  const toggleExpand = (id: string) => {
    setExpandedTopicId(prev => (prev === id ? '' : id));
  };

  return (
    <div className="space-y-4 pb-20">
      {/* View Header */}
      <div>
        <div className="flex items-center gap-1.5 text-xs font-mono text-[#123C2A] dark:text-[#6FAF82] font-semibold mb-1">
          <span>Programme Officiel</span>
          <span aria-hidden="true">·</span>
          <span>Série Scientifique</span>
        </div>
        <h1 className="text-xl font-bold tracking-tight text-[#173126] dark:text-[#F0F4EF]">
          Première S2 — Méthodes & Rédaction
        </h1>
        <p className="text-xs text-[#63736B] dark:text-[#B7C5BE] mt-0.5 leading-relaxed">
          Comment utiliser ta fx-991ES efficacement sans jamais perdre de points de rédaction sur ta copie.
        </p>
      </div>

      {/* Distinction Rule Card */}
      <div className="p-3.5 bg-[#123C2A] text-white rounded-2xl space-y-1.5 shadow-sm">
        <div className="text-xs font-bold text-[#B8E86A] flex items-center gap-1.5">
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
              className="bg-white dark:bg-[#1D3028] border border-[#E2E8E3] dark:border-[#2C4439] rounded-2xl overflow-hidden shadow-sm transition-all"
            >
              {/* Accordion Trigger */}
              <div
                onClick={() => toggleExpand(topic.id)}
                role="button"
                tabIndex={0}
                className="p-4 flex items-start justify-between cursor-pointer hover:bg-[#F7F8F4] dark:hover:bg-[#14231D]/40 transition-colors"
              >
                <div className="space-y-1 pr-3">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#63736B] dark:text-[#879890]">
                    <span className="font-bold text-[#123C2A] dark:text-[#6FAF82]">
                      Chapitre {topic.chapitreNumero}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{relatedFunctions.length} procédure(s)</span>
                  </div>
                  <h3 className="text-sm font-bold text-[#173126] dark:text-[#F0F4EF] leading-snug">
                    {topic.titre}
                  </h3>
                  <p className="text-xs text-[#63736B] dark:text-[#B7C5BE]">
                    {topic.sousTitre}
                  </p>
                </div>

                <div className="pt-1 text-[#8C9892] dark:text-[#879890]">
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </div>
              </div>

              {/* Accordion Content */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-[#EEF2ED] dark:border-[#2C4439] space-y-4">
                  {/* Two columns or dual blocks: Machine vs Copie */}
                  <div className="space-y-2.5">
                    <div className="p-3 bg-[#EEF2ED] dark:bg-[#14231D] rounded-xl border border-[#E2E8E3] dark:border-[#2C4439] space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#123C2A] dark:text-[#6FAF82]">
                        <Calculator className="w-3.5 h-3.5" />
                        Rôle de la calculatrice fx-991ES
                      </div>
                      <p className="text-xs text-[#173126] dark:text-[#F0F4EF] leading-relaxed">
                        {topic.calculatriceRôle}
                      </p>
                    </div>

                    <div className="p-3 bg-[#F7F8F4] dark:bg-[#244036]/40 rounded-xl border border-[#E2E8E3] dark:border-[#2C4439] space-y-1">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-[#123C2A] dark:text-[#B8E86A]">
                        <FileCheck className="w-3.5 h-3.5" />
                        Ce qu’il faut rédiger sur ta copie
                      </div>
                      <p className="text-xs text-[#63736B] dark:text-[#B7C5BE] leading-relaxed">
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
                            className="flex items-start gap-1.5 text-[11px] text-[#63736B] dark:text-[#B7C5BE]"
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
                    <div className="text-[11px] font-mono text-[#63736B] dark:text-[#879890]">
                      Procédures à maîtriser :
                    </div>
                    <div className="space-y-1.5">
                      {relatedFunctions.map(fn => (
                        <button
                          key={fn.id}
                          onClick={() => openFunctionDetail(fn)}
                          className="w-full p-2.5 text-left bg-white dark:bg-[#1D3028] border border-[#E2E8E3] dark:border-[#2C4439] rounded-xl flex items-center justify-between hover:border-[#123C2A]/30 dark:hover:border-[#6FAF82]/50 active:scale-[0.99] transition-all"
                        >
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-mono text-[#123C2A] dark:text-[#6FAF82] font-semibold">
                              {fn.modeCasio}
                            </span>
                            <div className="text-xs font-bold text-[#173126] dark:text-[#F0F4EF]">
                              {fn.nom}
                            </div>
                          </div>
                          <ArrowRight className="w-3.5 h-3.5 text-[#123C2A] dark:text-[#6FAF82] shrink-0 ml-2" />
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
