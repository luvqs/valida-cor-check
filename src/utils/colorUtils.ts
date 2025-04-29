// Validates a hex color code
export const isValidHex = (hex: string): boolean => {
  return /^#([A-Fa-f0-9]{6})$/.test(hex);
};

// Converts a hex color to RGB
export const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
};

// Converts RGB to hex
export const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
};

// Converts RGB to HSL
export const rgbToHsl = (
  r: number,
  g: number,
  b: number
): { h: number; s: number; l: number } => {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100) / 100,
    l: Math.round(l * 100) / 100,
  };
};

// Converts HSL to RGB
export const hslToRgb = (
  h: number,
  s: number,
  l: number
): { r: number; g: number; b: number } => {
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number): number => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, (h / 360) + 1 / 3);
    g = hue2rgb(p, q, h / 360);
    b = hue2rgb(p, q, (h / 360) - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
};

// Converts a hex color to HSL
export const hexToHsl = (hex: string): { h: number; s: number; l: number } => {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
};

// Converts HSL to hex
export const hslToHex = (h: number, s: number, l: number): string => {
  const rgb = hslToRgb(h, s, l);
  return rgbToHex(rgb.r, rgb.g, rgb.b);
};

// Calculates the relative luminance of a color using the WCAG formula
export const getRelativeLuminance = (rgb: { r: number; g: number; b: number }): number => {
  const { r, g, b } = rgb;
  
  // Normalize RGB values
  const sR = r / 255;
  const sG = g / 255;
  const sB = b / 255;
  
  // Calculate RGB values for luminance as per WCAG
  const R = sR <= 0.03928 ? sR / 12.92 : Math.pow((sR + 0.055) / 1.055, 2.4);
  const G = sG <= 0.03928 ? sG / 12.92 : Math.pow((sG + 0.055) / 1.055, 2.4);
  const B = sB <= 0.03928 ? sB / 12.92 : Math.pow((sB + 0.055) / 1.055, 2.4);
  
  // Calculate the luminance
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
};

// Calculates contrast ratio between two colors using WCAG formula
export const getContrastRatio = (color1: string, color2: string): number => {
  const lum1 = getRelativeLuminance(hexToRgb(color1));
  const lum2 = getRelativeLuminance(hexToRgb(color2));
  
  // Determine which luminance is lighter and which is darker
  const lighter = Math.max(lum1, lum2);
  const darker = Math.min(lum1, lum2);
  
  // Calculate contrast ratio: (L1 + 0.05) / (L2 + 0.05)
  const ratio = (lighter + 0.05) / (darker + 0.05);
  
  // Return the ratio rounded to 2 decimal places
  return Math.round(ratio * 100) / 100;
};

// Determines WCAG compliance level based on contrast ratio
export type ComplianceLevel = 'fail' | 'aa-large' | 'aa' | 'aaa';

export const getComplianceLevel = (ratio: number): ComplianceLevel => {
  if (ratio >= 7) {
    return 'aaa'; // AAA for normal text, AAA for large text
  } else if (ratio >= 4.5) {
    return 'aa'; // AA for normal text, AAA for large text
  } else if (ratio >= 3) {
    return 'aa-large'; // Fail for normal text, AA for large text
  } else {
    return 'fail'; // Fail for both normal and large text
  }
};

// Generate a random color in HSL that's not too dark or too light
export const generateRandomColor = (): { h: number; s: number; l: number } => {
  const h = Math.floor(Math.random() * 360);
  const s = Math.random() * 0.6 + 0.4; // Between 0.4 and 1.0
  const l = Math.random() * 0.6 + 0.2; // Between 0.2 and 0.8
  return { h, s, l };
};

// Generate a contrasting pair of colors that meets at least AA standard
export const generateContrastingPair = (): { 
  foreground: { hex: string; h: number; s: number; l: number }; 
  background: { hex: string; h: number; s: number; l: number }; 
} => {
  let foreColor, backColor;
  let contrast = 0;
  
  // Keep generating pairs until we get sufficient contrast
  do {
    foreColor = generateRandomColor();
    backColor = generateRandomColor();
    
    // Make sure one color is lighter than 0.5 and one is darker than 0.5
    if (foreColor.l > 0.5 && backColor.l > 0.5) {
      backColor.l = Math.random() * 0.3 + 0.1; // Make background darker
    } else if (foreColor.l < 0.5 && backColor.l < 0.5) {
      backColor.l = Math.random() * 0.3 + 0.7; // Make background lighter
    }
    
    const foreHex = hslToHex(foreColor.h, foreColor.s, foreColor.l);
    const backHex = hslToHex(backColor.h, backColor.s, backColor.l);
    contrast = getContrastRatio(foreHex, backHex);
  } while (contrast < 4.5); // Minimum AA standard for normal text
  
  return {
    foreground: {
      hex: hslToHex(foreColor.h, foreColor.s, foreColor.l),
      h: foreColor.h,
      s: foreColor.s,
      l: foreColor.l
    },
    background: {
      hex: hslToHex(backColor.h, backColor.s, backColor.l),
      h: backColor.h,
      s: backColor.s,
      l: backColor.l
    }
  };
};
