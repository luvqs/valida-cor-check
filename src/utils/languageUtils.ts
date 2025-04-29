
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
    testingContrast: 'Testando contraste\n\nEste é um exemplo de texto para testar o contraste entre as cores selecionadas. Você pode editar este texto para ver como ficará com suas próprias palavras. O objetivo é garantir que o texto seja legível com o contraste atual.',
    typeYourTextHere: 'Digite seu texto aqui...'
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
    testingContrast: 'Testing contrast\n\nThis is a sample text to test the contrast between the selected colors. You can edit this text to see how it looks with your own words. The goal is to ensure the text is readable with the current contrast.',
    typeYourTextHere: 'Type your text here...'
  }
};
