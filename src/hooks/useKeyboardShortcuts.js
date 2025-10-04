import { useEffect } from 'react';

export const useKeyboardShortcuts = (shortcuts) => {
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Build key combination string
      const keys = [];
      if (e.ctrlKey) keys.push('ctrl');
      if (e.altKey) keys.push('alt');
      if (e.shiftKey) keys.push('shift');
      keys.push(e.key.toLowerCase());
      
      const combination = keys.join('+');

      // Check if this combination has a handler
      if (shortcuts[combination]) {
        e.preventDefault();
        shortcuts[combination]();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [shortcuts]);
};

// Usage example:
// useKeyboardShortcuts({
//   'ctrl+l': () => console.log('Clear screen'),
//   'ctrl+c': () => console.log('Cancel'),
//   'ctrl+m': () => console.log('Toggle monitor'),
// });