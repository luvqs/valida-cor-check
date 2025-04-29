
import { Card, CardContent } from '@/components/ui/card';
import { getComplianceLevel } from '@/utils/colorUtils';
import { Translations } from '@/utils/languageUtils';

interface ContrastResultProps {
  contrastRatio: number;
  translations: Translations;
}

const ContrastResult = ({ contrastRatio, translations }: ContrastResultProps) => {
  const complianceLevel = getComplianceLevel(contrastRatio);
  
  const getLevelText = (level: string) => {
    switch (level) {
      case 'aaa':
        return translations.passesAAA;
      case 'aa':
        return translations.passesAA;
      case 'aa-large':
        return translations.passesAALarge;
      default:
        return translations.fails;
    }
  };
  
  const getBadgeClass = () => {
    if (complianceLevel === 'aaa') return 'contrast-level-aaa';
    if (complianceLevel === 'aa' || complianceLevel === 'aa-large') return 'contrast-level-aa';
    return 'contrast-level-fail';
  };

  return (
    <Card className="shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{translations.contrastRatio}</h3>
            <div className="text-3xl font-bold">{contrastRatio}:1</div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">{translations.wcagCompliance}</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className={`contrast-level-badge ${getBadgeClass()}`}>
                  {getLevelText(complianceLevel)}
                </span>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <div className="grid grid-cols-2 gap-x-2">
                  <div>{translations.normalText}:</div>
                  <div>{contrastRatio >= 4.5 ? '✓' : '✗'} AA</div>
                  <div></div>
                  <div>{contrastRatio >= 7 ? '✓' : '✗'} AAA</div>
                </div>
                <div className="grid grid-cols-2 gap-x-2 mt-1">
                  <div>{translations.largeText}:</div>
                  <div>{contrastRatio >= 3 ? '✓' : '✗'} AA</div>
                  <div></div>
                  <div>{contrastRatio >= 4.5 ? '✓' : '✗'} AAA</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContrastResult;
