
import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import ColorInput from '@/components/ColorInput';
import ContrastResult from '@/components/ContrastResult';
import ColorPreview from '@/components/ColorPreview';
import LanguageToggle from '@/components/LanguageToggle';
import { getContrastRatio, generateContrastingPair } from '@/utils/colorUtils';
import { Language, translations } from '@/utils/languageUtils';

const Index = () => {
  const [language, setLanguage] = useState<Language>('pt-BR');
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#FFFFFF');
  const [contrastRatio, setContrastRatio] = useState(21);

  const t = translations[language];
  
  useEffect(() => {
    const ratio = getContrastRatio(foregroundColor, backgroundColor);
    setContrastRatio(ratio);
    // Update page title based on language
    document.title = t.appTitle;
  }, [foregroundColor, backgroundColor, language, t.appTitle]);
  
  const handleReset = () => {
    setForegroundColor('#000000');
    setBackgroundColor('#FFFFFF');
  };
  
  const handleInvert = () => {
    setForegroundColor(backgroundColor);
    setBackgroundColor(foregroundColor);
  };
  
  const handleRandom = () => {
    const { foreground, background } = generateContrastingPair();
    setForegroundColor(foreground.hex);
    setBackgroundColor(background.hex);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 bg-background">
      <LanguageToggle 
        currentLanguage={language} 
        onLanguageChange={setLanguage} 
      />
      
      <div className="max-w-6xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{t.appTitle}</h1>
        </header>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-6">
            <ColorInput
              title={t.foregroundColor}
              initialColor={foregroundColor}
              onColorChange={setForegroundColor}
              translations={t}
            />
            
            <ColorInput
              title={t.backgroundColor}
              initialColor={backgroundColor}
              onColorChange={setBackgroundColor}
              translations={t}
            />
            
            <Card>
              <CardContent className="p-4">
                <div className="flex gap-2 flex-wrap">
                  <Button 
                    variant="outline" 
                    onClick={handleReset}
                  >
                    {t.reset}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleInvert}
                  >
                    {t.invert}
                  </Button>
                  <Button 
                    variant="default" 
                    onClick={handleRandom}
                  >
                    {t.random}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col gap-6">
            <ContrastResult 
              contrastRatio={contrastRatio} 
              translations={t}
            />
            
            <ColorPreview
              foregroundColor={foregroundColor}
              backgroundColor={backgroundColor}
              translations={t}
            />
          </div>
        </div>
        
        <footer className="mt-12 text-center text-muted-foreground">
          <p>
            ValidaCor - {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
