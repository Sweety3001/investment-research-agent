import { CompanyProfile } from "@/types";
import { formatMarketCap } from "@/lib/utils/format";
import Image from "next/image";
import AddToWatchlistButton from "./AddToWatchlistButton";
interface CompanyHeroProps {
  company: CompanyProfile;
}

export default function CompanyHero({
  company,
}: CompanyHeroProps) {
  return (
    
    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
      <div className="flex justify-between items-start">
        <div>
          {company.logo && (
            <Image
  src={company.logo}
  alt={company.name}
  width={72}
  height={72}
  className="rounded-2xl bg-white p-2"
/>
          )}

          <p className="mt-2 text-slate-400">
            {company.ticker} • {company.exchange}
          </p>

          <p className="text-slate-400">
            {company.industry} • {company.country}
          </p>
        </div>

        <div className="text-right">
          <p className="text-slate-400 text-sm">
            Market Cap
          </p>

          <p className="text-2xl font-semibold text-white">
            {formatMarketCap(company.marketCap)}
          </p>

          <p className="mt-4 text-slate-400 text-sm">
            IPO
          </p>

          <p className="text-white">
            {company.ipo}
          </p>
        </div>
      </div>
      <AddToWatchlistButton
  ticker={company.ticker}
  name={company.name}
/>
    </div>
  );
}