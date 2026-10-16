import { useState, type FormEvent } from "react";
import { useDispatch } from "react-redux";
import { setQuery } from "../redux/features/searchSlice";

const SearchBar = () => {

  const dispatch = useDispatch();

  const [text, setText] = useState("");
  
  const formHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(text);
    dispatch(setQuery(text));
  };

  return (
    <form
      className="mx-auto flex w-full max-w-2xl items-center gap-2 rounded-2xl border border-white/10 bg-white/5 p-2 shadow-lg shadow-black/20 transition focus-within:border-amber-300/60 focus-within:ring-4 focus-within:ring-amber-300/10"
      onSubmit={formHandler}
      role="search"
    >
      <label className="sr-only" htmlFor="media-search">
        Search photos and GIFs
      </label>
      <svg
        aria-hidden="true"
        className="ml-3 h-5 w-5 shrink-0 text-white/45"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <circle cx="11" cy="11" r="7" />
        <path strokeLinecap="round" d="m16 16 4 4" />
      </svg>
      <input
        id="media-search"
        type="text"
        placeholder="Search photos and GIFs..."
        className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-white/40"
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
      />
      <button
        className="shrink-0 rounded-xl bg-amber-300 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 active:scale-[0.98]"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
