import type { MediaResult } from "../redux/features/searchSlice";

interface ResultCardProps {
  result: MediaResult;
}

const ResultCard = ({ result }: ResultCardProps) => (
  <a
    href={result.sourceUrl}
    target="_blank"
    rel="noreferrer"
    aria-label={`Open ${result.title}`}
    className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:-translate-y-1 hover:border-amber-300/40 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200"
  >
    <img
      src={result.imageUrl}
      alt={result.title}
      loading="lazy"
      className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-[1.03]"
    />
    <p className="truncate px-4 py-3 text-sm text-white/80">{result.title}</p>
  </a>
);

export default ResultCard;
