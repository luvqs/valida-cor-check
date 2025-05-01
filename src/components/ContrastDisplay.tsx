
import { Translations } from '@/utils/languageUtils';
import { getComplianceLevel } from '@/utils/colorUtils';
import { useIsMobile } from '@/hooks/use-mobile';

interface ContrastDisplayProps {
  contrastRatio: number;
  language: string;
  t: Translations;
}

const ContrastDisplay = ({ contrastRatio, language, t }: ContrastDisplayProps) => {
  const complianceLevel = getComplianceLevel(contrastRatio);
  const isMobile = useIsMobile();
  
  const getComplianceLevelDisplayText = (level: string) => {
    if (language === 'pt-BR') {
      switch(level) {
        case 'fail': return 'Ruim';
        case 'aa-large': return 'A';
        case 'aa': return 'AA';
        case 'aaa': return 'AAA';
        default: return level.toUpperCase();
      }
    }
    return level.toUpperCase();
  };
  
  const getComplianceLevelDescription = (level: string) => {
    if (language === 'pt-BR') {
      switch(level) {
        case 'fail': return t.badCombination;
        case 'aa-large': return t.onlyForLargeText;
        case 'aa': return t.decent;
        case 'aaa': return t.excellent;
        default: return '';
      }
    } else {
      switch(level) {
        case 'fail': return 'Bad combination';
        case 'aa-large': return 'Only for large or thick text';
        case 'aa': return 'Decent';
        case 'aaa': return 'Excellent';
        default: return '';
      }
    }
  };

  return (
    <div className="text-center mb-6 py-6">
      {isMobile ? (
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {t.contrastRatio}
          </span>
          <span className="text-5xl font-bold">{contrastRatio}:1</span>
          <div className="flex flex-col items-center">
            <span 
              className={`text-3xl px-2 py-1 rounded ${
                complianceLevel === 'aaa' ? 'text-success bg-success/10' : 
                complianceLevel === 'aa' ? 'text-warning bg-warning/10' : 
                complianceLevel === 'aa-large' ? 'text-warning bg-warning/10' : 
                'text-destructive bg-destructive/10'
              }`}
            >
              {getComplianceLevelDisplayText(complianceLevel)}
            </span>
            <span className="text-sm text-muted-foreground mt-1">
              {getComplianceLevelDescription(complianceLevel)}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center gap-2">
          <span className="text-sm text-muted-foreground">
            {t.contrastRatio}:
          </span>
          <span className="text-5xl font-bold">{contrastRatio}:1</span>
          <div className="flex items-center">
            <span 
              className={`text-3xl px-2 py-1 rounded ${
                complianceLevel === 'aaa' ? 'text-success bg-success/10' : 
                complianceLevel === 'aa' ? 'text-warning bg-warning/10' : 
                complianceLevel === 'aa-large' ? 'text-warning bg-warning/10' : 
                'text-destructive bg-destructive/10'
              }`}
            >
              {getComplianceLevelDisplayText(complianceLevel)}
            </span>
            <span className="text-sm text-muted-foreground ml-2">
              {getComplianceLevelDescription(complianceLevel)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContrastDisplay;
