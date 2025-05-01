
import React, { useState, useEffect, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

  const handleHexChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newHex = e.target.value.trim();
    
    // Add # if missing
    if (!newHex.startsWith('#') && newHex) {
      newHex = '#' + newHex;
    }
    
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
              className="w-8 h-8 rounded-full shadow-md border-2"
              style={{ backgroundColor: hexValue, borderColor: hexValue }}
            ></div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${title}-hex`} className="text-sm font-medium">{translations.hexLabel}</Label>
            <div className="relative">
              <Input
                id={`${title}-hex`}
                value={hexValue}
                onChange={handleHexChange}
                className={`bg-gray-50 border-2 font-mono text-base focus-visible:ring-2 focus-visible:ring-offset-1 pl-8 ${isValidInput ? 'border-gray-200 focus:border-primary' : 'border-red-500'}`}
              />
              <div 
                className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full"
                style={{ backgroundColor: hexValue }}
              ></div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={`${title}-hue`} className="text-sm font-medium">{translations.hueLabel}</Label>
              <span className="text-sm font-medium">{hsl.h}°</span>
            </div>
            <div className="p-1 bg-gray-50 rounded-md">
              <input
                id={`${title}-hue`}
                type="range"
                min="0"
                max="360"
                value={hsl.h}
                onChange={(e) => handleHslChange('h', parseInt(e.target.value))}
                className="color-wheel h-4 rounded-lg"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={`${title}-saturation`} className="text-sm font-medium">{translations.saturationLabel}</Label>
              <span className="text-sm font-medium">{Math.round(hsl.s * 100)}%</span>
            </div>
            <div className="p-1 bg-gray-50 rounded-md">
              <div className="relative">
                <input
                  id={`${title}-saturation`}
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={hsl.s}
                  onChange={(e) => handleHslChange('s', parseFloat(e.target.value))}
                  className="h-4 rounded-lg"
                  style={{
                    background: `linear-gradient(to right, 
                      ${hslToHex(hsl.h, 0, hsl.l)}, 
                      ${hslToHex(hsl.h, 1, hsl.l)})`,
                  }}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor={`${title}-lightness`} className="text-sm font-medium">{translations.lightnessLabel}</Label>
              <span className="text-sm font-medium">{Math.round(hsl.l * 100)}%</span>
            </div>
            <div className="p-1 bg-gray-50 rounded-md">
              <input
                id={`${title}-lightness`}
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={hsl.l}
                onChange={(e) => handleHslChange('l', parseFloat(e.target.value))}
                className="h-4 rounded-lg"
                style={{
                  background: `linear-gradient(to right, 
                    ${hslToHex(hsl.h, hsl.s, 0)}, 
                    ${hslToHex(hsl.h, hsl.s, 0.5)}, 
                    ${hslToHex(hsl.h, hsl.s, 1)})`,
                }}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ColorInput;
