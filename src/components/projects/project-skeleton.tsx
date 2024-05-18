export const ProjectSkeleton = () => (
  <div className="flex-col items-start p-4 mt-3 bg-cyan-50/50 rounded-lg ">
    <div className="animate-pulse flex space-y-2.5 flex-col">
      <div className="flex justify-between">
        <div className="rounded-full bg-slate-500/30 h-5 w-20" />
        <div className="flex gap-2.5">
          <div className="rounded-full bg-slate-500/30 h-5 w-5" />
          <div className="rounded-full bg-slate-500/30 h-5 w-5" />
          <div className="rounded-full bg-slate-500/30 h-5 w-5" />
        </div>
      </div>
      <div className="space-y-0.5">
        <div className="rounded-full bg-slate-500/30 h-3.5 w-60" />
        <div className="rounded-full bg-slate-500/30 h-3.5 w-40" />
      </div>
      <div className="flex justify-between pt-1">
        <div className="rounded-full bg-slate-500/30 h-4 w-20" />
        <div className="flex -space-x-2">
          <div className="rounded-full bg-slate-500/30 h-5 w-5" />
          <div className="rounded-full bg-slate-500/30 h-5 w-5" />
          <div className="rounded-full bg-slate-500/30 h-5 w-5" />
        </div>
      </div>
    </div>
  </div>
);
