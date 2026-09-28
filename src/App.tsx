/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { BottomTabBar } from './components/BottomTabBar';
import { FunctionDetailModal } from './components/FunctionDetailModal';
import { ErrorDecoderModal } from './components/ErrorDecoderModal';
import { SurvivalMemoModal } from './components/SurvivalMemoModal';
import { GuidedTourOverlay } from './components/GuidedTourOverlay';
import { SettingsModal } from './views/SettingsModal';

import { HomeView } from './views/HomeView';
import { ExplorerView } from './views/ExplorerView';
import { SearchView } from './views/SearchView';
import { ProgressView } from './views/ProgressView';
import { CurriculumS2View } from './views/CurriculumS2View';
import { KeypadView } from './views/KeypadView';
import { FavoritesHistoryView } from './views/FavoritesHistoryView';
import { DiscoverView } from './views/DiscoverView';

const AppContent: React.FC = () => {
  const {
    activeTab,
    selectedFunction,
    closeFunctionDetail,
    textSize,
    isErrorDecoderOpen,
    openErrorDecoder,
    closeErrorDecoder,
    isSurvivalMemoOpen,
    closeSurvivalMemo
  } = useApp();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  // Check if first-time user to display onboarding
  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('fxguide_onboarding_completed');
    if (!hasSeenOnboarding) {
      setIsOnboardingOpen(true);
    }
  }, []);

  const handleCloseOnboarding = () => {
    localStorage.setItem('fxguide_onboarding_completed', 'true');
    setIsOnboardingOpen(false);
  };

  // Home, Progress, Keypad, Explorer, Search and Favorites views have their own built-in headers as shown in mockups
  const showGlobalHeader =
    activeTab !== 'home' &&
    activeTab !== 'progress' &&
    activeTab !== 'keypad' &&
    activeTab !== 'explorer' &&
    activeTab !== 'search' &&
    activeTab !== 'favorites';

  return (
    <div
      className={`min-h-screen bg-[#F7F8F4] dark:bg-[#0C1813] text-[#123C2A] dark:text-[#F1F5F2] font-sans antialiased transition-colors ${
        textSize === 'large' ? 'text-[106%]' : ''
      }`}
    >
      {/* Top Bar for secondary tabs */}
      {showGlobalHeader && (
        <Header onOpenSettings={() => setIsSettingsOpen(true)} />
      )}

      {/* Main View Container (Optimized for iPhone / Mobile viewport, centered on larger screens) */}
      <main className="max-w-md mx-auto px-4 pt-4 pb-20">
        {activeTab === 'home' && (
          <HomeView onOpenSettings={() => setIsSettingsOpen(true)} />
        )}
        {activeTab === 'explorer' && <ExplorerView />}
        {activeTab === 'search' && <SearchView />}
        {activeTab === 'progress' && <ProgressView />}
        {activeTab === 'curriculum' && <CurriculumS2View />}
        {activeTab === 'keypad' && <KeypadView />}
        {activeTab === 'favorites' && <FavoritesHistoryView />}
        {activeTab === 'discover' && <DiscoverView />}
      </main>

      {/* Bottom Tab Bar (iOS Native Pattern with 4 exact tabs from mockup) */}
      <BottomTabBar />

      {/* Detailed Procedure Fullscreen Page */}
      <FunctionDetailModal
        item={selectedFunction}
        onClose={closeFunctionDetail}
        onOpenErrorDecoder={openErrorDecoder}
      />

      {/* Casio Error Decoder Fullscreen Page (Syntax ERROR, Math ERROR, etc.) */}
      <ErrorDecoderModal
        isOpen={isErrorDecoderOpen}
        onClose={closeErrorDecoder}
      />

      {/* Survival Memo Fullscreen Page (Condensed A4 Exam Cheatsheet) */}
      <SurvivalMemoModal
        isOpen={isSurvivalMemoOpen}
        onClose={closeSurvivalMemo}
      />

      {/* First-time User In-App Interactive Guided Tour */}
      <GuidedTourOverlay
        isOpen={isOnboardingOpen}
        onClose={handleCloseOnboarding}
      />

      {/* Settings Modal (exact copy of mockup 3) */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onReplayTour={() => setIsOnboardingOpen(true)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
