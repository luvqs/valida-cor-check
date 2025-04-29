
import { Flag } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
      <Button
        variant="outline"
        size="sm"
        className={`flex items-center gap-1 language-toggle-btn border-2 bg-transparent ${currentLanguage === 'pt-BR' ? 'active' : ''}`}
        onClick={() => onLanguageChange('pt-BR')}
        style={{ color: 'currentcolor', borderColor: 'currentcolor' }}
      >
        <Flag className="h-4 w-4" />
        <span>BR</span>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className={`flex items-center gap-1 language-toggle-btn border-2 bg-transparent ${currentLanguage === 'en-US' ? 'active' : ''}`}
        onClick={() => onLanguageChange('en-US')}
        style={{ color: 'currentcolor', borderColor: 'currentcolor' }}
      >
        <Flag className="h-4 w-4" />
        <span>EN</span>
      </Button>
    </div>
  );
};

export default LanguageToggle;
