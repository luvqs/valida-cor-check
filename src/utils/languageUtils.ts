
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
    passesAALarge: 'Passa AA (Texto Grande)',
    passesAA: 'Passa AA',
    passesAAALarge: 'Passa AAA (Texto Grande)',
    passesAAA: 'Passa AAA',
    fails: 'Falha',
    testingContrast: 'Digite alguma coisa aqui para você visualizar o contrates da frase que voce precisa testar.',
    typeYourTextHere: 'Digite seu texto aqui...',
    characters: 'caracteres'
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
    passesAALarge: 'Passes AA (Large Text)',
    passesAA: 'Passes AA',
    passesAAALarge: 'Passes AAA (Large Text)',
    passesAAA: 'Passes AAA',
    fails: 'Fails',
    testingContrast: 'Type something here to visualize the contrast of the phrase you need to test.',
    typeYourTextHere: 'Type your text here...',
    characters: 'characters'
  }
};
