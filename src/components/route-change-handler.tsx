
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function RouteChangeHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // This component can be used to run logic on route changes.
    // The previous sitemap ping logic was removed as it's not a recommended practice
    // to ping on every navigation.
  }, [pathname]);

  return null;
}
