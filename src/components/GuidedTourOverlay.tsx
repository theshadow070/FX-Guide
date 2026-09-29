import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';
import { ArrowRight, ChevronLeft } from 'lucide-react';

interface GuidedTourOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const TOUR_STEPS = [
  {
    id: 1,
    title: 'Bienvenue dans ton Guide fx-991ES !',
    subtitle: 'Visite guidée interactive',
    description:
      'L’application te montre en direct comment maîtriser chaque fonction de ta Casio pour les devoirs de Première S2 et Terminale.',
    targetSelector: '[data-tour="hero-card"]',
    ctaText: 'Démarrer la visite'
  },
  {
    id: 2,
    title: 'Recherche instantanée',
    subtitle: 'Trouve une formule en 2 secondes',
    description:
      'Tape simplement ce que tu veux faire : "trinôme", "dérivée", "vecteur", "tableau de valeurs"... Les raccourcis officiels apparaissent aussitôt.',
    targetSelector: '[data-tour="search-bar"]',
    ctaText: 'Suivant'
  },
  {
    id: 3,
    title: 'SOS : Décodeur d’Erreurs',
    subtitle: 'Syntax ERROR ? Math ERROR ?',
    description:
      'Ne perds plus ton calcul ! Le décodeur t’explique pourquoi l’erreur est survenue et comment replacer le curseur sur le symbole fautif sans presser AC.',
    targetSelector: '[data-tour="sos-button"]',
    ctaText: 'Suivant'
  },
  {
    id: 4,
    title: 'Accès Rapide aux Procédures',
    subtitle: 'Exemple : Équation du 2nd degré',
    description:
      'Chaque touche physique Casio est identifiée. Voici la fiche clé d’équation du second degré.',
    targetSelector: '[data-tour="quick-card-eqn"]',
    ctaText: 'Ouvrir cette fiche ↗'
  },
  {
    id: 5,
    title: 'Tutoriel Plein Écran & Mode Rapide',
    subtitle: 'Simulation LCD en direct',
    description:
      'Chaque fiche propose le Mode Pas à Pas détaillé et le Mode Rapide qui anime le clavier et l’écran LCD en temps réel !',
    targetSelector: '[data-tour="mode-selector"]',
    ctaText: 'Suivant'
  },
  {
    id: 6,
    title: 'Navigation Fluide & Geste de Retour',
    subtitle: 'Balaye vers la droite pour revenir',
    description:
      'Glisse simplement ton doigt de gauche à droite ou appuie sur « < Retour ». Tu as toutes les clés pour réussir tes devoirs de maths !',
    targetSelector: '[data-tour="back-btn"]',
    ctaText: 'Terminer la visite 🎉'
  }
];

