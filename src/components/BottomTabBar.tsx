import React from 'react';
import { useApp, AppTab } from '../context/AppContext';
import { Home, LayoutGrid, Search, Heart } from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { soundManager } from '../utils/sounds';

export const BottomTabBar: React.FC = () => {
  const { activeTab, setActiveTab } = useApp();

  const tabs: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'home', label: 'Accueil', icon: <Home className="w-5 h-5" /> },
    { id: 'explorer', label: 'Explorer', icon: <LayoutGrid className="w-5 h-5" /> },
    { id: 'search', label: 'Recherche', icon: <Search className="w-5 h-5" /> },
    { id: 'favorites', label: 'Favoris', icon: <Heart className="w-5 h-5" /> }
  ];

  const handleTabClick = (tabId: AppTab) => {
    triggerHaptic('selection');
    soundManager.playSectionTap();
    setActiveTab(tabId);
    // Automatically scrolls the viewport to the top on tab selection
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#F7F8F4]/95 dark:bg-[#0C1813]/95 backdrop-blur-md border-t border-[#E2E8E3] dark:border-[#193125] pb-safe transition-colors"
    >
      <div className="max-w-md mx-auto grid grid-cols-4 h-16 items-center px-2">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative flex flex-col items-center justify-center h-full min-h-[44px] min-w-[44px] py-1 transition-colors select-none active:scale-95 ${
                isActive
                  ? 'text-[#123C2A] dark:text-[#57B88A]'
                  : 'text-[#7A8C82] hover:text-[#123C2A] dark:text-[#6C8377] dark:hover:text-[#9FB7A8]'
              }`}
            >
              <div>{tab.icon}</div>
              <span
                className={`text-[10px] tracking-tight mt-1 font-medium ${
                  isActive ? 'font-semibold text-[#123C2A] dark:text-[#57B88A]' : 'text-[#7A8C82] dark:text-[#6C8377]'
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
