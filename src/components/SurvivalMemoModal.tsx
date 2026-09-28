import React, { useState, useRef } from 'react';
import { ChevronLeft, Printer, Copy, Check, FileCheck, ShieldAlert, Sparkles } from 'lucide-react';
import { KeyBadge } from './KeyBadge';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';

interface SurvivalMemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SURVIVAL_PROCEDURES = [
  {
    num: 1,
    title: 'Équation du 2nd degré ax² + bx + c = 0',
    touches: ['MODE', '5', '3', 'a', '=', 'b', '=', 'c', '='],
    notes: 'Affiche x₁, x₂, puis Min/Max du sommet de la parabole.'
  },
  {
    num: 2,
    title: 'Nombre dérivé f’(x₀) (pente de la tangente)',
    touches: ['SHIFT', '∫dx', 'Formule', '▶', 'x₀', '='],
    notes: 'Idéal pour vérifier l’équation de tangente y = f’(a)(x-a) + f(a).'
  },
  {
    num: 3,
    title: 'Tableau de valeurs pour tracer f(x)',
    touches: ['MODE', '7', 'Formule', '=', 'Start', '=', 'End', '=', 'Step', '='],
    notes: 'Génère toutes les coordonnées pour tracer la courbe sans erreur.'
  },
  {
    num: 4,
    title: 'Conversion Coordonnées Polaires Pol(x, y)',
    touches: ['SHIFT', '+', 'x', 'SHIFT', ')', 'y', ')', '='],
    notes: 'Donne r = ||u|| et θ = (i, u). X stocke r et Y stocke θ.'
  },
  {
    num: 5,
    title: 'Combinaisons nCr (Dénombrement / Bernoulli)',
    touches: ['n', 'SHIFT', '÷', 'k', '='],
    notes: 'Exemple 5 boules parmi 10 : taper 10 nCr 5 = 252.'
  },
  {
    num: 6,
    title: 'Système 2 équations 2 inconnues',
    touches: ['MODE', '5', '1', 'a₁', '=', 'b₁', '=', 'c₁', '='],
    notes: 'Résout { a₁x + b₁y = c₁ ; a₂x + b₂y = c₂ } instantanément.'
  },
  {
    num: 7,
    title: 'Bascule Fraction ↔ Décimal exacte',
    touches: ['S<=>D'],
    notes: 'Passe de 7/3 à 2.3333333 ou de √2/2 à 0.707106.'
  },
  {
    num: 8,
    title: 'Bascule Unité d’Angle Degré / Radian',
    touches: ['SHIFT', 'MODE', '3 (Deg)', 'ou', 'SHIFT', 'MODE', '4 (Rad)'],
    notes: 'Toujours vérifier [D] pour géométrie, [R] pour trigo analytique.'
  },
  {
    num: 9,
    title: 'Stockage Mémoire & Rappel de constante',
    touches: ['SHIFT', 'RCL', 'A', 'puis', 'RCL', 'A'],
    notes: 'Stocke le résultat exact dans la mémoire A (ou B, C, D, X, Y).'
  },
  {
    num: 10,
    title: 'RESET COMPLET D’EXAMEN (Indispensable)',
    touches: ['SHIFT', '9', '3', '=', 'AC'],
    notes: 'Remet la calculatrice à neuf : efface variables et modes résiduels.'
  }
];

