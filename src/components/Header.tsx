
import { Link } from 'react-router-dom';
import { UndoDot, ArrowLeftRight, Dices, Link as LinkIcon } from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';
import { Language } from '@/utils/languageUtils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface HeaderProps {
  language: Language;
  foregroundColor: string;
  backgroundColor: string;
  setLanguage: (language: Language) => void;
  onReset: () => void;
  onInvert: () => void;
  onRandom: () => void;
}

const Header = ({
  language,
  foregroundColor,
  setLanguage,
  onReset,
  onInvert,
  onRandom
}: HeaderProps) => {
  const isMobile = useIsMobile();
  const iconClass = "w-[40px] h-[40px] cursor-pointer transition-all duration-300 hover:bg-white hover:text-[#020817] rounded-md p-1";

  return (
    <header className="p-4 flex justify-between items-center">
      <div className="flex gap-6">
        {!isMobile && (
          <>
            <Tooltip>
              <TooltipTrigger asChild>
                <UndoDot 
                  className={iconClass}
                  style={{ color: foregroundColor }}
                  onClick={onReset}
                />
              </TooltipTrigger>
              <TooltipContent>
                {language === 'pt-BR' ? 'Redefinir cores' : 'Reset colors'}
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <ArrowLeftRight 
                  className={iconClass}
                  style={{ color: foregroundColor }}
                  onClick={onInvert}
                />
              </TooltipTrigger>
              <TooltipContent>
                {language === 'pt-BR' ? 'Inverter cores' : 'Invert colors'}
              </TooltipContent>
            </Tooltip>
          </>
        )}
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Dices 
              className={iconClass}
              style={{ color: foregroundColor }}
              onClick={onRandom}
            />
          </TooltipTrigger>
          <TooltipContent>
            {language === 'pt-BR' ? 'Cores aleatórias' : 'Random colors'}
          </TooltipContent>
        </Tooltip>
      </div>

      <div className="flex items-center gap-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <Link to="/about">
              <LinkIcon 
                className={iconClass}
                style={{ color: foregroundColor }}
              />
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            {language === 'pt-BR' ? 'Sobre o ValidaCor' : 'About ValidaCor'}
          </TooltipContent>
        </Tooltip>
        
        <LanguageToggle 
          currentLanguage={language} 
          onLanguageChange={setLanguage} 
          foregroundColor={foregroundColor}
        />
      </div>
    </header>
  );
};

export default Header;
