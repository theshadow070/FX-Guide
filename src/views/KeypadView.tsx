import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  LayoutGrid,
  Command,
  ArrowLeftRight,
  AlertCircle,
  Download,
  Share2,
  Sparkles,
  Search,
  BookOpen,
  Check
} from 'lucide-react';
import { ExportKeypadModal } from '../components/ExportKeypadModal';
import { CASIO_KEYPAD_KEYS } from '../data/keypadData';
import { KeypadKeyInfo } from '../types';

export const KeypadView: React.FC = () => {
  const { setActiveTab } = useApp();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<KeypadKeyInfo | null>(null);
  const [searchFilter, setSearchFilter] = useState('');

  // Repères majeurs imprimés sur la calculatrice (conformes aux captures d'écran de la maquette)
  const landmarkCards = [
    {
      id: 'mode',
      title: 'MODE',
      description: 'Affiche les modes de calcul. Le chiffre choisi correspond à un mode précis.',
      badgeLabel: 'MODE',
      iconType: 'grid',
      callout: '1 COMP · 2 CMPLX · 3 STAT · 4 BASE-N · 5 EQN · 6 MATRIX · 7 TABLE · 8 VECTOR'
    },
    {
      id: 'shift',
      title: 'SHIFT',
      description: 'Active la fonction secondaire imprimée en jaune au-dessus d’une touche.',
      badgeLabel: 'SHIFT',
      iconType: 'command',
      callout: 'Appuie sur SHIFT en premier, puis sur la touche concernée.'
    },
    {
      id: 'alpha',
      title: 'ALPHA',
      description: 'Saisit le symbole ou la variable imprimé en rouge sur une touche.',
      badgeLabel: 'ALPHA',
      iconType: 'command',
      callout: 'Appuie sur ALPHA en premier, puis sur la touche concernée.'
    },
    {
      id: 'sd',
      title: 'S ⇔ D',
      description: 'Bascule entre une forme exacte et une écriture décimale lorsqu’elle est disponible.',
      badgeLabel: 'S ⇔ D',
      iconType: 'swap',
      callout: 'Essaie-la après avoir affiché un résultat.'
    },
    {
      id: 'trig',
      title: 'sin · cos · tan',
      description: 'Fonctions trigonométriques. La touche secondaire donne la fonction inverse.',
      badgeLabel: 'sin',
      iconType: 'command',
      callout: 'Contrôle toujours l’indicateur D, R ou G avant un calcul d’angle.'
    },
    {
      id: 'drg',
      title: 'D · R · G',
      description: 'Indicateur à l’écran de l’unité d’angle actuellement sélectionnée.',
      badgeLabel: null,
      iconType: 'command',
      callout: 'D = degrés · R = radians · G = grades.'
    },
    {
      id: 'calc',
      title: 'CALC · SOLVE',
      description: 'Évalue une formule pour une valeur de variable, ou résout une équation quelconque.',
      badgeLabel: 'CALC',
      iconType: 'grid',
      callout: 'SHIFT CALC lance le solveur universel (SOLVE).'
    },
    {
      id: 'derivee',
      title: 'd/dx · ∫dx',
      description: 'Calcule une dérivée numérique f’(a) ou une intégrale définie exacte.',
      badgeLabel: '∫dx',
      iconType: 'command',
      callout: 'SHIFT ∫dx insère d/dx( pour dériver numériquement en un point.'
    },
    {
      id: 'memoire',
      title: 'STO · RCL',
      description: 'Stockage et rappel des 9 mémoires variables (A, B, C, D, E, F, X, Y, M).',
      badgeLabel: 'RCL',
      iconType: 'swap',
      callout: 'SHIFT RCL (STO) suivi de la lettre pour sauvegarder un nombre.'
    }
  ];

  const filteredLandmarks = landmarkCards.filter(c =>
    c.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.description.toLowerCase().includes(searchFilter.toLowerCase()) ||
    c.callout.toLowerCase().includes(searchFilter.toLowerCase())
  );

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-150">
      {/* 1. Header supérieur conforme à la maquette */}
      <div className="flex items-start justify-between gap-3 pt-1">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            aria-label="Retour à l'accueil"
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-center text-[#123C2A] dark:text-white hover:bg-[#EEF4F0] dark:hover:bg-[#1A3429] active:scale-95 transition-all shadow-xs"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="text-[11px] font-mono font-bold tracking-wider uppercase text-[#5A7365] dark:text-[#8EA397]">
              REPÈRES SUR LE CLAVIER
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#123C2A] dark:text-white mt-0.5">
              Les touches
            </h1>
          </div>
        </div>

        {/* Bouton Exporter haute définition */}
        <button
          onClick={() => setIsExportModalOpen(true)}
          className="h-10 px-3 rounded-xl bg-[#123C2A] dark:bg-[#1B382B] text-white dark:text-[#57B88A] border border-[#123C2A] dark:border-[#26533F] flex items-center gap-1.5 text-xs font-bold hover:bg-[#1B4E38] dark:hover:bg-[#234C3A] active:scale-95 transition-all shadow-xs shrink-0"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Exporter</span>
        </button>
      </div>

      {/* Description du guide des touches */}
      <p className="text-xs sm:text-sm text-[#5A7365] dark:text-[#8EA397] leading-relaxed">
        Repère les fonctions imprimées sur le clavier de la fx-991ES originale.
      </p>

      {/* Barre de filtre rapide */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8C82] dark:text-[#8EA397]" />
        <input
          type="search"
          value={searchFilter}
          onChange={e => setSearchFilter(e.target.value)}
          placeholder="Filtrer une touche (MODE, SHIFT, ALPHA, S⇔D...)"
          className="w-full h-10 pl-10 pr-4 text-xs sm:text-sm bg-white dark:bg-[#10221A] text-[#123C2A] dark:text-white placeholder-[#7A8C82] dark:placeholder-[#8EA397] rounded-xl border border-[#E2E8E3] dark:border-[#1E3A2D] focus:outline-none focus:border-[#123C2A] dark:focus:border-[#57B88A] shadow-xs"
        />
      </div>

      {/* 2. Liste des cartes de touches conformes aux captures 1 & 2 de la maquette */}
      <div className="space-y-3 pt-1">
        {filteredLandmarks.map(card => {
          return (
            <div
              key={card.id}
              className="bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 space-y-3 shadow-xs hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] transition-colors"
            >
              {/* Entête de carte : Icône + Titre */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center shrink-0">
                  {card.iconType === 'grid' && <LayoutGrid className="w-4 h-4" />}
                  {card.iconType === 'command' && <Command className="w-4 h-4" />}
                  {card.iconType === 'swap' && <ArrowLeftRight className="w-4 h-4" />}
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-[#123C2A] dark:text-white tracking-tight">
                  {card.title}
                </h2>
              </div>

              {/* Description */}
              <p className="text-xs text-[#5A7365] dark:text-[#A5C1B2] leading-relaxed">
                {card.description}
              </p>

              {/* Badge de touche physique si présent */}
              {card.badgeLabel && (
                <div>
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-[#E2E8E3] dark:bg-[#1C3B2D] text-[#123C2A] dark:text-[#57B88A] font-mono font-bold text-xs shadow-2xs border border-[#CBD5E1] dark:border-[#25523D]">
                    {card.badgeLabel}
                  </span>
                </div>
              )}

              {/* Boîte d'indication inférieure conforme à la maquette */}
              <div className="p-3 rounded-xl bg-[#F7F8F4] dark:bg-[#0D1D16] border border-[#E2E8E3] dark:border-[#173024] text-xs font-medium text-[#123C2A] dark:text-[#D1E0D7] leading-relaxed">
                {card.callout}
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Section « Un point important » conforme à la Capture 3 de la maquette */}
      <div className="space-y-3 pt-3">
        <h2 className="text-base sm:text-lg font-bold text-[#123C2A] dark:text-white px-0.5">
          Un point important
        </h2>

        {/* Encadré d'avertissement ambre conforme */}
        <div className="p-4 rounded-2xl bg-[#FFFBEB] dark:bg-[#282112] border border-[#FDE68A] dark:border-[#4D3A1B] flex items-start gap-3 shadow-xs">
          <div className="text-[#B45309] dark:text-[#E59838] shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5 stroke-[2.2]" />
          </div>
          <p className="text-xs sm:text-sm text-[#92400E] dark:text-[#E59838] leading-relaxed font-medium">
            Les fonctions imprimées sur un autre modèle Casio peuvent être différentes. Vérifie le nom fx-991ES sur ta calculatrice avant de suivre une fiche.
          </p>
        </div>
      </div>

      {/* 4. Barre d'action d'exportation en bas de page */}
      <div className="pt-2">
        <button
          onClick={() => setIsExportModalOpen(true)}
          className="w-full p-4 rounded-2xl bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-between text-left hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] active:scale-[0.99] transition-all shadow-xs group"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#123C2A] dark:bg-[#1B3B2D] text-white dark:text-[#57B88A] flex items-center justify-center shrink-0">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#123C2A] dark:text-white">
                Exporter la fiche mémo des touches
              </div>
              <div className="text-xs text-[#5A7365] dark:text-[#8EA397]">
                PDF Imprimable A4, Markdown (.md), Excel (.csv) et JSON
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-[#123C2A] dark:text-[#57B88A] group-hover:underline">
            Exporter
          </span>
        </button>
      </div>

      {/* Modal d'exportation avec multiples formats */}
      <ExportKeypadModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};
