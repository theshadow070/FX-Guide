import React from 'react';

interface LcdScreenProps {
  expression?: string;
  result?: string;
  angleMode?: 'D' | 'R' | 'G';
  hasShift?: boolean;
  hasAlpha?: boolean;
  hasMath?: boolean;
  modeIndicator?: string; // e.g. "STAT", "CMPLX"
  subText?: string;
}

export const LcdScreen: React.FC<LcdScreenProps> = ({
  expression,
  result,
  angleMode = 'D',
  hasShift = false,
  hasAlpha = false,
  hasMath = true,
  modeIndicator,
  subText
}) => {
  return (
    <div className="relative rounded-xl p-3 bg-[#BBC9B1] dark:bg-[#203126] border-2 border-[#9DAE93] dark:border-[#334D3D] shadow-inner text-[#14231A] dark:text-[#D8E6D3] font-mono select-none overflow-hidden">
      {/* Top Indicators Bar */}
      <div className="flex items-center justify-between text-[10px] tracking-wider border-b border-[#9DAE93]/40 dark:border-[#334D3D]/60 pb-1 mb-2 font-mono">
        <div className="flex items-center gap-1.5 font-bold">
          <span className={`px-0.5 rounded ${hasShift ? 'bg-[#14231A] text-[#BBC9B1] dark:bg-[#D8E6D3] dark:text-[#203126]' : 'opacity-20'}`}>
            S
          </span>
          <span className={`px-0.5 rounded ${hasAlpha ? 'bg-[#14231A] text-[#BBC9B1] dark:bg-[#D8E6D3] dark:text-[#203126]' : 'opacity-20'}`}>
            A
          </span>
          <span className="opacity-20">M</span>
          <span className="opacity-20">STO</span>
        </div>

        <div className="flex items-center gap-2">
          {modeIndicator && (
            <span className="font-bold text-[9px] uppercase px-1 bg-[#14231A]/10 dark:bg-[#D8E6D3]/10 rounded">
              {modeIndicator}
            </span>
          )}
          <span className="font-bold">{angleMode}</span>
          {hasMath && <span className="font-bold text-[9px]">MATH</span>}
          <span className="text-[9px] opacity-40">▲▼</span>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[58px] flex flex-col justify-between py-1">
        {expression && (
          <div className="text-left text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed opacity-90 break-all">
            {expression}
          </div>
        )}

        {result && (
          <div className="text-right text-base sm:text-lg font-bold font-mono tracking-tight pt-1 border-t border-[#9DAE93]/20 dark:border-[#334D3D]/40">
            {result}
          </div>
        )}

        {subText && (
          <div className="text-left text-[11px] font-mono text-[#3A5043] dark:text-[#9FB7A8] pt-1">
            {subText}
          </div>
        )}
      </div>

      {/* Subtle Glass Reflection Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15 pointer-events-none rounded-xl" />
    </div>
  );
};
