import React from 'react';
import { useApp } from '../context/AppContext';
import { Moon, Sun, Settings } from 'lucide-react';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const { theme, setTheme, isDarkMode } = useApp();

  const handleToggleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('light');
    else setTheme(isDarkMode ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-[#F7F8F4]/95 dark:bg-[#14231D]/95 backdrop-blur-md border-b border-[#E2E8E3] dark:border-[#2C4439] transition-colors">
      <div className="max-w-md mx-auto h-full px-4 flex items-center justify-between">
        {/* Brand identity: Minimal, identifiable, scientific */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#123C2A] dark:bg-[#6FAF82] flex items-center justify-center text-white dark:text-[#14231D] font-mono font-bold text-xs shadow-xs select-none">
            fx
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold tracking-tight text-[#123C2A] dark:text-[#F0F4EF]">
              FX Guide
            </span>
            <span className="text-[11px] font-mono text-[#8C9892] dark:text-[#879890] hidden xs:inline">
              fx-991ES
            </span>
          </div>
        </div>

        {/* School context tag */}
        <div className="text-xs font-medium text-[#63736B] dark:text-[#B7C5BE]">
          <span>Première S2</span>
        </div>

        {/* Primary actions (Touch targets >= 44px) */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={handleToggleTheme}
            aria-label="Basculer le mode d'affichage clair ou sombre"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-[#63736B] dark:text-[#B7C5BE] hover:text-[#123C2A] dark:hover:text-[#F0F4EF] hover:bg-[#EEF2ED] dark:hover:bg-[#1D3028] transition-colors active:scale-95"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={onOpenSettings}
            aria-label="Ouvrir les paramètres de l'application"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-[#63736B] dark:text-[#B7C5BE] hover:text-[#123C2A] dark:hover:text-[#F0F4EF] hover:bg-[#EEF2ED] dark:hover:bg-[#1D3028] transition-colors active:scale-95"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
