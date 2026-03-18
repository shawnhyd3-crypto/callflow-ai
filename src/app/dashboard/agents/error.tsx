'use client';

import { useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

export default function AgentsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Agents Page Error]:', error);
  }, [error]);

  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        <div className="max-w-2xl">
          <div className="card border border-slate-800 bg-slate-900 p-8">
            <div className="flex items-start gap-4">
              <AlertCircle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h1 className="text-lg font-semibold text-slate-100">
                  Error loading agents
                </h1>
                <p className="mt-2 text-sm text-slate-400">
                  {error.message || 'Failed to load your agents. Please try again.'}
                </p>
                {error.digest && (
                  <p className="mt-3 text-xs text-slate-500 font-mono bg-slate-950 px-3 py-2 rounded">
                    Error ID: {error.digest}
                  </p>
                )}
                <button
                  onClick={reset}
                  className="btn btn-primary mt-4"
                >
                  Try again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
