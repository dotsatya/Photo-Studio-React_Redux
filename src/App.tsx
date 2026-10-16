// import { fetchPhotos } from "./api/mediaApi";
import SearchBar from "./components/SearchBar";
import Tabs from "./components/Tabs";
import ResultGrid from "./components/ResultGrid";

const App = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col items-center gap-4">
      {/* App
      <button onClick={() => fetchPhotos('cat', 1)}> Get</button> */}

      <SearchBar />
      <Tabs />
      <ResultGrid />
    </div>
  );
};

export default App;
