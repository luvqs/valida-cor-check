
import { useState, useEffect } from 'react';
import { Translations } from '@/utils/languageUtils';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeftRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { SplashCursor } from '@/components/ui/splash-cursor';

interface ColorPreviewProps {
  foregroundColor: string;
  backgroundColor: string;
  translations: Translations;
  onSwitchColors: () => void;
}

const ColorPreview = ({
  foregroundColor,
  backgroundColor,
  translations,
  onSwitchColors
}: ColorPreviewProps) => {
  const [previewText, setPreviewText] = useState<string>(translations.testingContrast);
  const [charCount, setCharCount] = useState<number>(0);
  const maxChars = 200;
  const isMobile = useIsMobile();

  useEffect(() => {
    setPreviewText(translations.testingContrast);
  }, [translations]);

  useEffect(() => {
    setCharCount(previewText.length);
  }, [previewText]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setPreviewText(text);
      setCharCount(text.length);
    }
  };

  // Extract RGB values from hex color for the fluid simulation
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16) / 255,
      g: parseInt(result[2], 16) / 255,
      b: parseInt(result[3], 16) / 255
    } : { r: 0, g: 0, b: 0 };
  };

  const bgRgb = hexToRgb(backgroundColor);

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-8 relative"
      style={{
        backgroundColor: backgroundColor,
        color: foregroundColor,
      }}
    >
      <SplashCursor 
        DYE_RESOLUTION={1024}
        DENSITY_DISSIPATION={2.2}
        VELOCITY_DISSIPATION={1.8}
        PRESSURE={0.8}
        SPLAT_RADIUS={0.25}
        CURL={20}
        SPLAT_FORCE={8000}
        COLOR_UPDATE_SPEED={5}
        BACK_COLOR={bgRgb}
      />
      
      <div className="max-w-2xl mx-auto w-full relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-6xl font-bold mb-2">Aa aa AA</h1>
          <div className="flex justify-center items-center gap-4">
            <span className={isMobile ? "text-base font-bold" : "text-2xl font-bold"}>{foregroundColor}</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <ArrowLeftRight 
                  className="w-6 h-6 cursor-pointer hover:bg-white hover:text-[#020817] rounded p-0.5 transition-all duration-300" 
                  onClick={onSwitchColors}
                />
              </TooltipTrigger>
              <TooltipContent>
                {translations.invert}
              </TooltipContent>
            </Tooltip>
            <span className={isMobile ? "text-base font-bold" : "text-2xl font-bold"}>{backgroundColor}</span>
          </div>
        </div>

        <div className="relative">
          <Textarea
            value={previewText}
            onChange={handleTextChange}
            className="w-full text-xl bg-transparent border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-current placeholder-opacity-50 h-auto max-h-32 overflow-hidden"
            style={{ color: foregroundColor }}
            placeholder={translations.typeYourTextHere}
            maxLength={maxChars}
          />
          <div className="text-sm opacity-70 text-right mt-1">
            {charCount} / {maxChars} {translations.characters}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPreview;
