import React, { useState, useRef } from 'react';
import { ChevronLeft, AlertOctagon, HelpCircle, CheckCircle, Sparkles } from 'lucide-react';
import { KeyBadge } from './KeyBadge';
import { LcdScreen } from './LcdScreen';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';

export interface CasioErrorInfo {
  code: string;
  titre: string;
  causesFrequentes: string[];
  astuceOr: string;
  solutionTouches: string[];
  exempleFaux: string;
  exempleCorrige: string;
  explicationS2: string;
}

const CASIO_ERRORS: CasioErrorInfo[] = [
  {
    code: 'Syntax ERROR',
    titre: 'Erreur de Syntaxe de Calcul',
    causesFrequentes: [
      'Parenthèse ouverte non fermée (ex: √(25+9 sans fermer)',
      'Deux opérations consécutives (ex: 5 ++ 2 ou 8 × ÷ 3)',
      'Utilisation de la virgule décimale [,] au lieu du point décimal [.]',
      'Signe moins de soustraction [-] au lieu du signe d’opposé [(-)] devant un nombre'
    ],
    astuceOr: 'NE PRESSE PAS [AC] ! Appuie directement sur la flèche [◀] ou [▶]. La Casio positionne instantanément le curseur pile sur le symbole fautif.',
    solutionTouches: ['◀', 'DEL', 'corriger', '='],
    exempleFaux: '3 × ÷ 5  ou  √25 + 16)',
    exempleCorrige: '3 × 5  ou  √(25 + 16)',
    explicationS2: 'Très fréquent lors de la saisie rapide des formules de barycentre, dérivées rationnelles (u/v) ou trinômes.'
  },
  {
    code: 'Math ERROR',
    titre: 'Erreur Mathématique (Hors Domaine)',
    causesFrequentes: [
      'Division par zéro (ex: dénominateur nul dans une fraction rationnelle)',
      'Racine carrée d’un nombre strictement négatif en mode réel standard (COMP)',
      'Logarithme ou ln d’un nombre ≤ 0 (ex: ln(-3) ou ln(0))',
      'Tan(90°) ou Tan(π/2) car la tangente y est indéfinie',
      'nCr ou nPr avec r > n ou nombres négatifs/décimaux'
    ],
    astuceOr: 'Appuie sur [◀] ou [▶] pour vérifier tes parenthèses sous la racine ou au dénominateur. En mode équation MODE 5 3, si Math ERROR apparaît, l’équation n’a pas de solution réelle (Δ < 0).',
    solutionTouches: ['◀', 'Vérifier dénominateur', 'MODE', '1'],
    exempleFaux: '1 / (3 - 3)  ou  √(-16) en mode COMP',
    exempleCorrige: 'Vérifier la valeur interdite avant de diviser',
    explicationS2: 'En 1ère S2, quand ton discriminant Δ < 0 et que tu tentes de calculer √Δ, la Casio affiche Math ERROR. Pour les complexes en Tale, ce sera MODE 2.'
  },
  {
    code: 'Stack ERROR',
    titre: 'Dépassement de la Pile de Calcul',
    causesFrequentes: [
      'Trop de niveaux de parenthèses imbriquées (la Casio supporte jusqu’à 24 niveaux de calcul et 10 niveaux de parenthèses)',
      'Formules géantes répétées dans les sommes ou solveur'
    ],
    astuceOr: 'Découpe ton calcul en 2 étapes ! Calcule la partie centrale, appuie sur [=], puis réutilise le résultat avec la touche magique [Ans] ou stocke dans [STO] [A].',
    solutionTouches: ['AC', 'Calcul partiel', '=', 'Ans', 'Suite calcul'],
    exempleFaux: '((((((2+3)×4)+5)×6)... trop imbriqué)',
    exempleCorrige: 'Calculer le numérateur, faire = puis diviser par le dénominateur',
    explicationS2: 'Classique lors du calcul des formules d’écart-type ou de probabilités composées.'
  },
  {
    code: 'Argument ERROR',
    titre: 'Erreur d’Argument dans une Fonction',
    causesFrequentes: [
      'Argument incorrect passé à RanInt#(a,b) où a > b',
      'Valeur décimale entrée dans une fonction exigeant un entier naturel',
      'Coordonnées Pol(r,θ) ou Rec(x,y) mal séparées par la virgule de séparation [SHIFT] [, ]'
    ],
    astuceOr: 'Vérifie que la virgule utilisée pour séparer deux arguments est bien la virgule jaune obtenue via [SHIFT] [ ) ] (virgule de séparation) et non le point décimal [.]',
    solutionTouches: ['SHIFT', ')', 'Entier', '='],
    exempleFaux: 'RanInt#(10, 2)  (min > max)',
    exempleCorrige: 'RanInt#(2, 10)  (min < max)',
    explicationS2: 'Survient lors des simulations d’épreuves de Bernoulli ou conversion cartésien ↔ polaire.'
  },
  {
    code: 'Dimension ERROR',
    titre: 'Erreur de Dimension (Matrices / Vecteurs)',
    causesFrequentes: [
      'Tentative d’additionner deux matrices de dimensions différentes',
      'Multiplication MatA × MatB où le nombre de colonnes de A ≠ nombre de lignes de B',
      'Produit scalaire de vecteurs de dimensions différentes (2D vs 3D)'
    ],
    astuceOr: 'Vérifie les dimensions configurées dans [SHIFT] [4] (MATRIX) ou [SHIFT] [5] (VECTOR) en choisissant [2] (Data).',
    solutionTouches: ['SHIFT', '4', '2', 'Dimensions'],
    exempleFaux: 'MatA (2×3) × MatB (2×2)',
    exempleCorrige: 'MatA (2×3) × MatB (3×2)',
    explicationS2: 'En géométrie vectorielle de l’espace (MODE 8), assure-toi que VctA et VctB sont tous deux en 3 dimensions.'
  },
  {
    code: 'Time Out ERROR',
    titre: 'Temps de Calcul Dépassé',
    causesFrequentes: [
      'Calcul d’intégrale définie [∫] avec fonction hautement oscillante',
      'Résolution d’équation non linéaire via [SHIFT] [CALC] (SOLVE) sans valeur initiale proche'
    ],
    astuceOr: 'Donne une estimation initiale à SOLVE proche de la solution attendue au lieu de laisser 0, ou augmente la tolérance dans le calcul d’intégrale.',
    solutionTouches: ['SHIFT', 'CALC', 'Entrer estimation', '='],
    exempleFaux: 'Résoudre cos(x)=0 avec valeur initiale x=1000',
    exempleCorrige: 'Résoudre avec estimation initiale x=1.5',
    explicationS2: 'Fréquent en analyse lors de la recherche des racines d’équations trigonométriques.'
  }
];

