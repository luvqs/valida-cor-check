
import { useState, useEffect } from 'react';
import { Translations } from '@/utils/languageUtils';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeftRight, Copy } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();

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

  const handleCopyUrl = () => {
    const url = new URL(window.location.href);
    // Clear any existing query parameters
    url.search = '';
    // Add the current colors as query parameters
    url.searchParams.set('fg', foregroundColor);
    url.searchParams.set('bg', backgroundColor);
    
    navigator.clipboard.writeText(url.toString())
      .then(() => {
        toast({
          title: translations.copied || "Copied!",
          description: translations.urlCopied || "URL with current colors copied to clipboard",
        });
      })
      .catch(() => {
        toast({
          title: translations.error || "Error",
          description: translations.copyFailed || "Failed to copy URL",
          variant: "destructive",
        });
      });
  };

  return (
    <div 
      className="w-full h-full flex flex-col items-center justify-center p-8"
      style={{
        backgroundColor: backgroundColor,
        color: foregroundColor,
      }}
    >
      <div className="max-w-2xl mx-auto w-full">
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
            <Tooltip>
              <TooltipTrigger asChild>
                <Copy 
                  className="w-5 h-5 cursor-pointer hover:bg-white hover:text-[#020817] rounded p-0.5 transition-all duration-300" 
                  onClick={handleCopyUrl}
                />
              </TooltipTrigger>
              <TooltipContent>
                {translations.copyUrl || "Copy URL with colors"}
              </TooltipContent>
            </Tooltip>
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
