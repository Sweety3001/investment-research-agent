"use client";

import { InvestmentReport }
from "@/types";

interface Props {
  reports: InvestmentReport[];
}

export default function ResearchHistory({
  reports,
}: Props) {

  if (!reports.length) {
    return null;
  }

  return (
    <div className="
      rounded-3xl
      border border-white/10
      bg-white/5
      backdrop-blur-xl
      p-8
    ">
      <h2 className="
        text-2xl font-bold text-white
      ">
        Recent Research
      </h2>

      <div className="
        mt-6
        space-y-4
      ">
        {reports.map(
          (report, index) => (
            <div
              key={index}
              className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-4
              "
            >
              <div className="
                flex justify-between
              ">
                <div>
                  <h3 className="
                    text-white
                    font-semibold
                  ">
                    {
                      report.company.name
                    }
                  </h3>

                  <p className="
                    text-slate-400
                  ">
                    {
                      report.company.ticker
                    }
                  </p>
                </div>

                <div className="
                  text-right
                ">
                  <p className="
                    text-white
                  ">
                    {
                      report.committee
                        .recommendation
                    }
                  </p>

                  <p className="
                    text-slate-400
                    text-sm
                  ">
                    {
                      new Date(
                        report.generatedAt
                      ).toLocaleDateString()
                    }
                  </p>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}