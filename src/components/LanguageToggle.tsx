
import { Earth } from 'lucide-react';
import { Language } from '@/utils/languageUtils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

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
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className="w-[40px] h-[40px] cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#020817] rounded-md p-1 flex items-center justify-center"
            onClick={() => onLanguageChange('pt-BR')}
            style={{ color: foregroundColor }}
          >
            <img 
              src="https://img.icons8.com/color/48/brazil-circular.png"
              alt="Português (Brasil)"
              className="w-6 h-6"
            />
          </button>
        </TooltipTrigger>
        <TooltipContent>
          {currentLanguage === 'pt-BR' ? 'Português (Brasil)' : 'Portuguese (Brazil)'}
        </TooltipContent>
      </Tooltip>
      
      <Tooltip>
        <TooltipTrigger asChild>
          <Earth
            className="w-[40px] h-[40px] cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#020817] rounded-md p-1"
            onClick={() => onLanguageChange('en-US')}
            style={{ color: foregroundColor }}
          />
        </TooltipTrigger>
        <TooltipContent>
          {currentLanguage === 'pt-BR' ? 'Inglês (EUA)' : 'English (USA)'}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default LanguageToggle;
