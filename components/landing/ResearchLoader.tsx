"use client";

const stages = [
  "Business Analyst reviewing business quality...",
  "Financial Analyst reviewing financial metrics...",
  "Risk Analyst evaluating downside risks...",
  "Market Analyst analyzing market momentum...",
  "News Analyst reviewing recent developments...",
  "Valuation Analyst estimating fair value...",
  "Investment Committee preparing recommendation...",
];

export default function ResearchLoader() {
  return (
    <div className="mt-12 w-full max-w-3xl mx-auto">
      <div className="
        rounded-3xl
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-8
      ">
        <div className="flex items-center gap-3 mb-8">
          <div className="
            h-4 w-4
            rounded-full
            bg-indigo-500
            animate-pulse
          " />

          <h2 className="
            text-2xl
            font-semibold
            text-white
          ">
            AlphaForge Research Team Working
          </h2>
        </div>

        <div className="space-y-4">
          {stages.map((stage) => (
            <div
              key={stage}
              className="
                flex
                items-center
                gap-4
                rounded-xl
                bg-white/5
                p-4
              "
            >
              <div className="
                h-3
                w-3
                rounded-full
                bg-indigo-400
                animate-pulse
              " />

              <p className="text-slate-300">
                {stage}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}