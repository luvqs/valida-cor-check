
import { Translations } from '@/utils/languageUtils';
import ColorInput from '@/components/ColorInput';
import { useIsMobile } from '@/hooks/use-mobile';

interface ColorControlsProps {
  foregroundColor: string;
  backgroundColor: string;
  setForegroundColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  translations: Translations;
}

const ColorControls = ({ 
  foregroundColor, 
  backgroundColor, 
  setForegroundColor, 
  setBackgroundColor, 
  translations 
}: ColorControlsProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${!isMobile ? 'max-w-[70%] mx-auto' : ''}`}>
      <div>
        <ColorInput
          title={translations.foregroundColor}
          initialColor={foregroundColor}
          onColorChange={setForegroundColor}
          translations={translations}
        />
      </div>
      
      <div>
        <ColorInput
          title={translations.backgroundColor}
          initialColor={backgroundColor}
          onColorChange={setBackgroundColor}
          translations={translations}
        />
      </div>
    </div>
  );
};

export default ColorControls;
