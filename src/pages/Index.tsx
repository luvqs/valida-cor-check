
import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/Header';
import ColorPreview from '@/components/ColorPreview';
import ContrastDisplay from '@/components/ContrastDisplay';
import ColorControls from '@/components/ColorControls';
import Footer from '@/components/Footer';
import { getContrastRatio, generateContrastingPair } from '@/utils/colorUtils';
import { Language, translations } from '@/utils/languageUtils';

type HistoryItem = {
  foregroundColor: string;
  backgroundColor: string;
};

const Index = () => {
  const [language, setLanguage] = useState<Language>('pt-BR');
  const [foregroundColor, setForegroundColor] = useState('#FFB57E');
  const [backgroundColor, setBackgroundColor] = useState('#01212C');
  const [contrastRatio, setContrastRatio] = useState(0);
  const [history, setHistory] = useState<HistoryItem[]>([{ foregroundColor: '#FFB57E', backgroundColor: '#01212C' }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const t = translations[language];
  
  const saveToHistory = useCallback((fg: string, bg: string) => {
    if (fg === history[historyIndex]?.foregroundColor && bg === history[historyIndex]?.backgroundColor) return;
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ foregroundColor: fg, backgroundColor: bg });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const updateColors = useCallback((fg: string, bg: string) => {
    setForegroundColor(fg);
    setBackgroundColor(bg);
    saveToHistory(fg, bg);
  }, [saveToHistory]);

  useEffect(() => {
    const ratio = getContrastRatio(foregroundColor, backgroundColor);
    setContrastRatio(ratio);
    document.title = t.appTitle;
  }, [foregroundColor, backgroundColor, language, t.appTitle]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Ctrl+Z (undo)
      if (e.ctrlKey && e.key === 'z' && historyIndex > 0) {
        e.preventDefault();
        const prevIndex = historyIndex - 1;
        const prevItem = history[prevIndex];
        setForegroundColor(prevItem.foregroundColor);
        setBackgroundColor(prevItem.backgroundColor);
        setHistoryIndex(prevIndex);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [history, historyIndex]);
  
  const handleReset = () => {
    updateColors('#FFB57E', '#01212C');
  };
  
  const handleInvert = () => {
    updateColors(backgroundColor, foregroundColor);
  };
  
  const handleRandom = () => {
    const { foreground, background } = generateContrastingPair();
    updateColors(foreground.hex, background.hex);
  };
  
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor }}>
      <Header 
        language={language}
        foregroundColor={foregroundColor}
        backgroundColor={backgroundColor}
        setLanguage={setLanguage}
        onReset={handleReset}
        onInvert={handleInvert}
        onRandom={handleRandom}
      />
      
      <div className="flex flex-col flex-grow">
        <div className="flex-grow">
          <ColorPreview 
            foregroundColor={foregroundColor} 
            backgroundColor={backgroundColor}
            translations={t}
            onSwitchColors={handleInvert}
          />
        </div>

        <div className="bg-background p-4 rounded-t-xl">
          <div className="max-w-6xl mx-auto">
            <ContrastDisplay 
              contrastRatio={contrastRatio}
              language={language}
              t={t}
            />

            <ColorControls 
              foregroundColor={foregroundColor}
              backgroundColor={backgroundColor}
              setForegroundColor={setForegroundColor}
              setBackgroundColor={setBackgroundColor}
              translations={t}
            />
            
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
