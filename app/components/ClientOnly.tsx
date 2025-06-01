import React, {useState, useEffect} from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * ClientOnly renders its children only on the client side, not during server-side rendering.
 * This is useful for components that rely on browser-only APIs like Konva.
 */
export function ClientOnly({children, fallback = null}: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
