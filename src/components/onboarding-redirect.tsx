'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface OnboardingRedirectProps {
  isOnboarded: boolean;
}

export function OnboardingRedirect({ isOnboarded }: OnboardingRedirectProps) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isOnboarded && !pathname.includes('/onboarding')) {
      router.push('/dashboard/onboarding');
    }
  }, [isOnboarded, pathname, router]);

  return null;
}
