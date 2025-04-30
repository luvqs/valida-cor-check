
import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ColorPreview from '@/components/ColorPreview';
import ContrastDisplay from '@/components/ContrastDisplay';
import ColorControls from '@/components/ColorControls';
import Footer from '@/components/Footer';
import { getContrastRatio } from '@/utils/colorUtils';
import { Language, translations } from '@/utils/languageUtils';
import { useColorState } from '@/hooks/useColorState';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { usePageTitle } from '@/hooks/usePageTitle';

const Index = () => {
  const [language, setLanguage] = useState<Language>('pt-BR');
  const [contrastRatio, setContrastRatio] = useState(0);
  
  const t = translations[language];
  
  const {
    foregroundColor,
    backgroundColor,
    setForegroundColor,
    setBackgroundColor,
    handleReset,
    handleInvert,
    handleRandom,
    handleUndo
  } = useColorState();
  
  useKeyboardShortcuts({ onUndo: handleUndo });
  usePageTitle(t.appTitle);

  useEffect(() => {
    const ratio = getContrastRatio(foregroundColor, backgroundColor);
    setContrastRatio(ratio);
  }, [foregroundColor, backgroundColor]);
  
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
