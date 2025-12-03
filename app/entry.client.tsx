import {HydratedRouter} from 'react-router/dom';
import {StrictMode} from 'react';
import {hydrateRoot} from 'react-dom/client';

/**
 * Hydratation instantanée sans startTransition
 * - Élimine le délai d'hydratation
 * - Transitions CSS gérées via opacity dans root.tsx
 */
if (!window.location.origin.includes('webcache.googleusercontent.com')) {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>,
  );

  // Mark body as hydrated after hydration completes
  requestAnimationFrame(() => {
    document.body.classList.remove('hydrating');
    document.body.classList.add('hydrated');
  });
}
