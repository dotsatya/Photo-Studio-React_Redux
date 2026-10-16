import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../redux/store";
import { fetchGIF, fetchPhotos } from "../api/mediaApi";
import {
  setError,
  setLoading,
  setPage,
  setResults,
  type MediaResult,
} from "../redux/features/searchSlice";
import ResultCard from "./ResultCard";

const ResultGrid = () => {
  const { query, activeTab, results, currentPage, totalPages, loading, error } = useSelector(
    (state: RootState) => state.search,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    let isCurrentRequest = true;
    const searchQuery = query.trim();

    const getData = async () => {
      if (!searchQuery || activeTab === "videos") {
        dispatch(setResults({ results: [], totalPages: 0 }));
        return;
      }

      dispatch(setLoading());

      try {
        let normalizedResults: MediaResult[];
        let pageCount: number;
        if (activeTab === "photos") {
          const response = await fetchPhotos(searchQuery, 20, currentPage);
          pageCount = response.total_pages;
          normalizedResults = response.results.flatMap((photo) => {
            const imageUrl = photo.urls.small;
            if (!imageUrl) return [];

            return [{
              id: photo.id,
              imageUrl,
              title: photo.alt_description || photo.description || "Photo",
              sourceUrl: photo.links.html || imageUrl,
            }];
          });
        } else {
          const response = await fetchGIF(searchQuery, 20, currentPage);
          pageCount = Math.ceil(response.pagination.total_count / 20);
          normalizedResults = response.data.flatMap((gif) => {
            const imageUrl = gif.images?.fixed_width?.url;
            if (!imageUrl) return [];

            return [{
              id: gif.id,
              imageUrl,
              title: gif.title || "GIF",
              sourceUrl: `https://giphy.com/gifs/${gif.id}`,
            }];
          });
        }

        if (isCurrentRequest) {
          dispatch(setResults({ results: normalizedResults, totalPages: pageCount }));
        }
      } catch (requestError) {
        if (!isCurrentRequest) return;
        const message =
          axios.isAxiosError(requestError) && requestError.response?.status === 401
            ? "The media API key is missing or invalid."
            : requestError instanceof Error
              ? requestError.message
              : "Something went wrong while loading results.";
        dispatch(setError(message));
      }
    };

    void getData();

    return () => {
      isCurrentRequest = false;
    };
  }, [query, activeTab, currentPage, dispatch]);

  const tabLabel = activeTab === "gifs" ? "GIFs" : "photos";
  const visiblePages = (() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    if (currentPage <= 3) return [1, 2, 3, 4, "ellipsis", totalPages] as const;
    if (currentPage >= totalPages - 2) {
      return [1, "ellipsis", totalPages - 3, totalPages - 2, totalPages - 1, totalPages] as const;
    }
    return [
      1,
      "ellipsis",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "ellipsis",
      totalPages,
    ] as const;
  })();

  return (
    <section aria-label="Search results" className="w-full max-w-6xl px-4 pb-10">
      {loading && (
        <p className="py-12 text-center text-sm text-white/60" role="status">
          Loading {tabLabel}...
        </p>
      )}

      {!loading && error && (
        <p className="py-12 text-center text-sm text-rose-300" role="alert">
          {error}
        </p>
      )}

      {!loading && !error && activeTab === "videos" && (
        <p className="py-12 text-center text-sm text-white/60">
          Video search is coming soon.
        </p>
      )}

      {!loading && !error && activeTab !== "videos" && query.trim() && results.length === 0 && (
        <p className="py-12 text-center text-sm text-white/60" role="status">
          No {tabLabel} found. Try another search.
        </p>
      )}

      {!loading && !error && !query.trim() && (
        <p className="py-12 text-center text-sm text-white/50">
          Search for something to explore.
        </p>
      )}

      {!loading && !error && results.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((result) => (
            <ResultCard key={result.id} result={result} />
          ))}
        </div>
      )}

      {!loading && !error && activeTab !== "videos" && results.length > 0 && totalPages > 1 && (
        <nav
          aria-label="Search results pages"
          className="mt-8 flex items-center justify-center gap-1.5"
        >
          <button
            type="button"
            aria-label="Go to previous page"
            disabled={currentPage === 1}
            onClick={() => dispatch(setPage(currentPage - 1))}
            className="flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm text-white/70 transition hover:border-amber-300/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/10 disabled:hover:text-white/70"
          >
            <span aria-hidden="true">‹</span>
            <span className="hidden sm:inline">Previous</span>
          </button>

          {visiblePages.map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                aria-hidden="true"
                className="flex h-10 w-8 items-center justify-center text-white/40"
              >
                …
              </span>
            ) : (
              <button
                key={page}
                type="button"
                aria-label={`Go to page ${page}`}
                aria-current={page === currentPage ? "page" : undefined}
                onClick={() => dispatch(setPage(page))}
                className={`h-10 min-w-10 rounded-xl border px-3 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 ${
                  page === currentPage
                    ? "border-amber-300 bg-amber-300 text-zinc-950"
                    : "border-white/10 text-white/70 hover:border-amber-300/40 hover:text-white"
                }`}
              >
                {page}
              </button>
            ),
          )}

          <button
            type="button"
            aria-label="Go to next page"
            disabled={currentPage === totalPages}
            onClick={() => dispatch(setPage(currentPage + 1))}
            className="flex h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm text-white/70 transition hover:border-amber-300/40 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-white/10 disabled:hover:text-white/70"
          >
            <span className="hidden sm:inline">Next</span>
            <span aria-hidden="true">›</span>
          </button>
        </nav>
      )}
    </section>
  );
};

export default ResultGrid;
