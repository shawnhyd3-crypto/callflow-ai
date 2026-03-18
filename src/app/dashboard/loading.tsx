import { Skeleton, SkeletonCard, SkeletonTable } from '@/components/ui/skeleton';

export default function DashboardLoading() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>

        {/* Stats grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[...Array(4)].map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>

        {/* Recent calls table skeleton */}
        <div className="card border border-slate-800">
          <div className="p-6">
            <Skeleton className="h-7 w-40 mb-6" />
            <SkeletonTable rows={5} columns={5} />
          </div>
        </div>
      </div>
    </div>
  );
}
