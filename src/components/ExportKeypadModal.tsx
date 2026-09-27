import React, { useState } from 'react';
import { X, Printer, FileText, Table, Code2, Check, Download } from 'lucide-react';
import {
  exportAsMarkdown,
  exportAsCsv,
  exportAsJson,
  printKeypadMemo
} from '../utils/exportKeypad';

interface ExportKeypadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportKeypadModal: React.FC<ExportKeypadModalProps> = ({ isOpen, onClose }) => {
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAction = (type: string, action: () => void) => {
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
    },
    {
      id: 'json',
      title: 'Données Structurées (.json)',
      badge: 'Format Développeur & Données',
      description: 'Structure complète des 40+ touches, modes Casio et registres mémoires formatée en JSON indenté.',
      icon: <Code2 className="w-5 h-5" />,
      actionText: 'Télécharger le fichier .json',
      colorClass: 'bg-[#EEF4F0] dark:bg-[#1B382B] text-[#123C2A] dark:text-[#57B88A] hover:bg-[#E0EBE4] dark:hover:bg-[#234C3A]',
      onTrigger: exportAsJson
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center items-center bg-black/80 backdrop-blur-md transition-opacity animate-in fade-in duration-150">
      {/* Clic sur le fond pour fermer */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-label="Fermer la fenêtre d'exportation"
      />

      {/* Conteneur du modal / feuille native */}
      <div className="relative w-full max-w-lg bg-[#F7F8F4] dark:bg-[#0D1D16] border-t sm:border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[88vh] overflow-hidden z-10 animate-in slide-in-from-bottom duration-200 text-[#123C2A] dark:text-[#F1F5F2] transition-colors">
        {/* Poignée de glissement sur mobile */}
        <div className="w-12 h-1 bg-[#CBD5E1] dark:bg-[#2C4439] rounded-full mx-auto mt-2.5 shrink-0 sm:hidden" />

        {/* 1. Header FIXE - Toujours parfaitement visible sans chevauchement */}
        <div className="px-5 pt-3 pb-3 border-b border-[#E2E8E3] dark:border-[#1F3C2F] shrink-0 bg-[#F7F8F4] dark:bg-[#0D1D16]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#123C2A] dark:bg-[#57B88A]" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5A7365] dark:text-[#8EA397]">
                  EXPORTATION HAUTE FIDÉLITÉ
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1 text-[#123C2A] dark:text-white">
                Exporter les touches fx-991ES
              </h2>
              <p className="text-xs text-[#5A7365] dark:text-[#8EA397] mt-0.5">
                Choisis ton format pour réviser, imprimer ou archiver.
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Fermer"
              className="w-9 h-9 rounded-xl bg-white dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-center text-[#5A7365] dark:text-[#8EA397] hover:text-[#123C2A] dark:hover:text-white active:scale-95 transition-all shadow-xs shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 2. Corps DÉFILABLE - Les options ne coupent jamais et restent lisibles */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-5 py-4 space-y-3.5">
          {exportOptions.map(opt => {
            const isSuccess = downloadSuccess === opt.id;
            return (
              <div
                key={opt.id}
                className="p-4 rounded-2xl border border-[#E2E8E3] dark:border-[#1F3C2F] bg-white dark:bg-[#142920] hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] transition-all space-y-2.5 shadow-xs"
              >
                {/* En-tête de carte avec icône, titre et badge horizontal */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#EEF4F0] dark:bg-[#1B3B2D] border border-[#E2E8E3] dark:border-[#234535] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center shrink-0 shadow-2xs">
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

                {/* Description de l'option */}
                <p className="text-xs text-[#5A7365] dark:text-[#8EA397] leading-relaxed">
                  {opt.description}
                </p>

                {/* Bouton d'action pleine largeur pour un clic facile et aucun texte tronqué */}
                <button
                  onClick={() => handleAction(opt.id, opt.onTrigger)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.99] shadow-xs ${
                    isSuccess
                      ? 'bg-[#15803D] text-white'
                      : opt.colorClass
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

        {/* 3. Footer FIXE en bas */}
        <div className="px-5 py-3 border-t border-[#E2E8E3] dark:border-[#1F3C2F] bg-[#F7F8F4] dark:bg-[#0D1D16] shrink-0 text-center">
          <p className="text-[11px] text-[#7A8C82] dark:text-[#6C8377]">
            Tous les formats intègrent les 40+ touches de la Casio fx-991ES originale.
          </p>
        </div>
      </div>
    </div>
  );
};
