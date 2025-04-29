
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ColorInput from '@/components/ColorInput';
import ColorPreview from '@/components/ColorPreview';
import LanguageToggle from '@/components/LanguageToggle';
import { getContrastRatio, generateContrastingPair, getComplianceLevel } from '@/utils/colorUtils';
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

  const complianceLevel = getComplianceLevel(contrastRatio);
  
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor }}>
      <header className="p-4 flex justify-between">
        <h1 className="text-xl font-bold" style={{ color: foregroundColor }}>
          ValidaCor
        </h1>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-foreground">{t.contrastRatio}</h2>
                    <div className="text-3xl font-bold flex items-center gap-2">
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

                  <div className="text-sm text-muted-foreground">
                    <div className="grid grid-cols-2 gap-x-2">
                      <div>{t.normalText}:</div>
                      <div>{contrastRatio >= 4.5 ? '✓' : '✗'} AA</div>
                      <div></div>
                      <div>{contrastRatio >= 7 ? '✓' : '✗'} AAA</div>
                    </div>
                    <div className="grid grid-cols-2 gap-x-2 mt-1">
                      <div>{t.largeText}:</div>
                      <div>{contrastRatio >= 3 ? '✓' : '✗'} AA</div>
                      <div></div>
                      <div>{contrastRatio >= 4.5 ? '✓' : '✗'} AAA</div>
                    </div>
                  </div>
                </div>
                
                <ColorInput
                  title={t.foregroundColor}
                  initialColor={foregroundColor}
                  onColorChange={setForegroundColor}
                  translations={t}
                />
              </div>
              
              <div>
                <div className="mb-6">
                  <div className="flex gap-2">
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
                </div>
                
                <ColorInput
                  title={t.backgroundColor}
                  initialColor={backgroundColor}
                  onColorChange={setBackgroundColor}
                  translations={t}
                />
              </div>
            </div>
            
            <footer className="mt-8 text-center text-muted-foreground">
              <p>
                ValidaCor - {new Date().getFullYear()}
              </p>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
