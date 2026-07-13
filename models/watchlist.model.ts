import mongoose from "mongoose";

const WatchlistSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        default: "My Watchlist",
      },

      companies: [
  {
    ticker: String,
    name: String,

    recommendation: {
      type: String,
      default: "HOLD",
    },

    score: {
      type: Number,
      default: 0,
    },

    lastAnalyzed: Date,
  },
],
    },
    {
      timestamps: true,
    }
  );

export const Watchlist =
  mongoose.models.Watchlist ||
  mongoose.model(
    "Watchlist",
    WatchlistSchema
  );