import React from 'react';
import { useApp } from '../context/AppContext';
import { Moon, Sun, Settings } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';

interface HeaderProps {
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSettings }) => {
  const { theme, setTheme, isDarkMode } = useApp();

  const handleToggleTheme = () => {
    triggerHaptic('selection');
    soundManager.playOptionToggle(true);
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('light');
    else setTheme(isDarkMode ? 'light' : 'dark');
  };

  const handleOpenSettingsClick = () => {
    triggerHaptic('light');
    soundManager.playSectionTap();
    onOpenSettings();
  };

  return (
    <header className="sticky top-0 z-40 w-full h-14 bg-[#F7F8F4]/95 dark:bg-[#0E1914]/95 backdrop-blur-md border-b border-[#E2E8E3] dark:border-[#1F3C2F] transition-colors select-none">
      <div className="max-w-md mx-auto h-full px-4 flex items-center justify-between">
        {/* Brand identity: Minimal, identifiable, scientific */}
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#123C2A] dark:bg-[#58D68D] flex items-center justify-center text-white dark:text-[#0C1813] font-mono font-bold text-xs shadow-xs select-none">
            fx
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-base font-bold tracking-tight text-[#123C2A] dark:text-white">
              FX Guide
            </span>
            <span className="text-[11px] font-mono text-[#8C9892] dark:text-[#879890] hidden xs:inline">
              fx-991ES
            </span>
          </div>
        </div>

        {/* School context tag */}
        <div className="text-xs font-medium text-[#5A7365] dark:text-[#8EA397]">
          <span>Première S2</span>
        </div>

        {/* Primary actions (Touch targets >= 44px) */}
        <div className="flex items-center gap-0.5">
          <button
            onClick={handleToggleTheme}
            aria-label="Basculer le mode d'affichage clair ou sombre"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-[#63736B] dark:text-[#8EA397] hover:text-[#123C2A] dark:hover:text-white hover:bg-[#EEF2ED] dark:hover:bg-[#1A382A] transition-colors active:scale-95"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={handleOpenSettingsClick}
            aria-label="Ouvrir les paramètres de l'application"
            className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl flex items-center justify-center text-[#63736B] dark:text-[#8EA397] hover:text-[#123C2A] dark:hover:text-white hover:bg-[#EEF2ED] dark:hover:bg-[#1A382A] transition-colors active:scale-95"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
