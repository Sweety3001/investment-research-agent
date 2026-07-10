export function formatPercentage(
  value?: number
): string {
  if (value === undefined) {
    return "Unknown";
  }

  return `${value.toFixed(2)}%`;
}

export function formatRatio(
  value?: number
): string {
  if (value === undefined) {
    return "Unknown";
  }

  return value.toFixed(2);
}