
import { useEffect } from 'react';

interface KeyboardShortcutProps {
  onUndo: () => void;
  onRedo?: () => void;
}

export function useKeyboardShortcuts({ onUndo, onRedo }: KeyboardShortcutProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Handle Ctrl+Z (undo)
      if (e.ctrlKey && !e.shiftKey && e.key === 'z') {
        e.preventDefault();
        onUndo();
      }
      
      // Handle Ctrl+Shift+Z (redo)
      if (e.ctrlKey && e.shiftKey && e.key === 'z') {
        e.preventDefault();
        if (onRedo) {
          onRedo();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onUndo, onRedo]);
}
