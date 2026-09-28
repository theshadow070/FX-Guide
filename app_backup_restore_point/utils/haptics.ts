/**
 * Utilitaire de retours haptiques Web pour sensation tactile native
 */
export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'selection' = 'light') => {
  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (type === 'light' || type === 'selection') {
        navigator.vibrate(12);
      } else if (type === 'medium') {
        navigator.vibrate(22);
      } else if (type === 'heavy') {
        navigator.vibrate([25, 35, 25]);
      }
    } catch {
      // Ignorer silencieusement si la vibration n'est pas supportée
    }
  }
};
