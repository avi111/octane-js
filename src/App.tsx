import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SLIDES_DATA } from './types/presentation';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { OverviewModal } from './components/OverviewModal';
import { PresenterNotesModal } from './components/PresenterNotesModal';
import { playSound } from './utils/audio';

// Slide components
import { Slide1Cover } from './components/slides/Slide1Cover';
import { Slide2Roadmap } from './components/slides/Slide2Roadmap';
import { Slide3MiddleManager } from './components/slides/Slide3MiddleManager';
import { Slide2ClassicMVC } from './components/slides/Slide2ClassicMVC';
import { Slide5VirtualDOMAdvantages } from './components/slides/Slide5VirtualDOMAdvantages';
import { Slide3VirtualDOMTimeline } from './components/slides/Slide3VirtualDOMTimeline';
import { Slide7MemoCallback } from './components/slides/Slide7MemoCallback';
import { Slide8DependencyTerror } from './components/slides/Slide8DependencyTerror';
import { Slide7SveltePrecompile } from './components/slides/Slide7SveltePrecompile';
import { Slide10TSRXInnovations } from './components/slides/Slide10TSRXInnovations';
import { Slide11OctaneComplexity } from './components/slides/Slide11OctaneComplexity';
import { Slide12ComparisonTable } from './components/slides/Slide12ComparisonTable';
import { Slide17Summary } from './components/slides/Slide17Summary';
import { Slide18TheEnd } from './components/slides/Slide18TheEnd';

export default function App() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isOverviewOpen, setIsOverviewOpen] = useState<boolean>(false);
  const [isNotesOpen, setIsNotesOpen] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const totalSlides = SLIDES_DATA.length;
  const currentSlideData = SLIDES_DATA[currentSlide - 1];
  const nextSlideData = currentSlide < totalSlides ? SLIDES_DATA[currentSlide] : undefined;

  // Touch swipe support
  const touchStartX = useRef<number | null>(null);

  const goToSlide = useCallback(
    (n: number) => {
      if (n >= 1 && n <= totalSlides) {
        setCurrentSlide(n);
        playSound('switch', soundEnabled);
      }
    },
    [totalSlides, soundEnabled]
  );

  const nextSlide = useCallback(() => {
    if (currentSlide < totalSlides) {
      goToSlide(currentSlide + 1);
    }
  }, [currentSlide, totalSlides, goToSlide]);

  const prevSlide = useCallback(() => {
    if (currentSlide > 1) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
        setIsFullscreen(false);
      }
    }
    playSound('click', soundEnabled);
  }, [soundEnabled]);

  // Listen to fullscreenchange
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'o' || e.key === 'O') {
        e.preventDefault();
        setIsOverviewOpen((prev) => !prev);
        playSound('switch', soundEnabled);
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setIsNotesOpen((prev) => !prev);
        playSound('switch', soundEnabled);
      } else if (e.key === 'Escape') {
        setIsOverviewOpen(false);
        setIsNotesOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, nextSlide, prevSlide, toggleFullscreen, soundEnabled]);

  // Touch handlers for mobile/tablet swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
    touchStartX.current = null;
  };

  // Render current slide
  const renderSlideContent = () => {
    switch (currentSlide) {
      case 1:
        return (
          <Slide1Cover
            soundEnabled={soundEnabled}
            onStart={nextSlide}
            onJumpToSlide={goToSlide}
          />
        );
      case 2:
        return (
          <Slide2Roadmap
            soundEnabled={soundEnabled}
            onJumpToSlide={goToSlide}
          />
        );
      case 3:
        return (
          <Slide3MiddleManager
            soundEnabled={soundEnabled}
          />
        );
      case 4:
        return (
          <Slide2ClassicMVC
            soundEnabled={soundEnabled}
          />
        );
      case 5:
        return (
          <Slide5VirtualDOMAdvantages
            soundEnabled={soundEnabled}
          />
        );
      case 6:
        return (
          <Slide3VirtualDOMTimeline
            soundEnabled={soundEnabled}
            isActive={currentSlide === 6}
          />
        );
      case 7:
        return (
          <Slide7MemoCallback
            soundEnabled={soundEnabled}
          />
        );
      case 8:
        return (
          <Slide8DependencyTerror
            soundEnabled={soundEnabled}
          />
        );
      case 9:
        return (
          <Slide7SveltePrecompile
            soundEnabled={soundEnabled}
          />
        );
      case 10:
        return (
          <Slide10TSRXInnovations
            soundEnabled={soundEnabled}
          />
        );
      case 11:
        return (
          <Slide11OctaneComplexity
            soundEnabled={soundEnabled}
          />
        );
      case 12:
        return (
          <Slide12ComparisonTable
            soundEnabled={soundEnabled}
          />
        );
      case 13:
        return (
          <Slide17Summary
            soundEnabled={soundEnabled}
            onJumpToSlide={goToSlide}
          />
        );
      case 14:
        return (
          <Slide18TheEnd
            soundEnabled={soundEnabled}
            onRewind={() => goToSlide(1)}
            onOpenOverview={() => setIsOverviewOpen(true)}
          />
        );
      default:
        return (
          <Slide1Cover
            soundEnabled={soundEnabled}
            onStart={nextSlide}
            onJumpToSlide={goToSlide}
          />
        );
    }
  };

  return (
    <div
      className="h-full flex flex-col justify-between selection:bg-cyan-500 selection:text-black bg-[#030712] text-slate-100 overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header */}
      <Header
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        slideTitle={currentSlideData.title}
        soundEnabled={soundEnabled}
        onToggleSound={() => {
          setSoundEnabled((prev) => !prev);
          playSound('click', !soundEnabled);
        }}
        onOpenOverview={() => {
          setIsOverviewOpen(true);
          playSound('switch', soundEnabled);
        }}
        onToggleNotes={() => {
          setIsNotesOpen((prev) => !prev);
          playSound('switch', soundEnabled);
        }}
        isFullscreen={isFullscreen}
        onToggleFullscreen={toggleFullscreen}
      />

      {/* Main Slide Viewport */}
      <main className="relative flex-1 w-full h-full max-w-7xl mx-auto p-2 md:p-6 flex items-center justify-center overflow-hidden">
        <div key={currentSlide} className="w-full h-full max-h-[86vh] flex flex-col justify-between">
          {renderSlideContent()}
        </div>
      </main>

      {/* Footer Controls */}
      <Footer
        currentSlide={currentSlide}
        totalSlides={totalSlides}
        slides={SLIDES_DATA}
        onPrev={prevSlide}
        onNext={nextSlide}
        onSelectSlide={goToSlide}
      />

      {/* Overview Modal */}
      <OverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        currentSlide={currentSlide}
        slides={SLIDES_DATA}
        onSelectSlide={goToSlide}
      />

      {/* Presenter Notes Slide-Over */}
      <PresenterNotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        currentSlideData={currentSlideData}
        nextSlideData={nextSlideData}
        onGoToNext={nextSlide}
      />
    </div>
  );
}
