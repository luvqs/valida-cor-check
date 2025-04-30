
import { useState, useCallback } from 'react';
import { generateContrastingPair } from '@/utils/colorUtils';

type HistoryItem = {
  foregroundColor: string;
  backgroundColor: string;
};

export function useColorState(initialForeground = '#FFB57E', initialBackground = '#01212C') {
  const [foregroundColor, setForegroundColor] = useState(initialForeground);
  const [backgroundColor, setBackgroundColor] = useState(initialBackground);
  const [history, setHistory] = useState<HistoryItem[]>([
    { foregroundColor: initialForeground, backgroundColor: initialBackground }
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  
  const saveToHistory = useCallback((fg: string, bg: string) => {
    if (fg === history[historyIndex]?.foregroundColor && bg === history[historyIndex]?.backgroundColor) return;
    
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ foregroundColor: fg, backgroundColor: bg });
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  }, [history, historyIndex]);

  const updateColors = useCallback((fg: string, bg: string) => {
    setForegroundColor(fg);
    setBackgroundColor(bg);
    saveToHistory(fg, bg);
  }, [saveToHistory]);

  const handleReset = useCallback(() => {
    updateColors(initialForeground, initialBackground);
  }, [updateColors]);
  
  const handleInvert = useCallback(() => {
    updateColors(backgroundColor, foregroundColor);
  }, [updateColors, backgroundColor, foregroundColor]);
  
  const handleRandom = useCallback(() => {
    const { foreground, background } = generateContrastingPair();
    updateColors(foreground.hex, background.hex);
  }, [updateColors]);
  
  const handleUndo = useCallback(() => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevItem = history[prevIndex];
      setForegroundColor(prevItem.foregroundColor);
      setBackgroundColor(prevItem.backgroundColor);
      setHistoryIndex(prevIndex);
    }
  }, [history, historyIndex]);

  return {
    foregroundColor,
    backgroundColor,
    setForegroundColor,
    setBackgroundColor,
    updateColors,
    handleReset,
    handleInvert,
    handleRandom,
    handleUndo
  };
}
