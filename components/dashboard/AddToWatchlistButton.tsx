"use client";

interface Props {
  ticker: string;
  name: string;
}

export default function
AddToWatchlistButton({
  ticker,
  name,
}: Props) {

  async function add() {
    await fetch(
      "/api/v1/watchlist",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          ticker,
          name,
        }),
      }
    );
  }

  return (
    <button
      onClick={add}
      className="
        rounded-xl
        bg-emerald-600
        px-4
        py-2
        text-white
      "
    >
      Add To Watchlist
    </button>
  );
}