export const SurvivalMemoModal: React.FC<SurvivalMemoModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  // iOS-style edge swipe to go back
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  if (!isOpen) return null;

  const handleCopyText = () => {
    triggerHaptic('medium');
    soundManager.playSuccess();
    const memoText = `=== FICHE MÉMO DE SURVIE JOUR J — CASIO FX-991ES (1ère S2) ===
1. Reset calculatrice : SHIFT 9 3 = AC
2. Équation 2nd degré : MODE 5 3 -> a = b = c =
3. Dérivée f'(x0) : SHIFT ∫dx (formule) ▶ x0 =
4. Tableau de valeurs : MODE 7 -> f(X) -> Start, End, Step
5. Polaires (r, theta) : SHIFT + ( x , y ) =
6. Combinaisons : n SHIFT ÷ k = (nCr)
7. Fraction <-> Décimal : Touche S<=>D
8. Angle : SHIFT MODE 3 (Deg) / SHIFT MODE 4 (Rad)
9. Système 2x2 : MODE 5 1
10. Erreur de syntaxe : Touche ◀ ou ▶ (ne pas faire AC)`;

    navigator.clipboard.writeText(memoText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handlePrint = () => {
    triggerHaptic('light');
    soundManager.playTap();
    window.print();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = e.changedTouches[0].clientX - touchStartXRef.current;
    const diffY = e.changedTouches[0].clientY - touchStartYRef.current;

    // Detect intentional horizontal swipe from left to right
    if (diffX > 75 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      triggerHaptic('light');
      soundManager.playTap();
      onClose();
    }
    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-50 flex flex-col bg-[#F7F8F4] dark:bg-[#0E1914] text-[#173126] dark:text-[#F0F4EF] animate-in slide-in-from-right duration-250 select-none overflow-hidden"
    >
      {/* Seamless header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#F7F8F4]/90 dark:bg-[#0E1914]/90 backdrop-blur-md border-b border-[#E2E8E3] dark:border-[#20362B] pt-safe shrink-0 print:hidden">
        <button
          onClick={() => {
            triggerHaptic('light');
            soundManager.playTap();
            onClose();
          }}
          className="flex items-center gap-1.5 -ml-2 px-2.5 py-1.5 rounded-xl text-[#123C2A] dark:text-[#6FAF82] hover:bg-[#EEF2ED] dark:hover:bg-[#1D3028] transition-colors active:scale-95"
          aria-label="Retour"
        >
          <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          <span className="text-sm font-semibold">Retour</span>
        </button>

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#DCFCE7] dark:bg-[#064E3B] text-[#15803D] dark:text-[#58D68D] flex items-center justify-center font-bold">
            <FileCheck className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#173126] dark:text-white">
            Mémo Jour J (A4)
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyText}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl border border-[#E2E8E3] dark:border-[#264435] bg-white dark:bg-[#1A2C22] text-[#123C2A] dark:text-[#B7C5BE] text-xs font-semibold hover:bg-[#EEF2ED] active:scale-95 transition-all shadow-xs"
            title="Copier le texte récapitulatif"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? 'Copié !' : 'Copier'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#123C2A] text-white dark:bg-[#58D68D] dark:text-[#0C1813] text-xs font-bold shadow-xs active:scale-95 transition-all"
            title="Imprimer au format A4"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Imprimer</span>
          </button>
        </div>
      </header>

      {/* Main printable scrollable content */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 max-w-2xl w-full mx-auto space-y-4 overscroll-contain pb-24 print:p-0 print:overflow-visible">
        
        {/* Top Exam Alert Banner */}
        <div className="p-3.5 bg-[#EEF8F1] dark:bg-[#132A1F] border border-[#C6EAD2] dark:border-[#204E38] rounded-2xl flex items-center justify-between text-xs text-[#175232] dark:text-[#7BDCA0]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span className="font-semibold">Protocole officiel Première S2 Casio fx-991ES</span>
          </div>
          <span className="font-mono text-[11px] bg-white/80 dark:bg-[#0E1914] px-2 py-0.5 rounded-md font-bold">
            Format A4
          </span>
        </div>

        {/* Grid of the 10 procedures */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {SURVIVAL_PROCEDURES.map(proc => (
            <div
              key={proc.num}
              className="bg-white dark:bg-[#16291F] border border-[#E2E8E3] dark:border-[#254234] rounded-2xl p-4 space-y-2.5 shadow-2xs"
            >
              <div className="flex items-start justify-between gap-2">
                <h4 className="text-xs font-bold text-[#173126] dark:text-white leading-snug">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#123C2A] text-white dark:bg-[#58D68D] dark:text-[#0C1813] text-[10px] font-mono mr-1.5 font-bold">
                    {proc.num}
                  </span>
                  {proc.title}
                </h4>
              </div>

              {/* Key sequence badges */}
              <div className="flex items-center gap-1 flex-wrap p-2 bg-[#F7F8F4] dark:bg-[#101F17] rounded-xl border border-[#E2E8E3] dark:border-[#254234]">
                {proc.touches.map((k, i) => (
                  <KeyBadge
                    key={i}
                    label={k}
                    size="sm"
                    showConnector={i < proc.touches.length - 1}
                  />
                ))}
              </div>

              <p className="text-[11px] text-[#63736B] dark:text-[#9FB7A8] leading-tight">
                {proc.notes}
              </p>
            </div>
          ))}
        </div>

        {/* Golden Exam Rules Bottom Box */}
        <div className="p-4 rounded-3xl bg-[#FFFBEB] dark:bg-[#2A240E] border border-[#FDE68A] dark:border-[#785E12] space-y-2 text-xs text-[#78350F] dark:text-[#FDE68A]">
          <div className="font-bold flex items-center gap-1.5 text-[#B45309] dark:text-[#FBBF24]">
            <ShieldAlert className="w-4 h-4" />
            <span>3 Réflexes Décisifs le Jour J :</span>
          </div>
          <ul className="space-y-1.5 pl-4 list-disc text-xs leading-relaxed">
            <li><strong>Jamais de calculatrice éteinte avec ON :</strong> Pour repartir sur un calcul propre sans effacer l’historique, tapez <code>[AC]</code>.</li>
            <li><strong>Erreur de saisie :</strong> En cas de <code>Syntax ERROR</code>, pressez <code>[◀]</code> pour sauter directement sur le caractère faux.</li>
            <li><strong>Degré vs Radian :</strong> Regardez l'indicateur noir <code>[D]</code> ou <code>[R]</code> en haut de l'écran avant de calculer une valeur trigonométrique !</li>
          </ul>
        </div>

      </main>
    </div>
  );
};
