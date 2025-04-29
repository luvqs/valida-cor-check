
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { hexToHsl, hslToHex, isValidHex } from '@/utils/colorUtils';
import { Translations } from '@/utils/languageUtils';

interface ColorInputProps {
  title: string;
  initialColor: string;
  onColorChange: (color: string) => void;
  translations: Translations;
}

const ColorInput = ({
  title,
  initialColor,
  onColorChange,
  translations
}: ColorInputProps) => {
  const [hexValue, setHexValue] = useState(initialColor);
  const [hsl, setHsl] = useState(hexToHsl(initialColor));
  const [isValidInput, setIsValidInput] = useState(true);

  useEffect(() => {
    setHexValue(initialColor);
    setHsl(hexToHsl(initialColor));
  }, [initialColor]);

  const handleHexChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newHex = e.target.value;
    setHexValue(newHex);
    
    if (isValidHex(newHex)) {
      setIsValidInput(true);
      setHsl(hexToHsl(newHex));
      onColorChange(newHex);
    } else {
      setIsValidInput(false);
    }
  };

  const handleHslChange = (
    property: 'h' | 's' | 'l',
    value: number
  ) => {
    const newHsl = { ...hsl, [property]: value };
    setHsl(newHsl);
    
    const newHex = hslToHex(newHsl.h, newHsl.s, newHsl.l);
    setHexValue(newHex);
    onColorChange(newHex);
  };

  return (
    <Card className="w-full shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">{title}</h3>
            <div 
              className="w-8 h-8 rounded border"
              style={{ backgroundColor: hexValue }}
            ></div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${title}-hex`}>{translations.hexLabel}</Label>
            <Input
              id={`${title}-hex`}
              value={hexValue}
              onChange={handleHexChange}
              className={isValidInput ? '' : 'border-red-500'}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={`${title}-hue`}>{translations.hueLabel}</Label>
              <span className="text-sm text-muted-foreground">{hsl.h}°</span>
            </div>
            <input
              id={`${title}-hue`}
              type="range"
              min="0"
              max="360"
              value={hsl.h}
              onChange={(e) => handleHslChange('h', parseInt(e.target.value))}
              className="color-wheel"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={`${title}-saturation`}>{translations.saturationLabel}</Label>
              <span className="text-sm text-muted-foreground">{Math.round(hsl.s * 100)}%</span>
            </div>
            <input
              id={`${title}-saturation`}
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={hsl.s}
              onChange={(e) => handleHslChange('s', parseFloat(e.target.value))}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={`${title}-lightness`}>{translations.lightnessLabel}</Label>
              <span className="text-sm text-muted-foreground">{Math.round(hsl.l * 100)}%</span>
            </div>
            <input
              id={`${title}-lightness`}
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={hsl.l}
              onChange={(e) => handleHslChange('l', parseFloat(e.target.value))}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorInput;
