'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Dashboard Error]:', error);
  }, [error]);

  return (
    <div className="flex h-screen items-center justify-center bg-slate-950 px-4">
      <div className="card max-w-md w-full border border-slate-800 bg-slate-900">
        <div className="flex items-start gap-4">
          <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-slate-100">
              Something went wrong
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {error.message || 'An unexpected error occurred while loading the dashboard.'}
            </p>
            {error.digest && (
              <p className="mt-3 text-xs text-slate-500 font-mono bg-slate-950 px-3 py-2 rounded">
                Error ID: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              className="btn btn-primary mt-4 w-full"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
