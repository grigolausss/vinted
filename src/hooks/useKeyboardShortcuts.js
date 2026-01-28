import { useEffect } from 'react';
import { useListingStore } from '../store/useListingStore';

export const useKeyboardShortcuts = () => {
  const state = useListingStore();

  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd/Ctrl + N: New Listing
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        state.resetForm();
      }

      // Cmd/Ctrl + C: Copy Complete (if ready)
      if ((e.metaKey || e.ctrlKey) && e.key === 'c' && !window.getSelection().toString()) {
        if (state.generatedTitle && state.generatedDescription) {
          e.preventDefault();
          const text = `${state.generatedTitle}\n\n${state.generatedDescription}`;
          navigator.clipboard.writeText(text);
          // We could trigger a notification here if we had a toast system
          console.log('Annuncio copiato via shortcut');
        }
      }

      // Cmd/Ctrl + S: Save to History
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        if (state.generatedTitle) {
          state.saveToHistory();
          console.log('Salvato in cronologia via shortcut');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state]);
};
