import React, { useState } from 'react';
import { Sparkles, ArrowRight, Check, X, Compass, Zap, AlertOctagon, BookOpen } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ONBOARDING_STEPS = [
  {
    step: 1,
    title: 'Bienvenue sur fx-991ES Guide',
    subtitle: 'Première S2 & Terminale',
    description:
      'L’application conçue pour maîtriser immédiatement chaque touche, mode et astuce de votre calculatrice Casio sans perdre de temps en devoir surveillé.',
    icon: <Sparkles className="w-8 h-8 text-[#123C2A] dark:text-[#58D68D]" />,
    highlight: '100% Hors-Ligne & conforme au programme de mathématiques.'
  },
  {
    step: 2,
    title: 'Tutoriels & Mode Rapide',
    subtitle: 'Immersion tactile pas-à-pas',
    description:
      'Consultez les procédures en plein écran ou lancez le Mode Rapide pour suivre la frappe des touches sur un écran LCD dynamique.',
    icon: <Zap className="w-8 h-8 text-[#123C2A] dark:text-[#58D68D]" />,
    highlight: 'Basculez entre Degré [D] et Radian [R] automatiquement.'
  },
  {
    step: 3,
    title: 'Décodeur d’Erreurs & Mémo Jour J',
    subtitle: 'Ne perdez plus vos calculs',
    description:
      'Un message Syntax ERROR ou Math ERROR ? Le Décodeur vous donne l’astuce pour corriger le curseur sans faire AC. La fiche A4 récapitule les 10 réflexes indispensables.',
    icon: <AlertOctagon className="w-8 h-8 text-[#123C2A] dark:text-[#58D68D]" />,
    highlight: 'Accessible d’un clic depuis l’accueil et la recherche.'
  },
  {
    step: 4,
    title: 'Prêt pour l’entraînement !',
    subtitle: 'Simplicité & clarté absolue',
    description:
      'Naviguez facilement entre Accueil, Explorer, Recherche et Favoris. Touchez une section pour remonter instantanément au sommet de la page.',
    icon: <BookOpen className="w-8 h-8 text-[#123C2A] dark:text-[#58D68D]" />,
    highlight: 'Marquez vos fonctions comme maîtrisées pour suivre votre progression.'
  }
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const stepData = ONBOARDING_STEPS[currentStep];
  const isLast = currentStep === ONBOARDING_STEPS.length - 1;

  const handleNext = () => {
    triggerHaptic('light');
    if (isLast) {
      onClose();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleSkip = () => {
    triggerHaptic('light');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-sm bg-[#F7F8F4] dark:bg-[#0E1914] rounded-3xl border border-[#E2E8E3] dark:border-[#20362B] shadow-2xl p-6 flex flex-col justify-between min-h-[440px] text-[#173126] dark:text-[#F0F4EF]">
        
        {/* Top bar with progress dots and skip button */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {ONBOARDING_STEPS.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'w-6 bg-[#123C2A] dark:bg-[#58D68D]'
                    : 'w-1.5 bg-[#CBD5E1] dark:bg-[#20362B]'
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

        {/* Center content */}
        <div className="space-y-4 py-4 my-auto">
          <div className="w-16 h-16 rounded-2xl bg-[#EEF4F0] dark:bg-[#1A3326] border border-[#DCE5DF] dark:border-[#264435] flex items-center justify-center mx-auto shadow-xs">
            {stepData.icon}
          </div>

          <div className="text-center space-y-1.5">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123C2A] dark:text-[#58D68D]">
              {stepData.subtitle}
            </span>
            <h3 className="text-xl font-extrabold tracking-tight text-[#173126] dark:text-white leading-tight">
              {stepData.title}
            </h3>
            <p className="text-xs text-[#52645B] dark:text-[#A1B8AA] leading-relaxed pt-1">
              {stepData.description}
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-[#EEF2ED] dark:bg-[#152B20] border border-[#E2E8E3] dark:border-[#234233] text-center text-xs font-medium text-[#123C2A] dark:text-[#87D4A4]">
            💡 {stepData.highlight}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2">
          <button
            onClick={handleNext}
            className="w-full h-12 rounded-2xl bg-[#123C2A] hover:bg-[#194C35] text-white dark:bg-[#58D68D] dark:text-[#0C1813] font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-all"
          >
            <span>{isLast ? 'Commencer la découverte' : 'Continuer'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
