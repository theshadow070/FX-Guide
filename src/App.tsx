/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { AppProvider, useApp, AppTab } from './context/AppContext';
import { Header } from './components/Header';
import { BottomTabBar } from './components/BottomTabBar';
import { FunctionDetailModal } from './components/FunctionDetailModal';
import { ErrorDecoderModal } from './components/ErrorDecoderModal';
import { SurvivalMemoModal } from './components/SurvivalMemoModal';
import { GuidedTourOverlay } from './components/GuidedTourOverlay';
import { SettingsModal } from './views/SettingsModal';
import { triggerHaptic } from './utils/haptics';
import { soundManager } from './utils/sounds';

import { HomeView } from './views/HomeView';
import { ExplorerView } from './views/ExplorerView';
import { SearchView } from './views/SearchView';
import { ProgressView } from './views/ProgressView';
import { CurriculumS2View } from './views/CurriculumS2View';
import { KeypadView } from './views/KeypadView';
import { FavoritesHistoryView } from './views/FavoritesHistoryView';
import { DiscoverView } from './views/DiscoverView';

const MAIN_TABS: AppTab[] = ['home', 'explorer', 'search', 'favorites'];

const AppContent: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
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

  // Swipe navigation between main tabs & back from subviews
  const mainTouchStartX = useRef<number | null>(null);
  const mainTouchStartY = useRef<number | null>(null);

  const handleMainTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    const target = e.target as HTMLElement | null;
    if (target?.closest('input') || target?.closest('textarea') || target?.closest('.no-swipe')) {
      return;
    }
    mainTouchStartX.current = e.touches[0].clientX;
    mainTouchStartY.current = e.touches[0].clientY;
  };

  const handleMainTouchEnd = (e: React.TouchEvent) => {
    if (mainTouchStartX.current === null || mainTouchStartY.current === null) return;
    const diffX = e.changedTouches[0].clientX - mainTouchStartX.current;
    const diffY = e.changedTouches[0].clientY - mainTouchStartY.current;

    if (Math.abs(diffX) > 75 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (MAIN_TABS.includes(activeTab)) {
        const curIdx = MAIN_TABS.indexOf(activeTab);
        if (diffX < 0 && curIdx < MAIN_TABS.length - 1) {
          triggerHaptic('selection');
          soundManager.playSectionTap();
          setActiveTab(MAIN_TABS[curIdx + 1]);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else if (diffX > 0 && curIdx > 0) {
          triggerHaptic('selection');
          soundManager.playSectionTap();
          setActiveTab(MAIN_TABS[curIdx - 1]);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else {
        if (diffX > 75) {
          triggerHaptic('light');
          soundManager.playModalClose();
          setActiveTab('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    }
    mainTouchStartX.current = null;
    mainTouchStartY.current = null;
  };

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

  const handleReplayTour = () => {
    closeFunctionDetail();
    closeErrorDecoder();
    closeSurvivalMemo();
    setActiveTab('home');
    setIsSettingsOpen(false);
    setTimeout(() => {
      setIsOnboardingOpen(true);
    }, 50);
  };

  // All views have their own dedicated headers matching their specific back/action needs
  const showGlobalHeader =
    activeTab !== 'home' &&
    activeTab !== 'progress' &&
    activeTab !== 'keypad' &&
    activeTab !== 'explorer' &&
    activeTab !== 'search' &&
    activeTab !== 'favorites' &&
    activeTab !== 'curriculum' &&
    activeTab !== 'discover';

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
      <main
        onTouchStart={handleMainTouchStart}
        onTouchEnd={handleMainTouchEnd}
        className="max-w-md mx-auto px-4 pt-4 pb-20 select-none"
      >
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
        onReplayTour={handleReplayTour}
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
