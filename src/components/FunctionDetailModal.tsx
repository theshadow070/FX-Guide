import React, { useState } from 'react';
import { CasioFunctionItem } from '../types';
import { useApp } from '../context/AppContext';
import { KeyBadge } from './KeyBadge';
import { LcdScreen } from './LcdScreen';
import {
  X,
  Heart,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  ChevronLeft,
  ChevronRight,
  Zap,
  ListOrdered
} from 'lucide-react';

interface FunctionDetailModalProps {
  item: CasioFunctionItem | null;
  onClose: () => void;
}

export const FunctionDetailModal: React.FC<FunctionDetailModalProps> = ({ item, onClose }) => {
  const { isFavorite, toggleFavorite, isMastered, toggleMastered } = useApp();
  const [activeMode, setActiveMode] = useState<'step' | 'fast'>('step');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  if (!item) return null;

  const bookmarked = isFavorite(item.id);
  const mastered = isMastered(item.id);
  const currentStep = item.etapes[currentStepIndex] || item.etapes[0];
  const totalSteps = item.etapes.length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-sm transition-opacity">
      {/* Click outside to close backdrop */}
      <div className="absolute inset-0" onClick={onClose} aria-label="Fermer la vue détaillée" />

      {/* Modal / Bottom Sheet Container */}
      <div className="relative w-full max-w-lg mx-auto max-h-[92vh] flex flex-col bg-[#F7F8F4] dark:bg-[#0E1914] rounded-t-3xl border-t border-x border-[#E2E8E3] dark:border-[#2C4439] shadow-2xl overflow-hidden z-10 animate-in slide-in-from-bottom duration-200">
        {/* Grab Handle */}
        <div className="w-12 h-1.5 bg-[#CBD5E1] dark:bg-[#2C4439] rounded-full mx-auto my-2.5 shrink-0" />

        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 pb-3 border-b border-[#E2E8E3] dark:border-[#2C4439] shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-[#63736B] dark:text-[#B7C5BE]">
            <span className="font-semibold text-[#123C2A] dark:text-[#6FAF82]">
              {item.modeCasio}
            </span>
            <span aria-hidden="true">·</span>
            <span>{item.sousCategorie}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => toggleFavorite(item.id)}
              className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-[#63736B] dark:text-[#B7C5BE] hover:bg-[#EEF2ED] dark:hover:bg-[#1D3028] transition-colors"
              aria-label={bookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <Heart
                className={`w-5 h-5 ${
                  bookmarked ? 'fill-[#DC2626] text-[#DC2626] dark:fill-[#58D68D] dark:text-[#58D68D]' : ''
                }`}
              />
            </button>

            <button
              onClick={onClose}
              className="p-2 min-w-[40px] min-h-[40px] flex items-center justify-center rounded-xl text-[#63736B] dark:text-[#B7C5BE] hover:bg-[#EEF2ED] dark:hover:bg-[#1D3028] transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6 overscroll-contain">
          {/* Header Title */}
          <div>
            <h2 className="text-xl font-bold text-[#173126] dark:text-[#F0F4EF] tracking-tight leading-snug">
              {item.nom}
            </h2>
            <p className="mt-1 text-sm text-[#63736B] dark:text-[#B7C5BE] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Mode Switcher: Mode Pas à Pas vs Mode Rapide */}
          <div className="flex p-1 bg-[#EEF2ED] dark:bg-[#1D3028] rounded-xl border border-[#E2E8E3] dark:border-[#2C4439]">
            <button
              onClick={() => setActiveMode('step')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                activeMode === 'step'
                  ? 'bg-white dark:bg-[#244036] text-[#123C2A] dark:text-[#F0F4EF] shadow-sm'
                  : 'text-[#63736B] dark:text-[#B7C5BE]'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              Mode Pas à Pas
            </button>
            <button
              onClick={() => setActiveMode('fast')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold rounded-lg transition-all ${
                activeMode === 'fast'
                  ? 'bg-white dark:bg-[#244036] text-[#123C2A] dark:text-[#F0F4EF] shadow-sm'
                  : 'text-[#63736B] dark:text-[#B7C5BE]'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              Mode Rapide
            </button>
          </div>

          {/* Main Action Block: Either Step-by-Step or Fast Cheatsheet */}
          {activeMode === 'step' ? (
            <div className="bg-white dark:bg-[#1D3028] border border-[#E2E8E3] dark:border-[#2C4439] rounded-2xl p-4 space-y-4 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-[#63736B] dark:text-[#879890] border-b border-[#EEF2ED] dark:border-[#2C4439] pb-2">
                <span className="font-bold text-[#123C2A] dark:text-[#6FAF82]">
                  Étape {currentStep.stepNumber} sur {totalSteps}
                </span>
                <span>fx-991ES Originale</span>
              </div>

              {/* Step Title & Instruction */}
              <div>
                <h4 className="text-sm font-bold text-[#173126] dark:text-[#F0F4EF]">
                  {currentStep.title}
                </h4>
                <p className="text-xs text-[#63736B] dark:text-[#B7C5BE] mt-1 leading-relaxed">
                  {currentStep.action}
                </p>
              </div>

              {/* Visual Keystrokes for this Step */}
              <div className="p-3 bg-[#F7F8F4] dark:bg-[#14231D] rounded-xl border border-[#E2E8E3] dark:border-[#2C4439]">
                <div className="text-[11px] font-mono text-[#63736B] dark:text-[#879890] mb-1.5">
                  Touches à presser :
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {currentStep.keys.map((k, idx) => (
                    <KeyBadge
                      key={idx}
                      label={k}
                      size="md"
                      showConnector={idx < currentStep.keys.length - 1}
                    />
                  ))}
                </div>
              </div>

              {/* Screen Preview if available */}
              {currentStep.screenDisplay && (
                <LcdScreen
                  expression={currentStep.screenDisplay}
                  modeIndicator={item.modeCasio.replace(':', '')}
                />
              )}

              {/* Step Annotation Tip */}
              {currentStep.annotation && (
                <p className="text-[11px] text-[#63736B] dark:text-[#B7C5BE] italic bg-[#EEF2ED]/60 dark:bg-[#244036]/40 p-2.5 rounded-lg border border-[#E2E8E3]/60 dark:border-[#2C4439]/60">
                  💡 {currentStep.annotation}
                </p>
              )}

              {/* Step Navigation Controls */}
              <div className="flex items-center justify-between pt-2">
                <button
                  disabled={currentStepIndex === 0}
                  onClick={() => setCurrentStepIndex(prev => Math.max(0, prev - 1))}
                  className="flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-lg bg-[#EEF2ED] dark:bg-[#244036] text-[#123C2A] dark:text-[#F0F4EF] disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  Précédent
                </button>

                {currentStepIndex < totalSteps - 1 ? (
                  <button
                    onClick={() => setCurrentStepIndex(prev => Math.min(totalSteps - 1, prev + 1))}
                    className="flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-lg bg-[#123C2A] text-white dark:bg-[#6FAF82] dark:text-[#0E1914] shadow-sm active:scale-95 transition-all"
                  >
                    Suivant
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <button
                    onClick={() => toggleMastered(item.id)}
                    className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-[#2E7D32] dark:bg-[#B8E86A] text-white dark:text-[#0E1914] shadow-sm active:scale-95 transition-all"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {mastered ? 'Maîtrisé !' : 'Marquer comme maîtrisé'}
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Fast Mode: Full condensed sequence */
            <div className="bg-white dark:bg-[#1D3028] border border-[#E2E8E3] dark:border-[#2C4439] rounded-2xl p-4 space-y-3 shadow-sm">
              <div className="flex items-center justify-between text-xs font-mono text-[#63736B] dark:text-[#879890]">
                <span className="font-semibold text-[#123C2A] dark:text-[#6FAF82]">
                  Séquence condensée express
                </span>
                <span>{item.touchesRapides.length} touches</span>
              </div>

              <div className="p-3 bg-[#F7F8F4] dark:bg-[#14231D] rounded-xl border border-[#E2E8E3] dark:border-[#2C4439] flex items-center gap-1.5 flex-wrap">
                {item.touchesRapides.map((key, idx) => (
                  <KeyBadge
                    key={idx}
                    label={key}
                    size="md"
                    showConnector={idx < item.touchesRapides.length - 1}
                  />
                ))}
              </div>

              <p className="text-xs text-[#63736B] dark:text-[#B7C5BE] leading-relaxed">
                Applique cette combinaison directement sur ta machine pour aller le plus vite possible pendant tes exercices.
              </p>
            </div>
          )}

          {/* Section: Exemple concret & Résultat vérifié */}
          <section className="bg-white dark:bg-[#1D3028] border border-[#E2E8E3] dark:border-[#2C4439] rounded-2xl p-4 space-y-3 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123C2A] dark:text-[#6FAF82]">
              Exemple type Première S2
            </h4>
            <div className="text-xs font-medium text-[#173126] dark:text-[#F0F4EF] bg-[#EEF2ED] dark:bg-[#14231D] p-3 rounded-xl border border-[#E2E8E3] dark:border-[#2C4439]">
              {item.exemple.enonce}
            </div>

            <LcdScreen
              expression={item.exemple.entree}
              result={item.exemple.resultatEcran}
              modeIndicator={item.modeCasio.replace(':', '')}
            />

            <div className="text-xs text-[#63736B] dark:text-[#B7C5BE] leading-relaxed">
              <span className="font-semibold text-[#173126] dark:text-[#F0F4EF]">
                Interprétation mathématique :
              </span>{' '}
              {item.exemple.interpretation}
            </div>
          </section>

          {/* Section: Conseils pour la copie (Rédaction Première S2) */}
          {item.redactionConseil && (
            <section className="bg-[#EEF2ED]/70 dark:bg-[#14231D] border border-[#E2E8E3] dark:border-[#2C4439] rounded-2xl p-4 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#123C2A] dark:text-[#6FAF82]">
                <FileText className="w-4 h-4" />
                <span>Ce qu’il faut rédiger sur ta copie</span>
              </div>
              <p className="text-xs text-[#63736B] dark:text-[#B7C5BE] leading-relaxed">
                {item.redactionConseil}
              </p>
            </section>
          )}

          {/* Section: À retenir */}
          <section className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123C2A] dark:text-[#6FAF82]">
              À retenir absolument
            </h4>
            <div className="space-y-1.5">
              {item.aRetenir.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-[#173126] dark:text-[#F0F4EF] bg-white dark:bg-[#1D3028] p-3 rounded-xl border border-[#E2E8E3] dark:border-[#2C4439]"
                >
                  <span className="text-[#123C2A] dark:text-[#6FAF82] font-bold">✓</span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Erreurs fréquentes Casio */}
          {item.erreursFrequentes.length > 0 && (
            <section className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706] dark:text-[#FBBF24] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" />
                Pièges & Erreurs fréquentes
              </h4>
              <div className="space-y-2">
                {item.erreursFrequentes.map((err, idx) => (
                  <div
                    key={idx}
                    className="text-xs bg-white dark:bg-[#1D3028] border border-[#E2E8E3] dark:border-[#2C4439] rounded-xl p-3 space-y-1"
                  >
                    <div className="font-bold text-[#DC2626] dark:text-[#F87171]">
                      Problème : {err.probleme}
                    </div>
                    <div className="text-[#63736B] dark:text-[#B7C5BE]">
                      <span className="font-semibold">Cause :</span> {err.cause}
                    </div>
                    <div className="text-[#123C2A] dark:text-[#6FAF82] font-medium pt-1">
                      <span className="font-semibold">Solution :</span> {err.solution}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Astuce */}
          {item.astuces.length > 0 && (
            <section className="bg-[#EEF2ED] dark:bg-[#244036]/50 border border-[#E2E8E3] dark:border-[#2C4439] rounded-2xl p-4 space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#123C2A] dark:text-[#B8E86A]">
                <Lightbulb className="w-4 h-4" />
                Astuce calculatrice
              </div>
              {item.astuces.map((tip, idx) => (
                <p key={idx} className="text-xs text-[#63736B] dark:text-[#B7C5BE] leading-relaxed">
                  {tip}
                </p>
              ))}
            </section>
          )}
        </div>

        {/* Modal Bottom CTA Bar: Mark as Mastered / Favorite */}
        <div className="p-4 border-t border-[#E2E8E3] dark:border-[#2C4439] bg-white dark:bg-[#1D3028] flex items-center gap-2 shrink-0">
          <button
            onClick={() => toggleMastered(item.id)}
            className={`flex-1 h-11 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-transform active:scale-[0.98] ${
              mastered
                ? 'bg-[#EEF2ED] dark:bg-[#244036] text-[#2E7D32] dark:text-[#B8E86A] border border-[#2E7D32]/20'
                : 'bg-[#123C2A] dark:bg-[#6FAF82] text-white dark:text-[#0E1914] shadow-md'
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            {mastered ? 'Fonction maîtrisée' : 'Marquer comme maîtrisée'}
          </button>
        </div>
      </div>
    </div>
  );
};
