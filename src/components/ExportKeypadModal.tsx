import React, { useState } from 'react';
import { X, Printer, FileText, Table, Code2, Check, Download, Sparkles } from 'lucide-react';
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
      description: 'Mise en page optimisée pour l’impression directe ou l’enregistrement en PDF avec typographie soignée et tableaux de synthèse.',
      icon: <Printer className="w-5 h-5" />,
      actionText: 'Imprimer / Sauvegarder en PDF',
      colorClass: 'bg-[#123C2A] text-white hover:bg-[#1D4E38]',
      onTrigger: printKeypadMemo
    },
    {
      id: 'markdown',
      title: 'Fiche Markdown (.md)',
      badge: 'Obsidian · Notion · GitHub',
      description: 'Document texte structuré avec tableaux complets, raccourcis et explications détaillées.',
      icon: <FileText className="w-5 h-5" />,
      actionText: 'Télécharger le .md',
      colorClass: 'bg-[#EEF4F0] dark:bg-[#1B382B] text-[#123C2A] dark:text-[#57B88A] hover:bg-[#E2EBE5] dark:hover:bg-[#224737]',
      onTrigger: exportAsMarkdown
    },
    {
      id: 'csv',
      title: 'Tableau Excel / CSV (.csv)',
      badge: 'Excel · Numbers · Sheets',
      description: 'Fichier tableur encodé en UTF-8 avec BOM (accents français préservés sans aucune corruption).',
      icon: <Table className="w-5 h-5" />,
      actionText: 'Télécharger le .csv',
      colorClass: 'bg-[#EEF4F0] dark:bg-[#1B382B] text-[#123C2A] dark:text-[#57B88A] hover:bg-[#E2EBE5] dark:hover:bg-[#224737]',
      onTrigger: exportAsCsv
    },
    {
      id: 'json',
      title: 'Données Structurées (.json)',
      badge: 'JSON Formaté',
      description: 'Structure complète des touches, modes Casio et registres pour usage numérique ou intégrations.',
      icon: <Code2 className="w-5 h-5" />,
      actionText: 'Télécharger le .json',
      colorClass: 'bg-[#EEF4F0] dark:bg-[#1B382B] text-[#123C2A] dark:text-[#57B88A] hover:bg-[#E2EBE5] dark:hover:bg-[#224737]',
      onTrigger: exportAsJson
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-[#0E1F18] border border-[#E2E8E3] dark:border-[#1F3C2F] rounded-3xl p-5 sm:p-6 shadow-2xl space-y-5 text-[#123C2A] dark:text-[#F1F5F2] transition-colors">
        {/* Header */}
        <div className="flex items-start justify-between">
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
            <p className="text-xs text-[#5A7365] dark:text-[#8EA397] mt-1">
              Choisis le format adapté pour réviser, imprimer ou intégrer dans tes notes personnelles.
            </p>
          </div>

          <button
            onClick={onClose}
            aria-label="Fermer"
            className="w-9 h-9 rounded-xl bg-[#EEF4F0] dark:bg-[#142920] border border-[#E2E8E3] dark:border-[#1F3C2F] flex items-center justify-center text-[#5A7365] dark:text-[#8EA397] hover:text-[#123C2A] dark:hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options list */}
        <div className="space-y-3">
          {exportOptions.map(opt => {
            const isSuccess = downloadSuccess === opt.id;
            return (
              <div
                key={opt.id}
                className="p-3.5 rounded-2xl border border-[#E2E8E3] dark:border-[#1F3C2F] bg-[#F7F8F4] dark:bg-[#142920] hover:border-[#123C2A]/30 dark:hover:border-[#2C5240] transition-all space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white dark:bg-[#1B3B2D] border border-[#E2E8E3] dark:border-[#234535] text-[#123C2A] dark:text-[#57B88A] flex items-center justify-center shrink-0 shadow-2xs">
                      {opt.icon}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#123C2A] dark:text-white">
                        {opt.title}
                      </div>
                      <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-[#EEF4F0] dark:bg-[#1B382B] text-[#123C2A] dark:text-[#A5C1B2]">
                        {opt.badge}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleAction(opt.id, opt.onTrigger)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all active:scale-95 shadow-2xs ${
                      isSuccess
                        ? 'bg-[#15803D] text-white'
                        : opt.colorClass
                    }`}
                  >
                    {isSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Prêt !</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-3.5 h-3.5" />
                        <span>{opt.actionText}</span>
                      </>
                    )}
                  </button>
                </div>

                <p className="text-xs text-[#5A7365] dark:text-[#8EA397] leading-relaxed pl-12">
                  {opt.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="text-center pt-1 border-t border-[#E2E8E3] dark:border-[#1F3C2F]">
          <p className="text-[11px] text-[#7A8C82] dark:text-[#6C8377]">
            Tous les fichiers exportés intègrent la disposition authentique de la Casio fx-991ES originale.
          </p>
        </div>
      </div>
    </div>
  );
};
