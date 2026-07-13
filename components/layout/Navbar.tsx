export default function Navbar() {
  return (
    <header className="
      sticky top-0 z-50
      backdrop-blur-xl
      border-b border-white/10
      bg-black/20
    ">
      <div className="
        max-w-7xl mx-auto
        px-6 py-4
        flex justify-between items-center
      ">
        <div>
          <h1 className="text-2xl font-bold">
            AlphaForge AI
          </h1>

          <p className="text-sm text-slate-400">
            Multi-Agent Equity Research
          </p>
        </div>

        <div className="
          px-4 py-2 rounded-full
          border border-indigo-500/30
          bg-indigo-500/10
          text-indigo-300 text-sm
        ">
          Gemini 2.5 Flash
        </div>
      </div>
    </header>
  );
}