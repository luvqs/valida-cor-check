
import { useState, useEffect } from 'react';
import { Translations } from '@/utils/languageUtils';
import { Textarea } from '@/components/ui/textarea';
import { RefreshCw } from 'lucide-react';

interface ColorPreviewProps {
  foregroundColor: string;
  backgroundColor: string;
  translations: Translations;
}

const ColorPreview = ({
  foregroundColor,
  backgroundColor,
  translations
}: ColorPreviewProps) => {
  const [previewText, setPreviewText] = useState<string>(translations.testingContrast);
  const [charCount, setCharCount] = useState<number>(0);
  const maxChars = 200;

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
          <h1 className="text-6xl font-bold mb-2">Aa</h1>
          <div className="text-4xl font-bold flex justify-center items-center gap-2">
            <span>{foregroundColor}</span>
            <RefreshCw className="w-6 h-6" />
            <span>{backgroundColor}</span>
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
