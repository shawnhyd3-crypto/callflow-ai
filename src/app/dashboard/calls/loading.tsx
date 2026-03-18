import { SkeletonTable } from '@/components/ui/skeleton';

export default function CallsLoading() {
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">
        {/* Header skeleton */}
        <div className="mb-8">
          <div className="h-10 w-48 bg-slate-800 rounded animate-pulse mb-2" />
          <div className="h-4 w-96 bg-slate-800 rounded animate-pulse" />
        </div>

        {/* Filters skeleton */}
        <div className="mb-6 flex gap-4">
          <div className="h-10 w-40 bg-slate-800 rounded animate-pulse" />
          <div className="h-10 w-40 bg-slate-800 rounded animate-pulse" />
          <div className="h-10 w-40 bg-slate-800 rounded animate-pulse" />
        </div>

        {/* Table skeleton */}
        <div className="card border border-slate-800">
          <div className="p-6">
            <SkeletonTable rows={10} columns={6} />
          </div>
        </div>
      </div>
    </div>
  );
}
