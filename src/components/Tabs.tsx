import { useDispatch, useSelector } from "react-redux";
import { setActiveTab } from "../redux/features/searchSlice";
import type { RootState } from "../redux/store";

const Tabs = () => {
  const tabs = [
    { label: "Photos", value: "photos" },
    { label: "Videos", value: "videos" },
    { label: "GIFs", value: "gifs" },
  ] as const;

  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.search.activeTab);

  return (
    <nav
      aria-label="Media type"
      className="inline-flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-1.5 shadow-lg shadow-black/20"
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;

        return (
        <button
          key={tab.value}
          type="button"
        //   aria-pressed={isActive} 
          onClick={() => dispatch(setActiveTab(tab.value))}
          className={`min-w-20 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-200 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 ${
            isActive
              ? "bg-amber-300 text-zinc-950 shadow-sm"
              : "text-white/60 hover:bg-white/10 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
        );
      })}
    </nav>
  );
};

export default Tabs;