export const GuidedTourOverlay: React.FC<GuidedTourOverlayProps> = ({ isOpen, onClose }) => {
  const { setActiveTab, openFunctionDetail, closeFunctionDetail, closeErrorDecoder, closeSurvivalMemo } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  // Initialize and reset state whenever the tour is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStepIndex(0);
      closeFunctionDetail();
      closeErrorDecoder();
      closeSurvivalMemo();
      setActiveTab('home');
    }
  }, [isOpen]);

  // Compute spotlight bounding rect safely on step change or resize/scroll
  useEffect(() => {
    if (!isOpen) {
      setTargetRect(null);
      return;
    }

    const step = TOUR_STEPS[currentStepIndex];
    const selector = step?.targetSelector;
    if (!selector) {
      setTargetRect(null);
      return;
    }

    const updateRect = () => {
      const el = document.querySelector(selector);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
          setTargetRect(rect);
          return true;
        }
      }
      return false;
    };

    // Smoothly bring target into view
    const initialEl = document.querySelector(selector);
    if (initialEl) {
      initialEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    updateRect();

    // Re-check as layout/scroll settles
    const t1 = setTimeout(updateRect, 80);
    const t2 = setTimeout(updateRect, 200);
    const t3 = setTimeout(updateRect, 400);

    const onScrollOrResize = () => {
      updateRect();
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [isOpen, currentStepIndex]);

  // Touch gesture support: swipe left for next step, swipe right for previous step
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

    if (Math.abs(diffX) > 60 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
      if (diffX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const handleNext = () => {
    triggerHaptic('light');
    if (currentStepIndex < TOUR_STEPS.length - 1) {
      const nextIdx = currentStepIndex + 1;
      if (nextIdx === 4) {
        // Step 5: Open the sample procedure modal to show the real experience
        soundManager.playCardOpen();
        const sample = FX991ES_DATABASE.find(f => f.id === 'eqn-second-degre');
        if (sample) {
          openFunctionDetail(sample);
        }
      } else {
        soundManager.playStep();
      }
      setCurrentStepIndex(nextIdx);
    } else {
      soundManager.playSuccess();
      closeFunctionDetail();
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      triggerHaptic('light');
      soundManager.playTap();
      const prevIdx = currentStepIndex - 1;
      if (prevIdx < 4) {
        closeFunctionDetail();
      }
      setCurrentStepIndex(prevIdx);
    }
  };

  const handleSkip = () => {
    triggerHaptic('light');
    soundManager.playModalClose();
    closeFunctionDetail();
    onClose();
  };

  if (!isOpen) return null;

  const currentStep = TOUR_STEPS[currentStepIndex] || TOUR_STEPS[0];

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 pointer-events-auto select-none"
    >
      {/* Dark overlay backdrop */}
      <div className="absolute inset-0 bg-black/75 transition-opacity duration-300" />

      {/* Dynamic Highlight Ring wrapping target element with precision */}
      {targetRect && (
        <div
          style={{
            position: 'fixed',
            top: Math.max(8, targetRect.top - 6),
            left: Math.max(8, targetRect.left - 6),
            width: targetRect.width + 12,
            height: targetRect.height + 12
          }}
          className="rounded-3xl ring-4 ring-[#58D68D] shadow-[0_0_35px_rgba(88,214,141,0.85)] pointer-events-none transition-all duration-300 animate-pulse z-50"
        />
      )}

      {/* Floating Tour Card positioned at bottom */}
      <div className="fixed inset-x-4 bottom-8 sm:bottom-12 flex justify-center pointer-events-none z-50">
        <div className="w-full max-w-sm bg-[#F7F8F4] dark:bg-[#142920] border-2 border-[#123C2A] dark:border-[#58D68D] rounded-3xl p-5 shadow-2xl pointer-events-auto animate-in slide-in-from-bottom duration-300 text-[#173126] dark:text-[#F0F4EF] space-y-4">
          
          {/* Header with Step Dots & Skip button */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {TOUR_STEPS.map((_, idx) => (
                <span
                  key={idx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentStepIndex
                      ? 'w-6 bg-[#123C2A] dark:bg-[#58D68D]'
                      : 'w-1.5 bg-[#CBD5E1] dark:bg-[#254234]'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleSkip}
              className="text-xs font-semibold text-[#7A8C82] dark:text-[#8EA397] hover:text-[#123C2A] dark:hover:text-white px-2 py-1 rounded-lg transition-colors"
            >
              Passer
            </button>
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123C2A] dark:text-[#58D68D] bg-[#EEF4F0] dark:bg-[#1A382A] px-2 py-0.5 rounded-md">
                Étape {currentStep.id} sur {TOUR_STEPS.length}
              </span>
              <span className="text-xs font-semibold text-[#5A7365] dark:text-[#8EA397]">
                • {currentStep.subtitle}
              </span>
            </div>

            <h3 className="text-lg font-extrabold tracking-tight text-[#123C2A] dark:text-white leading-snug pt-1">
              {currentStep.title}
            </h3>
            <p className="text-xs text-[#52645B] dark:text-[#A1B8AA] leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {/* Bottom Actions with Back (if > step 0) and Next CTA */}
          <div className="pt-1 flex items-center gap-2">
            {currentStepIndex > 0 && (
              <button
                onClick={handlePrev}
                aria-label="Étape précédente"
                className="w-11 h-11 rounded-2xl bg-white dark:bg-[#19382A] border border-[#E2E8E3] dark:border-[#254B38] text-[#123C2A] dark:text-white flex items-center justify-center hover:bg-[#EEF4F0] active:scale-95 transition-all shadow-xs shrink-0"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={handleNext}
              className="flex-1 h-11 rounded-2xl bg-[#123C2A] hover:bg-[#194C35] text-white dark:bg-[#58D68D] dark:text-[#0C1813] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <span>{currentStep.ctaText || 'Suivant'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-[10px] text-center text-[#7A8C82] dark:text-[#6C8377]">
            💡 Tu peux aussi glisser l'écran vers la gauche ou la droite
          </div>

        </div>
      </div>
    </div>
  );
};
