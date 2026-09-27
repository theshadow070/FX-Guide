import React, { useState } from 'react';
import { CASIO_KEYPAD_KEYS } from '../data/keypadData';
import { KeypadKeyInfo } from '../types';
import { KeyBadge } from '../components/KeyBadge';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { useApp } from '../context/AppContext';
import { Info, Sparkles, HelpCircle, Check, ArrowRight } from 'lucide-react';

export const KeypadView: React.FC = () => {
  const { openFunctionDetail } = useApp();
  const [selectedKey, setSelectedKey] = useState<KeypadKeyInfo>(
    CASIO_KEYPAD_KEYS.find(k => k.id === 'key-calc') || CASIO_KEYPAD_KEYS[0]
  );
  const [activeZone, setActiveZone] = useState<'all' | 'navigation' | 'scientific' | 'memory_calc' | 'numeric'>('all');

  const filteredKeys = CASIO_KEYPAD_KEYS.filter(
    k => activeZone === 'all' || k.zone === activeZone
  );

  return (
    <div className="space-y-4 pb-20">
      {/* Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-[#173126] dark:text-[#F0F4EF]">
          Explorateur des touches fx-991ES
        </h1>
        <p className="text-xs text-[#63736B] dark:text-[#B7C5BE] mt-0.5">
          Touche n’importe quel bouton pour découvrir ses fonctions principales, SHIFT et ALPHA.
        </p>
      </div>

      {/* Selected Key Detail Card */}
      <div className="bg-white dark:bg-[#1D3028] border-2 border-[#123C2A]/20 dark:border-[#6FAF82]/30 rounded-2xl p-4 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-[#EEF2ED] dark:border-[#2C4439] pb-3">
          <div className="flex items-center gap-3">
            <KeyBadge label={selectedKey.primaryLabel} size="lg" />
            <div>
              <div className="text-sm font-bold text-[#173126] dark:text-[#F0F4EF]">
                Touche {selectedKey.primaryLabel}
              </div>
              <div className="text-[11px] font-mono text-[#63736B] dark:text-[#879890]">
                Fréquence en S2 : {selectedKey.usageCountInS2}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-end gap-1 text-[11px] font-mono">
            {selectedKey.shiftLabel && (
              <span className="text-[#D4A017] dark:text-[#E5B329] font-bold">
                [SHIFT] {selectedKey.shiftLabel}
              </span>
            )}
            {selectedKey.alphaLabel && (
              <span className="text-[#B22222] dark:text-[#F87171] font-bold">
                [ALPHA] {selectedKey.alphaLabel}
              </span>
            )}
            {selectedKey.secondaryUnderLabel && (
              <span className="text-[#123C2A] dark:text-[#6FAF82] font-semibold">
                {selectedKey.secondaryUnderLabel}
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-[#173126] dark:text-[#F0F4EF] leading-relaxed">
          {selectedKey.description}
        </p>

        {/* Example in S2 */}
        <div className="p-3 bg-[#F7F8F4] dark:bg-[#14231D] rounded-xl border border-[#E2E8E3] dark:border-[#2C4439] space-y-1">
          <div className="text-[11px] font-bold text-[#123C2A] dark:text-[#6FAF82] font-mono">
            Exemple d’utilisation :
          </div>
          <p className="text-xs text-[#63736B] dark:text-[#B7C5BE] leading-relaxed">
            {selectedKey.exampleUsage}
          </p>
        </div>
      </div>

      {/* Zone Selector Filter */}
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
        {[
          { id: 'all', label: 'Toutes les touches' },
          { id: 'scientific', label: 'Scientifiques' },
          { id: 'navigation', label: 'Commandes' },
          { id: 'memory_calc', label: 'Mémoire & Parenthèses' },
          { id: 'numeric', label: 'Pavé numérique' }
        ].map(z => (
          <button
            key={z.id}
            onClick={() => setActiveZone(z.id as any)}
            className={`whitespace-nowrap px-3 py-1.5 text-xs rounded-lg transition-colors shrink-0 ${
              activeZone === z.id
                ? 'bg-[#123C2A] text-white dark:bg-[#6FAF82] dark:text-[#0E1914] font-semibold'
                : 'bg-white dark:bg-[#1D3028] text-[#63736B] dark:text-[#B7C5BE] border border-[#E2E8E3] dark:border-[#2C4439]'
            }`}
          >
            {z.label}
          </button>
        ))}
      </div>

      {/* Interactive Keypad Grid */}
      <div className="bg-[#E4E9E2] dark:bg-[#14231D] p-3 rounded-2xl border border-[#CBD5E1] dark:border-[#2C4439] shadow-inner">
        <div className="text-[10px] font-mono text-[#63736B] dark:text-[#879890] text-center mb-2">
          CLAVIER CASIO NATURAL-V.P.A.M.
        </div>

        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
          {filteredKeys.map(k => {
            const isSelected = selectedKey.id === k.id;
            return (
              <button
                key={k.id}
                onClick={() => setSelectedKey(k)}
                className={`relative p-2 flex flex-col items-center justify-center min-h-[48px] rounded-xl transition-all active:scale-95 ${
                  isSelected
                    ? 'ring-2 ring-[#123C2A] dark:ring-[#B8E86A] bg-white dark:bg-[#244036] shadow-md'
                    : 'bg-white/80 dark:bg-[#1D3028] hover:bg-white dark:hover:bg-[#244036]/80'
                }`}
              >
                {/* Secondary labels above key */}
                <div className="w-full flex items-center justify-between text-[9px] font-mono leading-none mb-1 px-0.5">
                  <span className="text-[#D4A017] dark:text-[#E5B329] font-bold truncate">
                    {k.shiftLabel || ''}
                  </span>
                  <span className="text-[#B22222] dark:text-[#F87171] font-bold truncate">
                    {k.alphaLabel || ''}
                  </span>
                </div>

                {/* Primary label */}
                <span className="text-xs font-bold font-mono text-[#173126] dark:text-[#F0F4EF]">
                  {k.primaryLabel}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
