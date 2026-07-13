import SearchForm from "@/components/landing/SearchForm";
import GridBackground from "@/components/ui/GridBackground";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-black to-slate-900">
      <GridBackground />
      {/* Glow Effects */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-[140px]" />

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-emerald-500/20 blur-[140px]" />

      <div className="absolute top-1/2 left-1/2 h-96 w-96 rounded-full bg-purple-500/10 blur-[160px]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
  <SearchForm />
</div>

    </main>
  );
}