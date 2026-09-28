import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  LayoutGrid,
  Command,
  ArrowLeftRight,
  AlertCircle,
  Download
} from 'lucide-react';
import { ExportKeypadModal } from '../components/ExportKeypadModal';

export const KeypadView: React.FC = () => {
  const { setActiveTab } = useApp();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Cartes conformes aux Captures 2 & 3 de la maquette
  const keyCards = [
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
    }
  ];

  return (
    <div className="space-y-4 pb-24 animate-in fade-in duration-150">
      {/* A. Header avec Retour (Capture 2) */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('explorer')}
            aria-label="Retour à l'explorateur"
            className="w-10 h-10 min-w-[40px] min-h-[40px] rounded-xl bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-center text-[#123C2A] dark:text-white hover:bg-[#EEF4F0] dark:hover:bg-[#193A2E] active:scale-95 transition-all shadow-xs shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <div className="text-[11px] font-mono tracking-wider uppercase text-[#7A8C82] dark:text-[#8EA397]">
              REPÈRES SUR LE CLAVIER
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#123C2A] dark:text-white mt-0.5">
              Les touches
            </h1>
          </div>
        </div>

        {/* Sous-titre exact de la Capture 2 */}
        <p className="text-xs sm:text-sm text-[#5A7365] dark:text-[#8EA397] leading-relaxed">
          Repère les fonctions imprimées sur le clavier de la fx-991ES originale.
        </p>
      </div>

      {/* B. Cartes d’explications des touches (Stack vertical Capture 2) */}
      <div className="space-y-3 pt-1">
        {keyCards.map(card => (
          <div
            key={card.id}
            className="bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-2xl p-4 space-y-3 shadow-xs hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] transition-colors text-left"
          >
            {/* Ligne supérieure : Icône carrée arrondie avec logo + Nom de la touche */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#EEF4F0] dark:bg-[#193A2E] text-[#123C2A] dark:text-[#58D68D] flex items-center justify-center shrink-0">
                {card.iconType === 'grid' && <LayoutGrid className="w-4 h-4" />}
                {card.iconType === 'command' && <Command className="w-4 h-4" />}
                {card.iconType === 'swap' && <ArrowLeftRight className="w-4 h-4" />}
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-[#123C2A] dark:text-white tracking-tight">
                {card.title}
              </h2>
            </div>

            {/* Texte explicatif court */}
            <p className="text-xs sm:text-sm text-[#5A7365] dark:text-[#A5C1B2] leading-relaxed">
              {card.description}
            </p>

            {/* Badge de touche physique */}
            {card.badgeLabel && (
              <div>
                <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg bg-[#E2E8E3] dark:bg-[#1C3B2E] text-[#123C2A] dark:text-white font-mono font-bold text-xs shadow-2xs border border-[#CBD5E1] dark:border-[#25523D]">
                  {card.badgeLabel}
                </span>
              </div>
            )}

            {/* Bloc d’information secondaire / Syntaxe */}
            <div className="p-3 rounded-xl bg-[#F7F8F4] dark:bg-[#0D1E17] border border-[#E2E8E3] dark:border-[#173024] text-xs font-semibold text-[#123C2A] dark:text-white leading-relaxed">
              {card.callout}
            </div>
          </div>
        ))}
      </div>

      {/* C. Bloc d’Avertissement Final « Un point important » (Capture 3) */}
      <div className="space-y-3 pt-3">
        <h2 className="text-base sm:text-lg font-bold text-[#123C2A] dark:text-white px-0.5">
          Un point important
        </h2>

        {/* Encadré d’alerte / attention brun/ambré sombre */}
        <div className="p-4 rounded-2xl bg-[#FFFBEB] dark:bg-[#291E10] border border-[#FDE68A] dark:border-[#422E14] flex items-start gap-3 shadow-xs">
          <AlertCircle className="w-5 h-5 text-[#B45309] dark:text-[#E59838] shrink-0 mt-0.5 stroke-[2.2]" />
          <p className="text-xs sm:text-sm text-[#92400E] dark:text-[#E59838] leading-relaxed font-medium">
            Les fonctions imprimées sur un autre modèle Casio peuvent être différentes. Vérifie le nom fx-991ES sur ta calculatrice avant de suivre une fiche.
          </p>
        </div>
      </div>

      {/* Bouton d'exportation complémentaire en bas */}
      <div className="pt-2">
        <button
          onClick={() => setIsExportModalOpen(true)}
          className="w-full p-4 rounded-2xl bg-white dark:bg-[#132B22] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-between text-left hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] active:scale-[0.99] transition-all shadow-xs group"
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#EEF4F0] dark:bg-[#193A2E] text-[#123C2A] dark:text-[#58D68D] flex items-center justify-center shrink-0">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#123C2A] dark:text-white">
                Exporter la fiche mémo des touches
              </div>
              <div className="text-xs text-[#5A7365] dark:text-[#8EA397]">
                PDF Imprimable A4, Markdown, CSV Excel et JSON
              </div>
            </div>
          </div>
          <span className="text-xs font-bold text-[#123C2A] dark:text-[#58D68D] group-hover:underline">
            Exporter
          </span>
        </button>
      </div>

      {/* Modal d'exportation */}
      <ExportKeypadModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />
    </div>
  );
};
