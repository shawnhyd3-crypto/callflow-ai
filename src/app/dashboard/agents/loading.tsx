import { SkeletonCard } from '@/components/ui/skeleton';

export default function AgentsLoading() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header skeleton */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="h-10 w-48 bg-slate-800 rounded animate-pulse mb-2" />
            <div className="h-4 w-96 bg-slate-800 rounded animate-pulse" />
          </div>
          <div className="h-10 w-32 bg-slate-800 rounded animate-pulse" />
        </div>

        {/* Agent cards grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
