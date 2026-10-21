function Bone({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-md bg-border/70 ${className}`} />
  );
}

export function AdminHeadingSkeleton() {
  return (
    <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div className="max-w-2xl space-y-3">
        <Bone className="h-3 w-28" />
        <Bone className="h-8 w-72" />
        <Bone className="h-4 w-full max-w-md" />
      </div>
      <Bone className="h-11 w-40 shrink-0" />
    </div>
  );
}

export function AdminCardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="space-y-4 rounded-lg border border-border bg-white p-5 sm:p-6"
        >
          <div className="flex items-center justify-between gap-3">
            <Bone className="h-5 w-20 rounded-full" />
            <Bone className="h-3 w-16" />
          </div>
          <Bone className="h-5 w-3/4" />
          <Bone className="h-4 w-full" />
          <Bone className="h-4 w-5/6" />
        </div>
      ))}
    </div>
  );
}

export function AdminListSkeleton({ rows = 4 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="flex flex-col justify-between gap-4 rounded-md border border-border bg-white p-5 sm:flex-row sm:items-center"
        >
          <div className="min-w-0 space-y-2">
            <Bone className="h-4 w-40" />
            <Bone className="h-3 w-56" />
          </div>
          <Bone className="h-9 w-28" />
        </div>
      ))}
    </div>
  );
}

export function AdminContentSkeleton() {
  return (
    <div aria-hidden="true">
      <AdminHeadingSkeleton />
      <AdminCardGridSkeleton />
    </div>
  );
}

export function AdminShellSkeleton() {
  return (
    <div aria-hidden="true" className="min-h-screen bg-[#f4f6f8]">
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-[248px] lg:flex-col lg:bg-navy">
        <div className="flex items-center gap-3 border-b border-white/10 px-6 py-7">
          <Bone className="size-11 rounded-full bg-white/15" />
          <div className="space-y-2">
            <Bone className="h-3 w-20 bg-white/15" />
            <Bone className="h-2.5 w-28 bg-white/10" />
          </div>
        </div>
        <div className="space-y-2 px-4 py-7">
          {Array.from({ length: 7 }, (_, index) => (
            <Bone key={index} className="h-10 w-full bg-white/10" />
          ))}
        </div>
      </div>
      <div className="min-w-0 lg:pl-[248px]">
        <div className="min-h-[76px] border-b border-border bg-white px-5 sm:px-8 lg:px-10" />
        <main className="mx-auto min-w-0 max-w-[1440px] px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
          <AdminContentSkeleton />
        </main>
      </div>
    </div>
  );
}
