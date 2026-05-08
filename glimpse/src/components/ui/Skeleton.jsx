import { cn } from "../../lib/cn";

export function Skeleton({ className }) {
  return <div className={cn("skeleton", className)} />;
}

export function PostSkeleton() {
  return (
    <article className="rounded-2xl border border-app bg-surface p-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-2.5 w-20" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-3 w-11/12" />
        <Skeleton className="h-3 w-9/12" />
      </div>
      <Skeleton className="mt-4 h-64 w-full rounded-xl" />
      <div className="mt-4 flex gap-6">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-12" />
      </div>
    </article>
  );
}
