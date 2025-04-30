
import { Translations } from '@/utils/languageUtils';
import { getComplianceLevel } from '@/utils/colorUtils';

interface ContrastDisplayProps {
  contrastRatio: number;
  language: string;
  t: Translations;
}

const ContrastDisplay = ({ contrastRatio, language, t }: ContrastDisplayProps) => {
  const complianceLevel = getComplianceLevel(contrastRatio);
  
  const getComplianceLevelDisplayText = (level: string) => {
    if (language === 'pt-BR') {
      switch(level) {
        case 'fail': return 'Tá bem ruim';
        case 'aa-large': return 'A (Fontes grandes)';
        case 'aa': return 'AA (Legalzinho)';
        case 'aaa': return 'AAA (Excelente)';
        default: return level.toUpperCase();
      }
    }
    return level.toUpperCase();
  };

  return (
    <div className="text-center mb-6 py-2">
      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-muted-foreground">
          {t.contrastRatio}:
        </span>
        <span className="text-5xl font-bold">{contrastRatio}:1</span>
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
      </div>
    </div>
  );
};

export default ContrastDisplay;
