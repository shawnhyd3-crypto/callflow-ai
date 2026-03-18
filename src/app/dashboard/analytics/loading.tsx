import { SkeletonCard } from '@/components/ui/skeleton';

export default function AnalyticsLoading() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-10 w-48 bg-slate-800 rounded animate-pulse mb-2" />
          <div className="h-4 w-96 bg-slate-800 rounded animate-pulse" />
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Charts grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="card border border-slate-800 p-6">
              <div className="h-80 bg-slate-800 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
