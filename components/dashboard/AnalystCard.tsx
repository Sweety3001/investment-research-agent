import { AnalystOpinion } from "@/types";

interface AnalystCardProps {
  title: string;
  opinion: AnalystOpinion;
}

export default function AnalystCard({
  title,
  opinion,
}: AnalystCardProps) {

  const scoreColor =
  opinion.score >= 7
    ? "text-emerald-400 border-emerald-400/30 bg-emerald-500/10"
    : opinion.score >= 5
    ? "text-yellow-400 border-yellow-400/30 bg-yellow-500/10"
    : "text-red-400 border-red-400/30 bg-red-500/10";

  return (
    <div
      className="
rounded-3xl
border border-white/10
bg-white/[0.03]
backdrop-blur-xl
p-6
transition-all
duration-300
hover:scale-[1.02]
hover:border-indigo-500/30
hover:shadow-[0_0_40px_rgba(99,102,241,0.2)]
"
    >
     <div className="flex justify-between items-start">

  <div>
    <p className="text-slate-400 text-sm uppercase tracking-wider">
      {title}
    </p>

    <p className="mt-3 text-slate-300">
      Confidence
    </p>

    <p className="text-xl font-semibold text-white">
      {opinion.confidence}%
    </p>
  </div>

  <div
    className={`
      h-20
      w-20
      rounded-full
      border
      flex
      items-center
      justify-center
      text-2xl
      font-bold
      ${scoreColor}
    `}
  >
    {opinion.score}
  </div>
</div>

      <p className="mt-6 text-slate-300 line-clamp-4">
        {opinion.summary}
      </p>
    </div>
  );
}