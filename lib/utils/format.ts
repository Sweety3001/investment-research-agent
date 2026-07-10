export function formatMarketCap(
  marketCap: number
): string {

  if (marketCap >= 1_000_000) {
    return `${(marketCap / 1_000_000).toFixed(2)}T`;
  }

  if (marketCap >= 1_000) {
    return `${(marketCap / 1_000).toFixed(2)}B`;
  }

  return `${marketCap.toFixed(2)}M`;
}