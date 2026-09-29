import React, { createContext, useContext, useState, useEffect } from 'react';
import { CasioFunctionItem, FunctionCategory } from '../types';
import { FX991ES_DATABASE } from '../data/fx991esDatabase';
import { soundManager } from '../utils/sounds';
import { setHapticEnabled, isHapticEnabled } from '../utils/haptics';

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
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  hapticEnabled: boolean;
  setHapticState: (enabled: boolean) => void;
  resetAllUserData: () => void;
  isErrorDecoderOpen: boolean;
  openErrorDecoder: () => void;
  closeErrorDecoder: () => void;
  isSurvivalMemoOpen: boolean;
  openSurvivalMemo: () => void;
  closeSurvivalMemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const safeGetItem = (key: string): string | null => {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
};

const safeSetItem = (key: string, value: string): void => {
  try {
    localStorage.setItem(key, value);
  } catch {}
};

const safeRemoveItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch {}
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(() => {
    return (safeGetItem('fxguide_theme') as 'light' | 'dark' | 'system') || 'light';
  });

  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<AppTab>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<FunctionCategory | 'all'>('all');
  const [selectedFunction, setSelectedFunction] = useState<CasioFunctionItem | null>(null);

  const [soundEnabled, setSoundEnabledState] = useState<boolean>(() => soundManager.isEnabled());
  const [hapticEnabled, setHapticStateLocal] = useState<boolean>(() => isHapticEnabled());

  const setSoundEnabled = (val: boolean) => {
    soundManager.setEnabled(val);
    setSoundEnabledState(val);
  };

  const setHapticState = (val: boolean) => {
    setHapticEnabled(val);
    setHapticStateLocal(val);
  };

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const stored = safeGetItem('fxguide_favorites');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [history, setHistory] = useState<string[]>(() => {
    try {
      const stored = safeGetItem('fxguide_history');
      return stored ? JSON.parse(stored) : ['eqn-second-degre', 'mode-table-valeurs'];
    } catch {
      return ['eqn-second-degre', 'mode-table-valeurs'];
    }
  });

  const [mastered, setMastered] = useState<string[]>(() => {
    try {
      const stored = safeGetItem('fxguide_mastered');
      return stored ? JSON.parse(stored) : ['fractions-puissances-sd'];
    } catch {
      return ['fractions-puissances-sd'];
    }
  });

  const [textSize, setTextSize] = useState<'normal' | 'large'>(() => {
    return (safeGetItem('fxguide_text_size') as 'normal' | 'large') || 'normal';
  });

  const [isErrorDecoderOpen, setIsErrorDecoderOpen] = useState(false);
  const [isSurvivalMemoOpen, setIsSurvivalMemoOpen] = useState(false);

  const openErrorDecoder = () => setIsErrorDecoderOpen(true);
  const closeErrorDecoder = () => setIsErrorDecoderOpen(false);
  const openSurvivalMemo = () => setIsSurvivalMemoOpen(true);
  const closeSurvivalMemo = () => setIsSurvivalMemoOpen(false);

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
    safeSetItem('fxguide_theme', newTheme);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const isAdding = !prev.includes(id);
      soundManager.playFavorite(isAdding);
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      safeSetItem('fxguide_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const addToHistory = (id: string) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item !== id);
      const updated = [id, ...filtered].slice(0, 15);
      safeSetItem('fxguide_history', JSON.stringify(updated));
      return updated;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    safeRemoveItem('fxguide_history');
  };

  const toggleMastered = (id: string) => {
    setMastered(prev => {
      const isAdding = !prev.includes(id);
      if (isAdding) {
        soundManager.playSuccess();
      }
      const updated = prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id];
      safeSetItem('fxguide_mastered', JSON.stringify(updated));
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
    safeSetItem('fxguide_text_size', size);
  };

  const resetAllUserData = () => {
    setFavorites([]);
    setHistory([]);
    setMastered([]);
    safeRemoveItem('fxguide_favorites');
    safeRemoveItem('fxguide_history');
    safeRemoveItem('fxguide_mastered');
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
        soundEnabled,
        setSoundEnabled,
        hapticEnabled,
        setHapticState,
        resetAllUserData,
        isErrorDecoderOpen,
        openErrorDecoder,
        closeErrorDecoder,
        isSurvivalMemoOpen,
        openSurvivalMemo,
        closeSurvivalMemo
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
