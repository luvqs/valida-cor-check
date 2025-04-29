
import { Card, CardContent } from '@/components/ui/card';
import { Translations } from '@/utils/languageUtils';

interface ColorPreviewProps {
  foregroundColor: string;
  backgroundColor: string;
  translations: Translations;
}

const ColorPreview = ({
  foregroundColor,
  backgroundColor,
  translations
}: ColorPreviewProps) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-0">
        <div
          className="flex flex-col items-center justify-center p-6 h-full w-full"
          style={{
            backgroundColor: backgroundColor,
            color: foregroundColor,
          }}
        >
          <h3 className="text-2xl font-bold mb-4">
            {translations.contrastPreview}
          </h3>
          <p className="text-base mb-4">
            {translations.normalText} - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.
          </p>
          <p className="text-xl font-bold">
            {translations.largeText} - Lorem ipsum dolor sit amet.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorPreview;
