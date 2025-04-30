
import { Bird, Earth } from 'lucide-react';
import { Language } from '@/utils/languageUtils';
import { useIsMobile } from '@/hooks/use-mobile';

interface LanguageToggleProps {
  currentLanguage: Language;
  onLanguageChange: (language: Language) => void;
  foregroundColor?: string;
}

const LanguageToggle = ({
  currentLanguage,
  onLanguageChange,
  foregroundColor
}: LanguageToggleProps) => {
  return (
    <div className="flex items-center gap-4">
      <Bird
        className="w-[40px] h-[40px] cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#020817] rounded-md p-1"
        onClick={() => onLanguageChange('pt-BR')}
        style={{ color: foregroundColor }}
      />
      <Earth
        className="w-[40px] h-[40px] cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#020817] rounded-md p-1"
        onClick={() => onLanguageChange('en-US')}
        style={{ color: foregroundColor }}
      />
    </div>
  );
};

export default LanguageToggle;
