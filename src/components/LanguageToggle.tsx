
import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Language } from '@/utils/languageUtils';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const LanguageToggle = ({
  currentLanguage,
  onLanguageChange
}: LanguageToggleProps) => {
  return (
    <div className="absolute top-4 right-4 flex items-center gap-2">
      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-1 ${currentLanguage === 'pt-BR' ? 'bg-secondary' : ''}`}
        onClick={() => onLanguageChange('pt-BR')}
      >
        <Flag className="h-4 w-4" />
        <span>BR</span>
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`flex items-center gap-1 ${currentLanguage === 'en-US' ? 'bg-secondary' : ''}`}
        onClick={() => onLanguageChange('en-US')}
      >
        <Flag className="h-4 w-4" />
        <span>EN</span>
      </Button>
    </div>
  );
};

export default LanguageToggle;
