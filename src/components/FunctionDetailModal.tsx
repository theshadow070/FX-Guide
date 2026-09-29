import React, { useState, useEffect, useRef } from 'react';
import { CasioFunctionItem } from '../types';
import { useApp } from '../context/AppContext';
import { KeyBadge } from './KeyBadge';
import { LcdScreen } from './LcdScreen';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';
import {
  ChevronLeft,
  Heart,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  FileText,
  ChevronRight,
  Zap,
  ListOrdered,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Compass,
  X,
  Award
} from 'lucide-react';

interface FunctionDetailModalProps {
  item: CasioFunctionItem | null;
  onClose: () => void;
  onOpenErrorDecoder?: () => void;
}

export const FunctionDetailModal: React.FC<FunctionDetailModalProps> = ({
  item,
  onClose,
  onOpenErrorDecoder
}) => {
  const { isFavorite, toggleFavorite, isMastered, toggleMastered } = useApp();
  const [activeMode, setActiveMode] = useState<'step' | 'fast'>('step');
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // Angle Mode state: 'D' (Degré) or 'R' (Radian)
  const isTrigOrAnalysis =
    item?.categorie === 'trigonometrie' ||
    item?.nom.toLowerCase().includes('trigo') ||
    item?.nom.toLowerCase().includes('sin') ||
    item?.nom.toLowerCase().includes('cos') ||
    item?.nom.toLowerCase().includes('angle') ||
    item?.nom.toLowerCase().includes('polaire') ||
    item?.nom.toLowerCase().includes('dériv');

  const defaultAngleMode: 'D' | 'R' =
    item?.nom.toLowerCase().includes('rad') || item?.description.toLowerCase().includes('radian')
      ? 'R'
      : 'D';

  const [angleMode, setAngleMode] = useState<'D' | 'R'>(defaultAngleMode);

  // Simulator Player State for Mode Rapide
  const [simIndex, setSimIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Pop-up "Marquer comme maîtrisée" banner at completion
  const [showCompletionPopup, setShowCompletionPopup] = useState<boolean>(false);

  // Gestes tactiles : swipe retour (gauche vers droite) & swipe entre étapes (sur carte étape)
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const stepTouchStartXRef = useRef<number | null>(null);

  // Reset simulator and state when item or mode switches
  useEffect(() => {
    setSimIndex(0);
    setCurrentStepIndex(0);
    setIsPlaying(false);
    setShowCompletionPopup(false);
    if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
  }, [item?.id, activeMode]);

  // Handle Autoplay for Mode Rapide
  useEffect(() => {
    if (isPlaying && item) {
      autoPlayTimerRef.current = setInterval(() => {
        setSimIndex(prev => {
          if (prev < item.touchesRapides.length - 1) {
            triggerHaptic('light');
            soundManager.playStep();
            return prev + 1;
          } else {
            setIsPlaying(false);
            triggerHaptic('medium');
            soundManager.playSuccess();
            setShowCompletionPopup(true);
            return prev;
          }
        });
      }, 850);
    } else {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isPlaying, item]);

  // Check if step tutorial is completed to trigger completion pop-up
  useEffect(() => {
    if (item && currentStepIndex === item.etapes.length - 1 && item.etapes.length > 1) {
      setShowCompletionPopup(true);
    }
  }, [currentStepIndex, item]);

  if (!item) return null;

  const bookmarked = isFavorite(item.id);
  const mastered = isMastered(item.id);
  const currentStep = item.etapes[currentStepIndex] || item.etapes[0];
  const totalSteps = item.etapes.length;

  const touchesRapides = item.touchesRapides;
  const currentFastKey = touchesRapides[simIndex] || touchesRapides[0];

  // Dynamic LCD expression for simulator
  const activeKeysSoFar = touchesRapides.slice(0, simIndex + 1);
  const simExpression = activeKeysSoFar.join(' ');
  const isLastKey = simIndex === touchesRapides.length - 1;

  // Active key flags
  const isShiftActive = currentFastKey?.toUpperCase() === 'SHIFT';
  const isAlphaActive = currentFastKey?.toUpperCase() === 'ALPHA';

  // Toggle angle mode
  const handleToggleAngle = (mode: 'D' | 'R') => {
    triggerHaptic('selection');
    soundManager.playAngleSwitch();
    setAngleMode(mode);
  };

  // Global screen swipe handling (iOS swipe to go back)
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const touch = e.changedTouches[0];
    const diffX = touch.clientX - touchStartXRef.current;
    const diffY = touch.clientY - touchStartYRef.current;

    // Detect intentional horizontal swipe from left to right to close
    if (diffX > 75 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      triggerHaptic('light');
      soundManager.playTap();
      onClose();
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  // Step card specific swipe (left for next step, right for previous step)
  const handleStepTouchStart = (e: React.TouchEvent) => {
    stepTouchStartXRef.current = e.touches[0].clientX;
  };

  const handleStepTouchEnd = (e: React.TouchEvent) => {
    if (stepTouchStartXRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - stepTouchStartXRef.current;
    if (diffX < -50 && currentStepIndex < totalSteps - 1) {
      // Swipe left -> Next step
      triggerHaptic('light');
      soundManager.playStep();
      setCurrentStepIndex(prev => prev + 1);
    } else if (diffX > 50 && currentStepIndex > 0) {
      // Swipe right -> Prev step
      triggerHaptic('light');
      soundManager.playTap();
      setCurrentStepIndex(prev => prev - 1);
    }
    stepTouchStartXRef.current = null;
  };

  const handleMarkMastered = () => {
    triggerHaptic('medium');
    toggleMastered(item.id);
  };

  return (
    <>
      {/* ========================================================================= */}
      {/* 🚀 MODE RAPIDE (Épuré, palette Casio verte/sombre, thèmes clair et sombre)*/}
      {/* "le seul moyen de sortir du mode rapide est d'appuyer sur une croix"      */}
      {/* ========================================================================= */}
      {activeMode === 'fast' ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#F7F8F4] dark:bg-[#0C1813] text-[#123C2A] dark:text-[#F1F5F2] animate-in fade-in duration-200 overflow-hidden">
          
          {/* Top Navigation Header matching app palette */}
          <div className="relative z-10 flex items-center justify-between px-5 py-4 border-b border-[#E2E8E3] dark:border-[#1E3A2D] bg-white/80 dark:bg-[#10221A]/80 backdrop-blur-xl shrink-0 pt-safe">
            <div className="flex items-center gap-2.5">
              <span className="font-bold text-sm tracking-tight text-[#123C2A] dark:text-white">
                Mode Rapide
              </span>
              <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded-full bg-[#EEF4F0] dark:bg-[#1A382A] text-[#123C2A] dark:text-[#87D4A4]">
                {item.modeCasio.replace(':', '')}
              </span>
            </div>

            {/* ONLY WAY TO EXIT IS CLICKING THIS CLOSE CROSS */}
            <button
              onClick={() => {
                triggerHaptic('light');
                soundManager.playTap();
                setActiveMode('step');
              }}
              className="w-8 h-8 rounded-full bg-[#EEF4F0] dark:bg-[#1A382A] hover:bg-[#E2EBE5] dark:hover:bg-[#234A38] text-[#123C2A] dark:text-white flex items-center justify-center transition-all active:scale-90"
              aria-label="Fermer le mode rapide"
              title="Sortir du mode rapide"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 max-w-lg w-full mx-auto flex flex-col justify-between space-y-5 pb-28">
            
            {/* Header info & Angle check */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#5A7365] dark:text-[#8EA397]">
                  Séquence Casio fx-991ES
                </span>

                {/* Harmonious Segmented Angle Switcher */}
                <div className="flex items-center p-0.5 bg-[#EEF4F0] dark:bg-[#1A382A] rounded-xl text-xs font-medium">
                  <button
                    onClick={() => handleToggleAngle('D')}
                    className={`px-2.5 py-0.5 rounded-lg transition-all active:scale-95 ${
                      angleMode === 'D'
                        ? 'bg-[#123C2A] text-white dark:bg-[#58D68D] dark:text-[#0C1813] shadow-xs font-bold'
                        : 'text-[#5A7365] dark:text-[#8EA397]'
                    }`}
                  >
                    Deg
                  </button>
                  <button
                    onClick={() => handleToggleAngle('R')}
                    className={`px-2.5 py-0.5 rounded-lg transition-all active:scale-95 ${
                      angleMode === 'R'
                        ? 'bg-[#123C2A] text-white dark:bg-[#58D68D] dark:text-[#0C1813] shadow-xs font-bold'
                        : 'text-[#5A7365] dark:text-[#8EA397]'
                    }`}
                  >
                    Rad
                  </button>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-[#123C2A] dark:text-white tracking-tight">
                {item.nom}
              </h2>
            </div>

            {/* Realistic LCD Screen Casio fx-991ES */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-[#5A7365] dark:text-[#8EA397]">
                <span>Affichage écran Casio :</span>
                <span className="font-mono">
                  {simIndex + 1} / {touchesRapides.length}
                </span>
              </div>
              <LcdScreen
                expression={simExpression}
                result={isLastKey ? item.exemple.resultatEcran : undefined}
                angleMode={angleMode}
                hasShift={isShiftActive}
                hasAlpha={isAlphaActive}
                modeIndicator={item.modeCasio.replace(':', '')}
                subText={
                  isLastKey
                    ? `✓ Résultat : ${item.exemple.interpretation}`
                    : `Touche suivante : [${touchesRapides[simIndex + 1] || '='}]`
                }
              />
            </div>

            {/* Sequence Pills Timeline - Minimalist Card */}
            <div className="bg-white dark:bg-[#142920] rounded-3xl p-4 border border-[#E2E8E3] dark:border-[#1F3C2F] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#5A7365] dark:text-[#8EA397]">
                  Touches de la formule :
                </span>
                <span className="text-xs font-mono font-bold text-[#123C2A] dark:text-[#58D68D]">
                  [{currentFastKey}]
                </span>
              </div>

              {/* Scrollable Badge List */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1 px-0.5 no-scrollbar">
                {touchesRapides.map((key, idx) => {
                  const isCurrent = idx === simIndex;
                  const isDone = idx < simIndex;
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        triggerHaptic('light');
                        soundManager.playStep();
                        setSimIndex(idx);
                        setIsPlaying(false);
                        if (idx === touchesRapides.length - 1) {
                          setShowCompletionPopup(true);
                        }
                      }}
                      className={`relative shrink-0 rounded-lg transition-all active:scale-95 ${
                        isCurrent
                          ? 'ring-2 ring-[#123C2A] dark:ring-[#58D68D] scale-105 shadow-sm'
                          : isDone
                          ? 'opacity-70'
                          : 'opacity-35'
                      }`}
                    >
                      <KeyBadge label={key} size="md" />
                    </button>
                  );
                })}
              </div>

              {/* Playback Controls */}
              <div className="flex items-center justify-between pt-2 border-t border-[#EEF2ED] dark:border-[#1E3A2D]">
                <button
                  onClick={() => {
                    triggerHaptic('light');
                    soundManager.playTap();
                    setSimIndex(0);
                    setIsPlaying(false);
                    setShowCompletionPopup(false);
                  }}
                  className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#EEF4F0] dark:bg-[#1A382A] hover:bg-[#E2EBE5] dark:hover:bg-[#234A38] text-xs font-medium text-[#123C2A] dark:text-[#87D4A4] active:scale-95 transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Début</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    disabled={simIndex === 0}
                    onClick={() => {
                      triggerHaptic('light');
                      soundManager.playTap();
                      setSimIndex(prev => Math.max(0, prev - 1));
                      setIsPlaying(false);
                    }}
                    className="p-2 rounded-xl bg-[#EEF4F0] dark:bg-[#1A382A] hover:bg-[#E2EBE5] dark:hover:bg-[#234A38] text-[#123C2A] dark:text-white disabled:opacity-30 disabled:pointer-events-none active:scale-90 transition-all"
                    aria-label="Touche précédente"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => {
                      triggerHaptic('medium');
                      soundManager.playTap();
                      setIsPlaying(!isPlaying);
                    }}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold transition-all active:scale-95 bg-[#123C2A] text-white dark:bg-[#58D68D] dark:text-[#0C1813] shadow-xs"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="w-3.5 h-3.5 fill-current" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Lecture</span>
                      </>
                    )}
                  </button>

                  <button
                    disabled={simIndex >= touchesRapides.length - 1}
                    onClick={() => {
                      triggerHaptic('light');
                      soundManager.playStep();
                      const next = simIndex + 1;
                      setSimIndex(next);
                      setIsPlaying(false);
                      if (next === touchesRapides.length - 1) {
                        setShowCompletionPopup(true);
                      }
                    }}
                    className="p-2 rounded-xl bg-[#EEF4F0] dark:bg-[#1A382A] hover:bg-[#E2EBE5] dark:hover:bg-[#234A38] text-[#123C2A] dark:text-white disabled:opacity-30 disabled:pointer-events-none active:scale-90 transition-all"
                    aria-label="Touche suivante"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Key Press Target */}
            <div className="bg-white dark:bg-[#142920] rounded-3xl p-4 border border-[#E2E8E3] dark:border-[#1F3C2F] shadow-xs flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#123C2A] dark:text-white">
                  {simIndex < touchesRapides.length - 1 ? 'Touche suivante à presser' : 'Séquence terminée'}
                </div>
                <div className="text-[11px] text-[#5A7365] dark:text-[#8EA397] mt-0.5">
                  Tapez pour continuer la simulation
                </div>
              </div>

              <button
                onClick={() => {
                  triggerHaptic('medium');
                  soundManager.playTap();
                  if (simIndex < touchesRapides.length - 1) {
                    const next = simIndex + 1;
                    setSimIndex(next);
                    if (next === touchesRapides.length - 1) {
                      soundManager.playSuccess();
                      setShowCompletionPopup(true);
                    }
                  } else {
                    soundManager.playSuccess();
                    setShowCompletionPopup(true);
                  }
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-[#123C2A] dark:bg-[#58D68D] text-white dark:text-[#0C1813] text-xs font-bold shadow-sm active:scale-95 transition-all"
              >
                <KeyBadge label={currentFastKey} size="sm" />
                <span>
                  {simIndex < touchesRapides.length - 1 ? 'Presser' : 'Terminé'}
                </span>
              </button>
            </div>

            <p className="text-center text-[11px] text-[#5A7365] dark:text-[#8EA397]">
              Pour quitter le Mode Rapide, appuyez sur la croix ✕ en haut à droite.
            </p>

          </div>
        </div>
      ) : null}

      {/* ========================================================================= */}
      {/* 📄 PAGE TUTORIEL EN PLEIN ÉCRAN SANS BORDURE                             */}
      {/* Icône de retour + Balayage iOS de gauche à droite (Swipe to go back)      */}
      {/* ========================================================================= */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="fixed inset-0 z-40 flex flex-col bg-[#F7F8F4] dark:bg-[#0E1914] text-[#173126] dark:text-[#F0F4EF] animate-in slide-in-from-right duration-250 select-none overflow-hidden"
      >
        {/* Full-width seamless header */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#F7F8F4]/90 dark:bg-[#0E1914]/90 backdrop-blur-md border-b border-[#E2E8E3] dark:border-[#20362B] pt-safe shrink-0">
          
          <button
            data-tour="back-btn"
            onClick={() => {
              triggerHaptic('light');
              soundManager.playModalClose();
              onClose();
            }}
            className="flex items-center gap-1.5 -ml-2 px-2.5 py-1.5 rounded-xl text-[#123C2A] dark:text-[#6FAF82] hover:bg-[#EEF2ED] dark:hover:bg-[#1D3028] transition-colors active:scale-95"
            aria-label="Retour"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
            <span className="text-sm font-semibold">Retour</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-[#63736B] dark:text-[#879890] truncate max-w-[160px] sm:max-w-xs">
            <span className="font-bold text-[#123C2A] dark:text-[#6FAF82]">
              {item.modeCasio}
            </span>
            <span>•</span>
            <span className="truncate">{item.sousCategorie}</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                triggerHaptic('light');
                toggleFavorite(item.id);
              }}
              className="p-2 min-w-[36px] min-h-[36px] flex items-center justify-center rounded-xl text-[#63736B] dark:text-[#879890] hover:bg-[#EEF2ED] dark:hover:bg-[#1D3028] transition-colors active:scale-90"
              aria-label={bookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
            >
              <Heart
                className={`w-5 h-5 ${
                  bookmarked
                    ? 'fill-[#123C2A] text-[#123C2A] dark:fill-[#58D68D] dark:text-[#58D68D]'
                    : ''
                }`}
              />
            </button>
          </div>
        </header>

        {/* Scrollable Tutorial Content Body */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 max-w-2xl w-full mx-auto space-y-5 overscroll-contain pb-32">
          
          {/* Title and description */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#123C2A] dark:text-[#6FAF82] bg-[#EEF2ED] dark:bg-[#1A3326] px-2 py-0.5 rounded-md">
                Première S2
              </span>
              <span className="text-xs text-[#7A8C82] dark:text-[#8EA397]">
                • {item.niveau}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#173126] dark:text-white leading-tight">
              {item.nom}
            </h1>
            <p className="mt-2 text-sm sm:text-base text-[#52645B] dark:text-[#A1B8AA] leading-relaxed">
              {item.description}
            </p>
          </div>

          {/* Mode Switcher */}
          <div data-tour="mode-selector" className="flex p-1 bg-[#EEF2ED] dark:bg-[#1A2D23] rounded-2xl border border-[#E2E8E3] dark:border-[#264435]">
            <button
              onClick={() => {
                triggerHaptic('selection');
                soundManager.playOptionToggle(false);
                setActiveMode('step');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-semibold rounded-xl transition-all ${
                activeMode === 'step'
                  ? 'bg-white dark:bg-[#254234] text-[#123C2A] dark:text-white shadow-xs font-bold'
                  : 'text-[#63736B] dark:text-[#879890]'
              }`}
            >
              <ListOrdered className="w-4 h-4" />
              <span>Mode Pas à Pas</span>
            </button>
            
            <button
              onClick={() => {
                triggerHaptic('medium');
                soundManager.playOptionToggle(true);
                setActiveMode('fast');
              }}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 text-xs sm:text-sm font-bold rounded-xl transition-all bg-[#123C2A] text-white dark:bg-[#58D68D] dark:text-[#0C1813] shadow-xs active:scale-95"
            >
              <Zap className="w-4 h-4" />
              <span>Mode Rapide</span>
            </button>
          </div>

          {/* Sélecteur d'Angle Automatique Degré / Radian */}
          {isTrigOrAnalysis && (
            <div className="p-4 rounded-2xl bg-[#F0FDF4] dark:bg-[#11271D] border border-[#BBF7D0] dark:border-[#1E4D35] space-y-2.5 shadow-2xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#166534] dark:text-[#58D68D]">
                  <Compass className="w-4 h-4" />
                  <span>Vérificateur d'Unité d'Angle fx-991ES</span>
                </div>
                <div className="flex items-center gap-1 bg-white/70 dark:bg-[#183325] p-1 rounded-xl border border-[#BBF7D0] dark:border-[#1E4D35]">
                  <button
                    onClick={() => handleToggleAngle('D')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all active:scale-95 ${
                      angleMode === 'D'
                        ? 'bg-[#15803D] text-white shadow-xs'
                        : 'text-[#166534] dark:text-[#8BA897]'
                    }`}
                  >
                    [D] Degré
                  </button>
                  <button
                    onClick={() => handleToggleAngle('R')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all active:scale-95 ${
                      angleMode === 'R'
                        ? 'bg-[#15803D] text-white shadow-xs'
                        : 'text-[#166534] dark:text-[#8BA897]'
                    }`}
                  >
                    [R] Radian
                  </button>
                </div>
              </div>

              <p className="text-xs text-[#14532D] dark:text-[#A7F3D0] leading-relaxed">
                {angleMode === 'D' ? (
                  <>
                    Mode <strong>Degré [D]</strong> actif (géométrie, triangles). Pour régler votre Casio :{' '}
                    <span className="font-mono font-bold">SHIFT → MODE → 3</span>
                  </>
                ) : (
                  <>
                    Mode <strong>Radian [R]</strong> actif (dérivées, analyse, $sin(x)$). Pour régler votre Casio :{' '}
                    <span className="font-mono font-bold">SHIFT → MODE → 4</span>
                  </>
                )}
              </p>
            </div>
          )}

          {/* Step-by-Step Card avec Support Gestuel Swipe Gauche/Droite */}
          <section
            onTouchStart={handleStepTouchStart}
            onTouchEnd={handleStepTouchEnd}
            className="bg-white dark:bg-[#16291F] border border-[#E2E8E3] dark:border-[#254234] rounded-3xl p-5 space-y-4 shadow-sm select-none"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#63736B] dark:text-[#879890] border-b border-[#EEF2ED] dark:border-[#254234] pb-3">
              <span className="font-bold text-[#123C2A] dark:text-[#58D68D]">
                Étape {currentStep.stepNumber} sur {totalSteps}
              </span>
              <span className="text-[11px] opacity-75">Glisser ◀ ▶ pour changer</span>
            </div>

            {/* Step Title & Instruction */}
            <div>
              <h3 className="text-base sm:text-lg font-bold text-[#173126] dark:text-white">
                {currentStep.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#52645B] dark:text-[#A1B8AA] mt-1.5 leading-relaxed">
                {currentStep.action}
              </p>
            </div>

            {/* Visual Keystrokes for this Step */}
            <div className="p-3.5 bg-[#F7F8F4] dark:bg-[#101F17] rounded-2xl border border-[#E2E8E3] dark:border-[#254234]">
              <div className="text-[11px] font-mono text-[#63736B] dark:text-[#879890] mb-2 font-medium">
                Touches à presser sur la calculatrice :
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
                angleMode={angleMode}
                modeIndicator={item.modeCasio.replace(':', '')}
              />
            )}

            {/* Step Annotation Tip */}
            {currentStep.annotation && (
              <p className="text-xs text-[#52645B] dark:text-[#A1B8AA] italic bg-[#EEF2ED]/60 dark:bg-[#1B3527]/40 p-3 rounded-xl border border-[#E2E8E3]/60 dark:border-[#254234]/60">
                💡 {currentStep.annotation}
              </p>
            )}

            {/* Step Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                disabled={currentStepIndex === 0}
                onClick={() => {
                  triggerHaptic('light');
                  soundManager.playTap();
                  setCurrentStepIndex(prev => Math.max(0, prev - 1));
                }}
                className="flex items-center gap-1 px-3.5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-[#EEF2ED] dark:bg-[#1F392B] text-[#123C2A] dark:text-white disabled:opacity-30 disabled:pointer-events-none active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </button>

              {currentStepIndex < totalSteps - 1 ? (
                <button
                  onClick={() => {
                    triggerHaptic('light');
                    soundManager.playStep();
                    setCurrentStepIndex(prev => {
                      const next = Math.min(totalSteps - 1, prev + 1);
                      if (next === totalSteps - 1) {
                        setShowCompletionPopup(true);
                      }
                      return next;
                    });
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-[#123C2A] text-white dark:bg-[#58D68D] dark:text-[#0C1813] shadow-sm active:scale-95 transition-all"
                >
                  Suivant
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    triggerHaptic('medium');
                    soundManager.playSuccess();
                    setShowCompletionPopup(true);
                  }}
                  className="flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold rounded-xl bg-[#123C2A] text-white dark:bg-[#58D68D] dark:text-[#0C1813] shadow-sm active:scale-95 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Terminer
                </button>
              )}
            </div>
          </section>

          {/* Section: Exemple concret & Résultat vérifié */}
          <section className="bg-white dark:bg-[#16291F] border border-[#E2E8E3] dark:border-[#254234] rounded-3xl p-5 space-y-3.5 shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123C2A] dark:text-[#58D68D]">
              Exemple type Première S2
            </h4>
            <div className="text-xs sm:text-sm font-medium text-[#173126] dark:text-white bg-[#EEF2ED] dark:bg-[#101F17] p-3.5 rounded-2xl border border-[#E2E8E3] dark:border-[#254234]">
              {item.exemple.enonce}
            </div>

            <LcdScreen
              expression={item.exemple.entree}
              result={item.exemple.resultatEcran}
              angleMode={angleMode}
              modeIndicator={item.modeCasio.replace(':', '')}
            />

            <div className="text-xs sm:text-sm text-[#52645B] dark:text-[#A1B8AA] leading-relaxed">
              <span className="font-semibold text-[#173126] dark:text-white">
                Interprétation mathématique :
              </span>{' '}
              {item.exemple.interpretation}
            </div>
          </section>

          {/* Section: Conseils de rédaction */}
          {item.redactionConseil && (
            <section className="bg-[#EEF2ED]/70 dark:bg-[#101F17] border border-[#E2E8E3] dark:border-[#254234] rounded-3xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#123C2A] dark:text-[#58D68D]">
                <FileText className="w-4 h-4" />
                <span>Ce qu’il faut rédiger sur ta copie</span>
              </div>
              <p className="text-xs sm:text-sm text-[#52645B] dark:text-[#A1B8AA] leading-relaxed">
                {item.redactionConseil}
              </p>
            </section>
          )}

          {/* Section: Points clés à retenir */}
          <section className="space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#123C2A] dark:text-[#58D68D]">
              À retenir absolument
            </h4>
            <div className="space-y-2">
              {item.aRetenir.map((point, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 text-xs sm:text-sm text-[#173126] dark:text-white bg-white dark:bg-[#16291F] p-3.5 rounded-2xl border border-[#E2E8E3] dark:border-[#254234]"
                >
                  <span className="text-[#123C2A] dark:text-[#58D68D] font-bold">✓</span>
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Erreurs fréquentes Casio */}
          {item.erreursFrequentes.length > 0 && (
            <section className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706] dark:text-[#FBBF24] flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  Pièges & Erreurs fréquentes
                </h4>
                {onOpenErrorDecoder && (
                  <button
                    onClick={() => {
                      triggerHaptic('light');
                      soundManager.playTap();
                      onOpenErrorDecoder();
                    }}
                    className="text-xs font-semibold text-[#123C2A] dark:text-[#58D68D] hover:underline"
                  >
                    Ouvrir le Décodeur ↗
                  </button>
                )}
              </div>
              <div className="space-y-2.5">
                {item.erreursFrequentes.map((err, idx) => (
                  <div
                    key={idx}
                    className="text-xs sm:text-sm bg-white dark:bg-[#16291F] border border-[#E2E8E3] dark:border-[#254234] rounded-2xl p-4 space-y-1.5"
                  >
                    <div className="font-bold text-[#DC2626] dark:text-[#F87171]">
                      Problème : {err.probleme}
                    </div>
                    <div className="text-[#52645B] dark:text-[#A1B8AA]">
                      <span className="font-semibold">Cause :</span> {err.cause}
                    </div>
                    <div className="text-[#123C2A] dark:text-[#58D68D] font-medium pt-1">
                      <span className="font-semibold">Solution :</span> {err.solution}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Section: Astuce */}
          {item.astuces.length > 0 && (
            <section className="bg-[#EEF2ED] dark:bg-[#1B3527]/50 border border-[#E2E8E3] dark:border-[#254234] rounded-3xl p-5 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[#123C2A] dark:text-[#58D68D]">
                <Lightbulb className="w-4 h-4" />
                Astuce calculatrice
              </div>
              {item.astuces.map((tip, idx) => (
                <p key={idx} className="text-xs sm:text-sm text-[#52645B] dark:text-[#A1B8AA] leading-relaxed">
                  {tip}
                </p>
              ))}
            </section>
          )}
        </main>
      </div>

      {/* ========================================================================= */}
      {/* 🌟 POP-UP "MARQUER COMME MAÎTRISÉE" EN BAS DE L'ÉCRAN                     */}
      {/* Apparaît uniquement à la fin du tutoriel ou du Mode Rapide                */}
      {/* ========================================================================= */}
      {showCompletionPopup && (
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 flex justify-center pointer-events-none animate-in slide-in-from-bottom duration-300">
          <div className="w-full max-w-md bg-white dark:bg-[#16291F] border border-[#E2E8E3] dark:border-[#254234] rounded-3xl p-4 sm:p-5 shadow-2xl pointer-events-auto flex flex-col gap-3">
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#DCFCE7] dark:bg-[#064E3B] text-[#15803D] dark:text-[#58D68D] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#123C2A] dark:text-white">
                    Tutoriel terminé !
                  </h4>
                  <p className="text-xs text-[#7A8C82] dark:text-[#8EA397]">
                    Bravo pour votre maîtrise de cette procédure.
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  triggerHaptic('light');
                  setShowCompletionPopup(false);
                }}
                className="p-1.5 rounded-xl text-[#7A8C82] dark:text-[#8EA397] hover:bg-[#EEF2ED] dark:hover:bg-[#1F392B]"
                aria-label="Fermer la notification"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 pt-1">
              <button
                onClick={() => {
                  handleMarkMastered();
                  setShowCompletionPopup(false);
                }}
                className={`flex-1 h-12 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md ${
                  mastered
                    ? 'bg-[#EEF2ED] dark:bg-[#1F392B] text-[#123C2A] dark:text-[#58D68D] border border-[#123C2A]/20'
                    : 'bg-[#123C2A] dark:bg-[#58D68D] text-white dark:text-[#0C1813]'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{mastered ? 'Déjà maîtrisée !' : 'Marquer comme maîtrisée'}</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
