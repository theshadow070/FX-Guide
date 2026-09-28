import React from 'react';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';

interface KeyBadgeProps {
  label: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isShift?: boolean;
  isAlpha?: boolean;
  showConnector?: boolean;
  active?: boolean;
  onClick?: () => void;
}

export const KeyBadge: React.FC<KeyBadgeProps> = ({
  label,
  size = 'md',
  isShift,
  isAlpha,
  showConnector = false,
  active = false,
  onClick
}) => {
  const isShiftKey = isShift || label.toUpperCase() === 'SHIFT';
  const isAlphaKey = isAlpha || label.toUpperCase() === 'ALPHA';
  const isAcDelKey = ['AC', 'DEL'].includes(label.toUpperCase());
  const isModeOnKey = ['MODE', 'ON', 'SETUP'].includes(label.toUpperCase());
  const isEqualsKey = label === '=';

  let colorClasses =
    'bg-[#2A3B33] text-[#F0F4EF] border-[#3D5247] shadow-[0_2px_0_0_#17261F] hover:bg-[#34483E]';

  if (isShiftKey) {
    colorClasses =
      'bg-[#D4A017] text-[#1A1A1A] font-bold border-[#B8860B] shadow-[0_2px_0_0_#8B6508] hover:bg-[#E5B025]';
  } else if (isAlphaKey) {
    colorClasses =
      'bg-[#C53030] text-[#FFFFFF] font-bold border-[#9B2C2C] shadow-[0_2px_0_0_#742A2A] hover:bg-[#D9383A]';
  } else if (isAcDelKey) {
    colorClasses =
      'bg-[#D97706] text-[#FFFFFF] font-bold border-[#B45309] shadow-[0_2px_0_0_#78350F] hover:bg-[#E58314]';
  } else if (isModeOnKey) {
    colorClasses =
      'bg-[#123C2A] text-[#B8E86A] font-semibold border-[#1D523C] shadow-[0_2px_0_0_#0B251A] hover:bg-[#184F38]';
  } else if (isEqualsKey) {
    colorClasses =
      'bg-[#154632] text-[#FFFFFF] font-bold border-[#206649] shadow-[0_2px_0_0_#0C291D] hover:bg-[#1B573E]';
  }

  const sizeClasses = {
    sm: 'text-[11px] px-1.5 py-0.5 min-w-[22px] min-h-[22px] rounded-[5px]',
    md: 'text-[12px] px-2.5 py-1 min-w-[30px] min-h-[28px] rounded-[6px]',
    lg: 'text-[14px] px-3.5 py-1.5 min-w-[40px] min-h-[36px] rounded-[8px]',
    xl: 'text-[16px] px-4 py-2 min-w-[48px] min-h-[42px] rounded-[10px]'
  }[size];

  const handleClick = () => {
    if (onClick) {
      triggerHaptic('light');
      soundManager.playTap();
      onClick();
    }
  };

  return (
    <span className="inline-flex items-center gap-1 select-none">
      <span
        onClick={onClick ? handleClick : undefined}
        className={`inline-flex items-center justify-center font-mono font-medium tracking-tight border text-center transition-all duration-75 active:translate-y-0.5 active:shadow-none ${
          onClick ? 'cursor-pointer active:scale-95' : ''
        } ${active ? 'ring-2 ring-[#B8E86A] scale-105 shadow-md' : ''} ${colorClasses} ${sizeClasses}`}
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
