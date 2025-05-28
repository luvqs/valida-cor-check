
import { useState, useEffect } from 'react';
import { Translations } from '@/utils/languageUtils';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeftRight } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';

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
  const isMobile = useIsMobile();
  const maxChars = isMobile ? 50 : 200;
  
  const [previewText, setPreviewText] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);

  useEffect(() => {
    const initialText = isMobile ? 'Digite algum texto aqui...' : translations.testingContrast;
    setPreviewText(initialText);
  }, [translations, isMobile]);

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

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-8 relative"
      style={{
        backgroundColor: backgroundColor,
        color: foregroundColor,
      }}
    >
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
            placeholder={isMobile ? 'Digite seu texto aqui...' : translations.typeYourTextHere}
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
