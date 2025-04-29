
import { useState } from 'react';
import { Translations } from '@/utils/languageUtils';
import { Textarea } from '@/components/ui/textarea';

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
            <span>/</span>
            <span>{backgroundColor}</span>
          </div>
        </div>

        <Textarea
          value={previewText}
          onChange={(e) => setPreviewText(e.target.value)}
          className="w-full text-xl bg-transparent border-none resize-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder-current placeholder-opacity-50"
          style={{ color: foregroundColor }}
          placeholder={translations.typeYourTextHere}
        />
      </div>
    </div>
  );
};

export default ColorPreview;
