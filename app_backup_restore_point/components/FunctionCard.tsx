import React from 'react';
import { CasioFunctionItem } from '../types';
import { useApp } from '../context/AppContext';
import { KeyBadge } from './KeyBadge';
import { Bookmark, Check, ChevronRight } from 'lucide-react';

interface FunctionCardProps {
  item: CasioFunctionItem;
  onClick: () => void;
}

export const FunctionCard: React.FC<FunctionCardProps> = ({ item, onClick }) => {
  const { isFavorite, toggleFavorite, isMastered } = useApp();
  const bookmarked = isFavorite(item.id);
  const mastered = isMastered(item.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleFavorite(item.id);
  };

  return (
    <article
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      className="group relative w-full text-left bg-white dark:bg-[#1D3028] border border-[#E2E8E3] dark:border-[#2C4439] rounded-2xl p-4 transition-all duration-150 hover:border-[#123C2A]/30 dark:hover:border-[#6FAF82]/50 active:scale-[0.99] cursor-pointer shadow-sm"
    >
      {/* Top Metadata Row: Zero-Pill unboxed typography */}
      <div className="flex items-center justify-between text-xs text-[#63736B] dark:text-[#B7C5BE] mb-2 font-mono">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-semibold text-[#123C2A] dark:text-[#6FAF82]">
            {item.modeCasio}
          </span>
          <span aria-hidden="true" className="opacity-40">·</span>
          <span>{item.niveau}</span>
          {mastered && (
            <>
              <span aria-hidden="true" className="opacity-40">·</span>
              <span className="inline-flex items-center gap-1 text-[#2E7D32] dark:text-[#B8E86A] font-semibold">
                <Check className="w-3 h-3" /> Maîtrisé
              </span>
            </>
          )}
        </div>

        <button
          onClick={handleFavoriteClick}
          aria-label={bookmarked ? 'Retirer des favoris' : 'Ajouter aux favoris'}
          className="p-1.5 min-w-[32px] min-h-[32px] flex items-center justify-center rounded-lg text-[#8C9892] dark:text-[#879890] hover:text-[#123C2A] dark:hover:text-[#F0F4EF] transition-colors"
        >
          <Bookmark
            className={`w-4 h-4 transition-colors ${
              bookmarked ? 'fill-[#123C2A] text-[#123C2A] dark:fill-[#B8E86A] dark:text-[#B8E86A]' : ''
            }`}
          />
        </button>
      </div>

      {/* Title */}
      <h3 className="text-base font-bold text-[#173126] dark:text-[#F0F4EF] leading-snug tracking-tight mb-1.5 group-hover:text-[#123C2A] dark:group-hover:text-[#6FAF82] transition-colors">
        {item.nom}
      </h3>

      {/* Description */}
      <p className="text-xs text-[#63736B] dark:text-[#B7C5BE] line-clamp-2 leading-relaxed mb-3">
        {item.description}
      </p>

      {/* Keystroke Sequence Preview */}
      <div className="flex items-center justify-between pt-2.5 border-t border-[#EEF2ED] dark:border-[#2C4439]/60">
        <div className="flex items-center gap-1 flex-wrap overflow-hidden py-0.5">
          {item.touchesRapides.slice(0, 5).map((key, idx) => (
            <KeyBadge
              key={idx}
              label={key}
              size="sm"
              showConnector={idx < Math.min(item.touchesRapides.length - 1, 4)}
            />
          ))}
          {item.touchesRapides.length > 5 && (
            <span className="text-[10px] text-[#8C9892] dark:text-[#879890] font-mono font-medium pl-1">
              +{item.touchesRapides.length - 5}
            </span>
          )}
        </div>

        <span className="flex items-center gap-0.5 text-xs font-semibold text-[#123C2A] dark:text-[#6FAF82] shrink-0 ml-2">
          Voir
          <ChevronRight className="w-3.5 h-3.5" />
        </span>
      </div>
    </article>
  );
};
