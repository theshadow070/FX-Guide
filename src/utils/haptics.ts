/**
 * Utilitaire de retours haptiques Web pour sensation tactile native
 * Supporte un toggle ON/OFF mémorisé localement.
 */

let hapticEnabled = true;
if (typeof window !== 'undefined') {
  try {
    const stored = localStorage.getItem('fxguide_haptic_enabled');
    hapticEnabled = stored !== null ? stored === 'true' : true;
  } catch {
    hapticEnabled = true;
  }
}

export const setHapticEnabled = (val: boolean) => {
  hapticEnabled = val;
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('fxguide_haptic_enabled', String(val));
    } catch {}
  }
};

export const isHapticEnabled = () => hapticEnabled;

export const triggerHaptic = (type: 'light' | 'medium' | 'heavy' | 'selection' = 'light') => {
  if (!hapticEnabled) return;

  if (typeof window !== 'undefined' && 'vibrate' in navigator) {
    try {
      if (type === 'light' || type === 'selection') {
        navigator.vibrate(10);
      } else if (type === 'medium') {
        navigator.vibrate(20);
      } else if (type === 'heavy') {
        navigator.vibrate([20, 30, 20]);
      }
    } catch {
      // Ignorer silencieusement si la vibration n'est pas supportée
    }
  }
};
