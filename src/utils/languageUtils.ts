
export type Language = 'pt-BR' | 'en-US';

export interface Translations {
  appTitle: string;
  foregroundColor: string;
  backgroundColor: string;
  contrastRatio: string;
  wcagCompliance: string;
  reset: string;
  invert: string;
  random: string;
  hexLabel: string;
  hueLabel: string;
  saturationLabel: string;
  lightnessLabel: string;
  contrastPreview: string;
  normalText: string;
  largeText: string;
  passesAALarge: string;
  passesAA: string;
  passesAAALarge: string;
  passesAAA: string;
  fails: string;
  testingContrast: string;
  typeYourTextHere: string;
  characters: string;
  onlyForLargeText: string;
  badCombination: string;
  excellent: string;
  decent: string;
}

export const translations: Record<Language, Translations> = {
  'pt-BR': {
    appTitle: 'ValidaCor - Validador de Contraste de Cores',
    foregroundColor: 'Cor de Texto',
    backgroundColor: 'Cor de Fundo',
    contrastRatio: 'Taxa de Contraste',
    wcagCompliance: 'Conformidade WCAG',
    reset: 'Redefinir',
    invert: 'Inverter',
    random: 'Aleatório',
    hexLabel: 'Hexadecimal',
    hueLabel: 'Matiz',
    saturationLabel: 'Saturação',
    lightnessLabel: 'Luminosidade',
    contrastPreview: 'Visualização do Contraste',
    normalText: 'Texto Normal',
    largeText: 'Texto Grande',
    passesAALarge: 'A',
    passesAA: 'AA',
    passesAAALarge: 'AAA (Grande)',
    passesAAA: 'AAA',
    fails: 'Ruim',
    testingContrast: 'Digite algum texto aqui para visualizar o contraste das cores.',
    typeYourTextHere: 'Digite seu texto aqui...',
    characters: 'caracteres',
    onlyForLargeText: 'Somente para texto grande ou espesso',
    badCombination: 'Combinação ruim',
    excellent: 'Excelente',
    decent: 'Bom'
  },
  'en-US': {
    appTitle: 'ValidaCor - Color Contrast Validator',
    foregroundColor: 'Text Color',
    backgroundColor: 'Background Color',
    contrastRatio: 'Contrast Ratio',
    wcagCompliance: 'WCAG Compliance',
    reset: 'Reset',
    invert: 'Invert',
    random: 'Random',
    hexLabel: 'Hexadecimal',
    hueLabel: 'Hue',
    saturationLabel: 'Saturation',
    lightnessLabel: 'Lightness',
    contrastPreview: 'Contrast Preview',
    normalText: 'Normal Text',
    largeText: 'Large Text',
    passesAALarge: 'A',
    passesAA: 'AA',
    passesAAALarge: 'AAA (Large)',
    passesAAA: 'AAA',
    fails: 'Fails',
    testingContrast: 'Type some text here to visualize the contrast of colors.',
    typeYourTextHere: 'Type your text here...',
    characters: 'characters',
    onlyForLargeText: 'Only for large or thick text',
    badCombination: 'Bad combination',
    excellent: 'Excellent',
    decent: 'Good'
  }
};
