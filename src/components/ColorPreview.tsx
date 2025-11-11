
import { useState, useEffect, useRef } from 'react';
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
  onForegroundChange: (color: string) => void;
  onBackgroundChange: (color: string) => void;
}

const ColorPreview = ({
  foregroundColor,
  backgroundColor,
  translations,
  onSwitchColors,
  onForegroundChange,
  onBackgroundChange
}: ColorPreviewProps) => {
  const isMobile = useIsMobile();
  const maxChars = isMobile ? 50 : 200;
  
  const [previewText, setPreviewText] = useState<string>('');
  const [charCount, setCharCount] = useState<number>(0);
  const [editingForeground, setEditingForeground] = useState(false);
  const [editingBackground, setEditingBackground] = useState(false);
  const [tempForeground, setTempForeground] = useState(foregroundColor);
  const [tempBackground, setTempBackground] = useState(backgroundColor);
  const fgInputRef = useRef<HTMLInputElement>(null);
  const bgInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const initialText = isMobile ? 'Digite algum texto aqui...' : translations.testingContrast;
    setPreviewText(initialText);
  }, [translations, isMobile]);

  useEffect(() => {
    setCharCount(previewText.length);
  }, [previewText]);

  useEffect(() => {
    setTempForeground(foregroundColor);
  }, [foregroundColor]);

  useEffect(() => {
    setTempBackground(backgroundColor);
  }, [backgroundColor]);

  useEffect(() => {
    if (editingForeground && fgInputRef.current) {
      fgInputRef.current.focus();
      fgInputRef.current.select();
    }
  }, [editingForeground]);

  useEffect(() => {
    if (editingBackground && bgInputRef.current) {
      bgInputRef.current.focus();
      bgInputRef.current.select();
    }
  }, [editingBackground]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    if (text.length <= maxChars) {
      setPreviewText(text);
      setCharCount(text.length);
    }
  };

  const handleForegroundEdit = () => {
    setEditingForeground(true);
  };

  const handleBackgroundEdit = () => {
    setEditingBackground(true);
  };

  const handleForegroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempForeground(e.target.value);
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempBackground(e.target.value);
  };

  const handleForegroundBlur = () => {
    setEditingForeground(false);
    if (/^#[0-9A-F]{6}$/i.test(tempForeground)) {
      onForegroundChange(tempForeground);
    } else {
      setTempForeground(foregroundColor);
    }
  };

  const handleBackgroundBlur = () => {
    setEditingBackground(false);
    if (/^#[0-9A-F]{6}$/i.test(tempBackground)) {
      onBackgroundChange(tempBackground);
    } else {
      setTempBackground(backgroundColor);
    }
  };

  const handleForegroundKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleForegroundBlur();
    } else if (e.key === 'Escape') {
      setTempForeground(foregroundColor);
      setEditingForeground(false);
    }
  };

  const handleBackgroundKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBackgroundBlur();
    } else if (e.key === 'Escape') {
      setTempBackground(backgroundColor);
      setEditingBackground(false);
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
            {editingForeground ? (
              <input
                ref={fgInputRef}
                type="text"
                value={tempForeground}
                onChange={handleForegroundChange}
                onBlur={handleForegroundBlur}
                onKeyDown={handleForegroundKeyDown}
                className={isMobile ? "text-base font-bold bg-transparent border-b-2 border-current outline-none text-center w-24" : "text-2xl font-bold bg-transparent border-b-2 border-current outline-none text-center w-32"}
                style={{ color: foregroundColor }}
              />
            ) : (
              <span 
                className={isMobile ? "text-base font-bold cursor-pointer hover:opacity-70 transition-opacity" : "text-2xl font-bold cursor-pointer hover:opacity-70 transition-opacity"}
                onClick={handleForegroundEdit}
              >
                {foregroundColor}
              </span>
            )}
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
            {editingBackground ? (
              <input
                ref={bgInputRef}
                type="text"
                value={tempBackground}
                onChange={handleBackgroundChange}
                onBlur={handleBackgroundBlur}
                onKeyDown={handleBackgroundKeyDown}
                className={isMobile ? "text-base font-bold bg-transparent border-b-2 border-current outline-none text-center w-24" : "text-2xl font-bold bg-transparent border-b-2 border-current outline-none text-center w-32"}
                style={{ color: foregroundColor }}
              />
            ) : (
              <span 
                className={isMobile ? "text-base font-bold cursor-pointer hover:opacity-70 transition-opacity" : "text-2xl font-bold cursor-pointer hover:opacity-70 transition-opacity"}
                onClick={handleBackgroundEdit}
              >
                {backgroundColor}
              </span>
            )}
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
