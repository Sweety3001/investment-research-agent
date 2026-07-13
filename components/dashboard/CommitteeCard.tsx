import { InvestmentDecision } from "@/types";

interface CommitteeCardProps {
  committee: InvestmentDecision;
}

export default function CommitteeCard({
  committee,
}: CommitteeCardProps) {

  const color =
    committee.recommendation === "INVEST"
      ? "text-emerald-400"
      : committee.recommendation === "HOLD"
      ? "text-yellow-400"
      : "text-red-400";

  const recommendationStyle = {
  INVEST:
    "text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,0.5)]",
  HOLD:
    "text-yellow-400 drop-shadow-[0_0_20px_rgba(234,179,8,0.5)]",
  PASS:
    "text-red-400 drop-shadow-[0_0_20px_rgba(239,68,68,0.5)]",
};    
  return (
    <div
      className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-8
      "
    >
      <p className="text-slate-400 uppercase tracking-widest text-sm">
        Investment Committee
      </p>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <h2
            className={`text-5xl font-bold ${recommendationStyle[committee.recommendation]}`}
          >
            {committee.recommendation}
          </h2>

          <p className="mt-4 text-slate-300">
            Confidence:
            {" "}
            {committee.confidence}%
          </p>

          <p className="text-slate-300">
            Overall Score:
            {" "}
            {committee.overallScore}/10
          </p>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-slate-400 text-sm mb-2">
          Committee Reasoning
        </p>

        <p className="text-slate-200 leading-7">
          {committee.reasoning}
        </p>
      </div>
    </div>
  );
}