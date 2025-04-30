
import { Bird, Earth } from 'lucide-react';
import { Language } from '@/utils/languageUtils';
import { useIsMobile } from '@/hooks/use-mobile';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageToggle = ({
  currentLanguage,
  onLanguageChange
}: LanguageToggleProps) => {
  return (
    <div className="flex items-center gap-2">
      <Bird
        className={`h-5 w-5 cursor-pointer transition-all duration-300 ${currentLanguage === 'pt-BR' ? 'scale-105' : ''}`}
        onClick={() => onLanguageChange('pt-BR')}
      />
      <Earth
        className={`h-5 w-5 cursor-pointer transition-all duration-300 ${currentLanguage === 'en-US' ? 'scale-105' : ''}`}
        onClick={() => onLanguageChange('en-US')}
      />
    </div>
  );
};

export default LanguageToggle;
