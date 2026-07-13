interface Source {
  name: string;
  url: string;
  type: string;
}

interface SourcesCardProps {
  sources: Source[];
}

export default function SourcesCard({
  sources,
}: SourcesCardProps) {
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
      <h2 className="text-2xl font-bold text-white">
        Sources & References
      </h2>

      <p className="text-slate-400 mt-2">
        Data providers and articles used
        during analysis.
      </p>

      <div className="mt-6 space-y-4">
        {sources.map((source, index) => (
          <a
            key={index}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border border-white/10
              bg-white/5
              p-4
              hover:bg-white/10
              transition-all
            "
          >
            <div>
              <p className="text-white">
                {source.name}
              </p>

              <p className="text-slate-400 text-sm">
                {source.type}
              </p>
            </div>

            <span className="text-indigo-400">
              ↗
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}