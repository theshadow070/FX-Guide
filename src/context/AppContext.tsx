import React, { createContext, useContext, useState, useEffect } from 'react';
import { CasioFunctionItem, FunctionCategory } from '../types';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';

export type AppTab = 'home' | 'explorer' | 'search' | 'curriculum' | 'keypad' | 'favorites' | 'discover' | 'progress';

interface AppContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (t: 'light' | 'dark' | 'system') => void;
  isDarkMode: boolean;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: FunctionCategory | 'all';
  setSelectedCategory: (cat: FunctionCategory | 'all') => void;
  selectedFunction: CasioFunctionItem | null;
  openFunctionDetail: (fn: CasioFunctionItem) => void;
  closeFunctionDetail: () => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;
  history: string[];
  addToHistory: (id: string) => void;
  clearHistory: () => void;
  mastered: string[];
  toggleMastered: (id: string) => void;
  isMastered: (id: string) => boolean;
  textSize: 'normal' | 'large';
  setTextSize: (size: 'normal' | 'large') => void;
  resetAllUserData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => {
    return (localStorage.getItem('fxguide_theme') as 'light' | 'dark' | 'system') || 'light';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<FunctionCategory | 'all'>('all');
  const [selectedFunction, setSelectedFunction] = useState<CasioFunctionItem | null>(null);

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('fxguide_favorites');
      return stored ? JSON.parse(stored) : ['eqn-second-degre', 'derivee-numerique-ddx', 'setup-degre-radian'];
    } catch {
      return ['eqn-second-degre', 'derivee-numerique-ddx', 'setup-degre-radian'];
    }
  });

  const [history, setHistory] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('fxguide_history');
      return stored ? JSON.parse(stored) : ['eqn-second-degre', 'mode-table-valeurs'];
    } catch {
      return ['eqn-second-degre', 'mode-table-valeurs'];
    }
  });

  const [mastered, setMastered] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('fxguide_mastered');
      return stored ? JSON.parse(stored) : ['fractions-puissances-sd'];
    } catch {
      return ['fractions-puissances-sd'];
    }
  });

  const [textSize, setTextSize] = useState<'normal' | 'large'>(() => {
    return (localStorage.getItem('fxguide_text_size') as 'normal' | 'large') || 'normal';
  });

  // Handle dark mode evaluation
  useEffect(() => {
    const updateDarkMode = () => {
      let isDark = false;
      if (theme === 'dark') {
        isDark = true;
      } else if (theme === 'light') {
        isDark = false;
      } else {
        isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      }
      setIsDarkMode(isDark);
      if (isDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    updateDarkMode();

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (theme === 'system') {
        updateDarkMode();
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
    localStorage.setItem('fxguide_theme', newTheme);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('fxguide_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addToHistory = (id: string) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item !== id);
      const updated = [id, ...filtered].slice(0, 15);
      localStorage.setItem('fxguide_history', JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('fxguide_history');
  };

  const toggleMastered = (id: string) => {
    setMastered(prev => {
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      localStorage.setItem('fxguide_mastered', JSON.stringify(updated));
      return updated;
    });
  };

  const isMastered = (id: string) => mastered.includes(id);

  const openFunctionDetail = (fn: CasioFunctionItem) => {
    setSelectedFunction(fn);
    addToHistory(fn.id);
  };

  const closeFunctionDetail = () => {
    setSelectedFunction(null);
  };

  const handleSetTextSize = (size: 'normal' | 'large') => {
    setTextSize(size);
    localStorage.setItem('fxguide_text_size', size);
  };

  const resetAllUserData = () => {
    setFavorites([]);
    setHistory([]);
    setMastered([]);
    localStorage.removeItem('fxguide_favorites');
    localStorage.removeItem('fxguide_history');
    localStorage.removeItem('fxguide_mastered');
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        isDarkMode,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedFunction,
        openFunctionDetail,
        closeFunctionDetail,
        favorites,
        toggleFavorite,
        isFavorite,
        history,
        addToHistory,
        clearHistory,
        mastered,
        toggleMastered,
        isMastered,
        textSize,
        setTextSize: handleSetTextSize,
        resetAllUserData
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
