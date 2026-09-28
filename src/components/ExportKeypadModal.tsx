import React, { useState } from 'react';
import { X, Printer, FileText, Table, Check, Download } from 'lucide-react';
import {
  exportAsMarkdown,
  exportAsCsv,
  printKeypadMemo
} from '../utils/exportKeypad';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';

interface ExportKeypadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportKeypadModal: React.FC<ExportKeypadModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAction = (type: string, action: () => void) => {
    triggerHaptic('medium');
    soundManager.playSuccess();
    action();
    setDownloadSuccess(type);
    setTimeout(() => {
      setDownloadSuccess(null);
    }, 2500);
  };

  const exportOptions = [
    {
      id: 'pdf',
      title: 'Fiche Mémo Imprimable / PDF',
      badge: 'Format A4 Haute Définition',
      description: 'Mise en page vectorielle optimisée pour l’impression directe ou la sauvegarde en PDF avec typographie soignée, en-tête officiel et tableau récapitulatif des touches.',
      icon: <Printer className="w-5 h-5" />,
      actionText: 'Imprimer / Sauvegarder en PDF',
      colorClass: 'bg-[#123C2A] text-white hover:bg-[#1B4E38]',
      onTrigger: printKeypadMemo
    },
    {
      id: 'markdown',
      title: 'Fiche Markdown Structurée (.md)',
      badge: 'Obsidian · Notion · GitHub',
      description: 'Document texte complet avec tableaux Markdown de toutes les touches, fonctions secondaires SHIFT, tertiaires ALPHA et modes de travail.',
      icon: <FileText className="w-5 h-5" />,
      actionText: 'Télécharger le fichier .md',
      colorClass: 'bg-[#EEF4F0] dark:bg-[#1B382B] text-[#123C2A] dark:text-[#57B88A] hover:bg-[#E0EBE4] dark:hover:bg-[#234C3A]',
      onTrigger: exportAsMarkdown
    },
    {
      id: 'csv',
      title: 'Tableau Excel / CSV (.csv)',
      badge: 'Excel · Apple Numbers · Google Sheets',
      description: 'Fichier tableur encodé en UTF-8 avec BOM garantissant un affichage parfait de tous les accents français dans Excel et Numbers.',
      icon: <Table className="w-5 h-5" />,
      actionText: 'Télécharger le fichier .csv',
      colorClass: 'bg-[#EEF4F0] dark:bg-[#1B382B] text-[#123C2A] dark:text-[#57B88A] hover:bg-[#E0EBE4] dark:hover:bg-[#234C3A]',
      onTrigger: exportAsCsv
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[90vh] flex flex-col bg-[#F7F8F4] dark:bg-[#0E1B15] rounded-3xl border border-[#E2E8E3] dark:border-[#1F3C2F] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-[#E2E8E3] dark:border-[#1F3C2F] bg-white dark:bg-[#12241C] shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5A7365] dark:text-[#8EA397]">
                EXPORTATION HAUTE FIDÉLITÉ
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-0.5 text-[#123C2A] dark:text-white">
                Exporter les touches fx-991ES
              </h2>
            </div>

            <button
              onClick={() => {
                triggerHaptic('light');
                soundManager.playTap();
                onClose();
              }}
              aria-label="Fermer"
              className="w-9 h-9 rounded-xl bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-center text-[#5A7365] dark:text-[#8EA397] hover:text-[#123C2A] dark:hover:text-white active:scale-95 transition-all shadow-xs shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Options list */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3.5">
          {exportOptions.map(opt => {
            const isSuccess = downloadSuccess === opt.id;
            return (
              <div
                key={opt.id}
                className="p-4 rounded-2xl border border-[#E2E8E3] dark:border-[#1F3C2F] bg-white dark:bg-[#142920] hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] transition-all space-y-2.5 shadow-xs"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] border border-[#E2E8E3] dark:border-[#234535] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center shrink-0">
                    {opt.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm sm:text-base font-bold text-[#123C2A] dark:text-white leading-tight">
                      {opt.title}
                    </h3>
                    <div className="mt-1">
                      <span className="inline-block text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md bg-[#EEF4F0] dark:bg-[#1B382B] text-[#123C2A] dark:text-[#A5C1B2] border border-[#DCE5DF] dark:border-[#244F3C]">
                        {opt.badge}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-[#5A7365] dark:text-[#8EA397] leading-relaxed">
                  {opt.description}
                </p>

                <button
                  onClick={() => handleAction(opt.id, opt.onTrigger)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-xs ${
                    isSuccess ? 'bg-[#15803D] text-white' : opt.colorClass
                  }`}
                >
                  {isSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Téléchargé avec succès !</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>{opt.actionText}</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
