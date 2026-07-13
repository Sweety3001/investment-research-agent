import { NewsArticle } from "@/types";

interface Props {
  articles: NewsArticle[];
}

export default function NewsTimeline({
  articles,
}: Props) {

  if (!articles.length) {
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
        text-2xl
        font-bold
        text-white
      ">
        Recent Developments
      </h2>

      <div className="
        mt-8
        space-y-8
      ">
        {articles.map((article, index) => (
          <div
            key={index}
            className="
              relative
              pl-8
              border-l
              border-indigo-500/20
            "
          >
            <div className="
              absolute
              left-[-6px]
              top-2
              h-3
              w-3
              rounded-full
              bg-indigo-500
            " />

            <p className="text-sm text-slate-500">
              {new Date(
                article.datetime * 1000
              ).toLocaleDateString()}
            </p>

            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-2
                block
                text-lg
                font-semibold
                text-white
                hover:text-indigo-400
                transition-colors
              "
            >
              {article.headline}
            </a>

            <p className="
              mt-3
              text-slate-400
              leading-7
            ">
              {article.summary}
            </p>

            <p className="
              mt-2
              text-indigo-400
              text-sm
            ">
              {article.source}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}