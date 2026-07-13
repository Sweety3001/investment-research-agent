import mongoose from "mongoose";

const ReportSchema =
  new mongoose.Schema(
    {
      company: Object,

      generatedAt: Date,

      business: Object,

      financial: Object,

      market: Object,

      risk: Object,

      valuation: Object,

      committee: Object,

      news: Object,

      newsArticles: Array,

      sources: Array,
    },
    {
      timestamps: true,
    }
  );

export const Report =
  mongoose.models.Report ||
  mongoose.model(
    "Report",
    ReportSchema
  );