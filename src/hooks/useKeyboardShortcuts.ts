
import { useEffect } from 'react';

interface KeyboardShortcutProps {
  onUndo: () => void;
}

export function useKeyboardShortcuts({ onUndo }: KeyboardShortcutProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Ctrl+Z (undo)
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        onUndo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUndo]);
}
