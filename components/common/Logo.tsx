import { TrendingUp } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-md">
        <TrendingUp className="h-5 w-5" />
      </div>

      <div className="flex flex-col leading-none">
        <span className="text-xl font-bold tracking-tight">
          AlphaForge
        </span>

        <span className="text-xs font-medium uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          AI
        </span>
      </div>
    </div>
  );
}