interface ErrorDecoderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ErrorDecoderModal: React.FC<ErrorDecoderModalProps> = ({ isOpen, onClose }) => {
  const [selectedErrorCode, setSelectedErrorCode] = useState<string>('Syntax ERROR');

  // iOS-style edge swipe to go back
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  if (!isOpen) return null;

  const currentError = CASIO_ERRORS.find(e => e.code === selectedErrorCode) || CASIO_ERRORS[0];

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
      soundManager.playModalClose();
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
      {/* Full-width seamless iOS header */}
      <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 bg-[#F7F8F4]/90 dark:bg-[#0E1914]/90 backdrop-blur-md border-b border-[#E2E8E3] dark:border-[#20362B] pt-safe shrink-0">
        <button
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

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-[#FEE2E2] dark:bg-[#7F1D1D]/40 text-[#DC2626] dark:text-[#F87171] flex items-center justify-center font-bold">
            <AlertOctagon className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs sm:text-sm font-bold text-[#173126] dark:text-white">
            Décodeur d'Erreurs
          </span>
        </div>

        <div className="w-14" />
      </header>

      {/* Horizontal Error Pills Selector */}
      <div className="px-4 sm:px-6 py-2.5 bg-[#EEF2ED]/70 dark:bg-[#13241C] border-b border-[#E2E8E3] dark:border-[#20362B] overflow-x-auto flex items-center gap-2 no-scrollbar shrink-0">
        {CASIO_ERRORS.map(err => {
          const isSelected = err.code === selectedErrorCode;
          return (
            <button
              key={err.code}
              onClick={() => {
                triggerHaptic('selection');
                soundManager.playOptionToggle(true);
                setSelectedErrorCode(err.code);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all select-none active:scale-95 ${
                isSelected
                  ? 'bg-[#123C2A] text-white dark:bg-[#58D68D] dark:text-[#0C1813] font-bold shadow-xs'
                  : 'bg-white dark:bg-[#1B3226] text-[#55695E] dark:text-[#A1B3A9] border border-[#E2E8E3] dark:border-[#264435] hover:bg-[#F2F5F1]'
              }`}
            >
              {err.code}
            </button>
          );
        })}
      </div>

      {/* Scrollable details */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 max-w-2xl w-full mx-auto space-y-4 overscroll-contain pb-24">
        
        {/* LCD Simulator Preview */}
        <div className="space-y-1.5">
          <span className="text-xs font-mono text-[#63736B] dark:text-[#879890]">
            Affichage écran calculatrice :
          </span>
          <LcdScreen
            expression={currentError.exempleFaux}
            result={currentError.code}
            modeIndicator="COMP"
          />
        </div>

        {/* ASTUCE D'OR : Golden Tip */}
        <div className="p-4 rounded-3xl bg-[#FFFBEB] dark:bg-[#2A240E] border border-[#FDE68A] dark:border-[#785E12] space-y-2 shadow-xs">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#B45309] dark:text-[#FBBF24]">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Règle d'or fx-991ES : Récupérer son calcul sans tout perdre</span>
          </div>
          <p className="text-xs sm:text-sm text-[#78350F] dark:text-[#FDE68A] leading-relaxed">
            {currentError.astuceOr}
          </p>
        </div>

        {/* Causes fréquentes en S2 */}
        <div className="bg-white dark:bg-[#16291F] p-4 sm:p-5 rounded-3xl border border-[#E2E8E3] dark:border-[#254234] space-y-2.5 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#123C2A] dark:text-[#58D68D] flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            Pourquoi ce message s'affiche :
          </h4>
          <ul className="space-y-2">
            {currentError.causesFrequentes.map((cause, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#2D3E35] dark:text-[#D1DDD6]">
                <span className="text-[#DC2626] dark:text-[#F87171] font-bold">•</span>
                <span>{cause}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Solution & Touches de secours */}
        <div className="bg-white dark:bg-[#16291F] p-4 sm:p-5 rounded-3xl border border-[#E2E8E3] dark:border-[#254234] space-y-3 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#123C2A] dark:text-[#58D68D] flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Séquence de touches recommandée :
          </h4>
          <div className="flex items-center gap-1.5 flex-wrap p-3 bg-[#F7F8F4] dark:bg-[#101F17] rounded-2xl border border-[#E2E8E3] dark:border-[#254234]">
            {currentError.solutionTouches.map((key, idx) => (
              <KeyBadge
                key={idx}
                label={key}
                size="md"
                showConnector={idx < currentError.solutionTouches.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Focus Spécial Première S2 */}
        <div className="p-4 bg-[#EEF2ED] dark:bg-[#101F17] rounded-2xl border border-[#E2E8E3] dark:border-[#254234] text-xs sm:text-sm text-[#55695E] dark:text-[#9FB7A8] leading-relaxed">
          <span className="font-semibold text-[#123C2A] dark:text-[#58D68D]">Impact en épreuve de S2 : </span>
          {currentError.explicationS2}
        </div>

      </main>
    </div>
  );
};
