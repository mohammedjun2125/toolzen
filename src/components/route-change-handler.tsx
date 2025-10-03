'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { refreshAds } from '@/lib/utils/ezoic';

export function RouteChangeHandler() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // The combination of pathname and searchParams covers most navigation events.
    refreshAds();
  }, [pathname, searchParams]);

  return null;
}
