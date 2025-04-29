
import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Trash2, RefreshCw, Dices } from 'lucide-react';
import ColorInput from '@/components/ColorInput';
import ColorPreview from '@/components/ColorPreview';
import LanguageToggle from '@/components/LanguageToggle';
import { getContrastRatio, generateContrastingPair, getComplianceLevel } from '@/utils/colorUtils';
import { Language, translations } from '@/utils/languageUtils';
import LucasVasquesLogo from '@/components/LucasVasquesLogo';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();

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

  const complianceLevel = getComplianceLevel(contrastRatio);
  
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor }}>
      <header className="p-4 flex justify-between items-center">
        <div className="flex gap-2">
          {!isMobile ? (
            <>
              <Button 
                variant="outline" 
                onClick={handleReset}
                className="border-2 bg-transparent"
                style={{ color: foregroundColor, borderColor: foregroundColor }}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                onClick={handleInvert}
                className="border-2 bg-transparent"
                style={{ color: foregroundColor, borderColor: foregroundColor }}
              >
                <RefreshCw className="h-5 w-5" />
              </Button>
            </>
          ) : null}
          <Button 
            variant="outline" 
            onClick={handleRandom}
            className="border-2 bg-transparent"
            style={{ color: foregroundColor, borderColor: foregroundColor }}
          >
            <Dices className="h-5 w-5" />
          </Button>
        </div>
        <LanguageToggle 
          currentLanguage={language} 
          onLanguageChange={setLanguage} 
        />
      </header>
      
      <div className="flex flex-col flex-grow">
        <div className="flex-grow">
          <ColorPreview 
            foregroundColor={foregroundColor} 
            backgroundColor={backgroundColor}
            translations={t}
          />
        </div>

        <div className="bg-background p-4 rounded-t-xl">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <div className="text-3xl font-bold flex items-center justify-center gap-2">
                <span>{contrastRatio}:1</span>
                <span 
                  className={`text-lg px-2 py-1 rounded ${
                    complianceLevel === 'aaa' ? 'text-success bg-success/10' : 
                    complianceLevel === 'aa' ? 'text-warning bg-warning/10' : 
                    complianceLevel === 'aa-large' ? 'text-warning bg-warning/10' : 
                    'text-destructive bg-destructive/10'
                  }`}
                >
                  {complianceLevel.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ColorInput
                  title={t.foregroundColor}
                  initialColor={foregroundColor}
                  onColorChange={setForegroundColor}
                  translations={t}
                />
              </div>
              
              <div>
                <ColorInput
                  title={t.backgroundColor}
                  initialColor={backgroundColor}
                  onColorChange={setBackgroundColor}
                  translations={t}
                />
              </div>
            </div>
            
            <footer className="mt-8 text-center text-muted-foreground">
              <p className="flex items-center justify-center gap-2">
                <span className="font-bold">ValidaCor</span> foi desenvolvido por <LucasVasquesLogo />
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
