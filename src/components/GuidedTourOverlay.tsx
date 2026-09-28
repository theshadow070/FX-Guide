import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';
import {
  ArrowRight,
  Sparkles,
  Zap,
  AlertOctagon,
  Check,
  ChevronRight,
  Compass,
  X
} from 'lucide-react';

interface GuidedTourOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TourStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  targetSelector: string; // CSS selector to highlight
  placement: 'top' | 'bottom' | 'center';
  actionTrigger?: () => void;
  ctaText?: string;
}

export const GuidedTourOverlay: React.FC<GuidedTourOverlayProps> = ({ isOpen, onClose }) => {
  const { setActiveTab, openFunctionDetail, closeFunctionDetail, openErrorDecoder, closeErrorDecoder } = useApp();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);

  const steps: TourStep[] = [
    {
      id: 1,
      title: 'Bienvenue dans ton Guide fx-991ES !',
      subtitle: 'Visite guidée interactive',
      description:
        'L’application te montre en direct comment maîtriser chaque fonction de ta Casio pour les devoirs de Première S2 et Terminale.',
      targetSelector: '[data-tour="hero-card"]',
      placement: 'bottom',
      actionTrigger: () => {
        closeFunctionDetail();
        closeErrorDecoder();
        setActiveTab('home');
      },
      ctaText: 'Démarrer la visite'
    },
    {
      id: 2,
      title: 'Recherche instantanée',
      subtitle: 'Trouve une formule en 2 secondes',
      description:
        'Tape simplement ce que tu veux faire : "trinôme", "dérivée", "vecteur", "tableau de valeurs"... Les raccourcis officiels apparaissent aussitôt.',
      targetSelector: '[data-tour="search-bar"]',
      placement: 'bottom',
      actionTrigger: () => {
        closeFunctionDetail();
        closeErrorDecoder();
        setActiveTab('home');
      },
      ctaText: 'Suivant'
    },
    {
      id: 3,
      title: 'SOS : Décodeur d’Erreurs',
      subtitle: 'Syntax ERROR ? Math ERROR ?',
      description:
        'Ne perds plus ton calcul ! Le décodeur t’explique pourquoi l’erreur est survenue et comment replacer le curseur sur le symbole fautif sans presser AC.',
      targetSelector: '[data-tour="sos-button"]',
      placement: 'top',
      actionTrigger: () => {
        closeFunctionDetail();
        closeErrorDecoder();
        setActiveTab('home');
      },
      ctaText: 'Suivant'
    },
    {
      id: 4,
      title: 'Tutoriel Plein Écran & Mode Rapide',
      subtitle: 'Exemple : Équation du 2nd degré',
      description:
        'Chaque fiche s’ouvre en plein écran sans bordure, avec le Mode Pas à Pas et le Mode Rapide qui simule l’écran LCD en temps réel !',
      targetSelector: '[data-tour="quick-card-eqn"]',
      placement: 'bottom',
      actionTrigger: () => {
        // Automatically opens the sample procedure to show the real experience
        const sample = FX991ES_DATABASE.find(f => f.id === 'eqn-second-degre');
        if (sample) {
          openFunctionDetail(sample);
        }
      },
      ctaText: 'Voir le tutoriel en direct'
    },
    {
      id: 5,
      title: 'Geste iOS & Sortie Rapide',
      subtitle: 'Navigation fluide à une main',
      description:
        'Balaye de gauche à droite sur l’écran ou touche « < Retour » pour revenir en arrière à tout moment. Tu es prêt pour tes épreuves !',
      targetSelector: '',
      placement: 'center',
      actionTrigger: () => {
        // Keep the view or close
      },
      ctaText: 'Terminer la visite'
    }
  ];

  const currentStep = steps[currentStepIndex];

  // Update target rect for spotlight
  useEffect(() => {
    if (!isOpen) return;

    if (currentStep.actionTrigger) {
      currentStep.actionTrigger();
    }

    const updateRect = () => {
      if (currentStep.targetSelector) {
        const el = document.querySelector(currentStep.targetSelector);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          const rect = el.getBoundingClientRect();
          setTargetRect(rect);
          return;
        }
      }
      setTargetRect(null);
    };

    const timer = setTimeout(updateRect, 180);
    window.addEventListener('resize', updateRect);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRect);
    };
  }, [currentStepIndex, isOpen]);

  if (!isOpen) return null;

  const handleNext = () => {
    triggerHaptic('light');
    if (currentStepIndex < steps.length - 1) {
      soundManager.playStep();
      setCurrentStepIndex(prev => prev + 1);
    } else {
      soundManager.playSuccess();
      closeFunctionDetail();
      onClose();
    }
  };

  const handleSkip = () => {
    triggerHaptic('light');
    soundManager.playTap();
    closeFunctionDetail();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 pointer-events-auto">
      {/* Dark overlay backdrop with transparent cut-out spotlight */}
      <div className="absolute inset-0 bg-black/75 transition-all duration-300" />

      {/* Dynamic Highlight Ring around targeted element */}
      {targetRect && (
        <div
          style={{
            top: targetRect.top - 6,
            left: targetRect.left - 6,
            width: targetRect.width + 12,
            height: targetRect.height + 12
          }}
          className="absolute rounded-2xl ring-4 ring-[#58D68D] dark:ring-[#58D68D] shadow-[0_0_24px_rgba(88,214,141,0.6)] pointer-events-none transition-all duration-300 animate-pulse"
        />
      )}

      {/* Floating Tour Card positioned nicely on the screen */}
      <div className="absolute inset-x-4 bottom-8 sm:bottom-12 flex justify-center pointer-events-none">
        <div className="w-full max-w-sm bg-[#F7F8F4] dark:bg-[#142920] border-2 border-[#123C2A] dark:border-[#58D68D] rounded-3xl p-5 shadow-2xl pointer-events-auto animate-in slide-in-from-bottom duration-300 text-[#173126] dark:text-[#F0F4EF] space-y-4">
          
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {steps.map((_, idx) => (
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
              className="text-xs font-semibold text-[#7A8C82] dark:text-[#8EA397] hover:text-[#123C2A] dark:hover:text-white px-2 py-1 rounded-lg"
            >
              Passer
            </button>
          </div>

          {/* Body */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#123C2A] dark:text-[#58D68D] bg-[#EEF4F0] dark:bg-[#1A382A] px-2 py-0.5 rounded-md">
              Étape {currentStep.id} sur {steps.length} • {currentStep.subtitle}
            </span>
            <h3 className="text-lg font-extrabold tracking-tight text-[#123C2A] dark:text-white leading-snug pt-1">
              {currentStep.title}
            </h3>
            <p className="text-xs text-[#52645B] dark:text-[#A1B8AA] leading-relaxed">
              {currentStep.description}
            </p>
          </div>

          {/* Action button */}
          <div className="pt-1 flex items-center gap-2">
            <button
              onClick={handleNext}
              className="w-full h-11 rounded-2xl bg-[#123C2A] hover:bg-[#194C35] text-white dark:bg-[#58D68D] dark:text-[#0C1813] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
            >
              <span>{currentStep.ctaText || 'Suivant'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
