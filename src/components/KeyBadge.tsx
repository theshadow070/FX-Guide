import React from 'react';

interface KeyBadgeProps {
  label: string;
  size?: 'sm' | 'md' | 'lg';
  isShift?: boolean;
  isAlpha?: boolean;
  showConnector?: boolean;
}

export const KeyBadge: React.FC<KeyBadgeProps> = ({
  label,
  size = 'md',
  isShift,
  isAlpha,
  showConnector = false
}) => {
  const isShiftKey = isShift || label.toUpperCase() === 'SHIFT';
  const isAlphaKey = isAlpha || label.toUpperCase() === 'ALPHA';
  const isAcDelKey = ['AC', 'DEL'].includes(label.toUpperCase());
  const isModeOnKey = ['MODE', 'ON', 'SETUP'].includes(label.toUpperCase());
  const isEqualsKey = label === '=';

  let colorClasses =
    'bg-[#2A3B33] text-[#F0F4EF] border-[#3D5247] shadow-[0_2px_0_0_#17261F]';

  if (isShiftKey) {
    colorClasses =
      'bg-[#D4A017] text-[#1A1A1A] font-bold border-[#B8860B] shadow-[0_2px_0_0_#8B6508]';
  } else if (isAlphaKey) {
    colorClasses =
      'bg-[#B22222] text-[#FFFFFF] font-bold border-[#8B0000] shadow-[0_2px_0_0_#5B0000]';
  } else if (isAcDelKey) {
    colorClasses =
      'bg-[#D97706] text-[#FFFFFF] font-bold border-[#B45309] shadow-[0_2px_0_0_#78350F]';
  } else if (isModeOnKey) {
    colorClasses =
      'bg-[#123C2A] text-[#B8E86A] font-semibold border-[#1D523C] shadow-[0_2px_0_0_#0B251A]';
  } else if (isEqualsKey) {
    colorClasses =
      'bg-[#123C2A] text-[#FFFFFF] font-bold border-[#1D523C] shadow-[0_2px_0_0_#0B251A]';
  }

  const sizeClasses = {
    sm: 'text-[11px] px-1.5 py-0.5 min-w-[22px] min-h-[20px] rounded-[5px]',
    md: 'text-[12px] px-2 py-1 min-w-[28px] min-h-[26px] rounded-[6px]',
    lg: 'text-[14px] px-3 py-1.5 min-w-[36px] min-h-[34px] rounded-[8px]'
  }[size];

  return (
    <span className="inline-flex items-center gap-1 select-none">
      <span
        className={`inline-flex items-center justify-center font-mono font-medium tracking-tight border text-center transition-transform active:translate-y-0.5 ${colorClasses} ${sizeClasses}`}
      >
        {label}
      </span>
      {showConnector && (
        <span className="text-[#8C9892] dark:text-[#879890] text-xs font-mono font-bold">
          →
        </span>
      )}
    </span>
  );
};
