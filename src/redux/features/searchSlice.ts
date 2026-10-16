import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface MediaResult {
  id: string;
  imageUrl: string;
  title: string;
  sourceUrl: string;
}

interface SearchState {
  query: string;
  activeTab: "photos" | "videos" | "gifs";
  results: MediaResult[];
  currentPage: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const initialState: SearchState = {
  query: "",
  activeTab: "photos",
  results: [],
  currentPage: 1,
  totalPages: 0,
  loading: false,
  error: null,
};

interface SearchResultsPayload {
  results: MediaResult[];
  totalPages: number;
}

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
      state.currentPage = 1;
    },
    setActiveTab: (state, action: PayloadAction<SearchState["activeTab"]>) => {
      state.activeTab = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setResults: (state, action: PayloadAction<SearchResultsPayload>) => {
      state.results = action.payload.results;
      state.totalPages = action.payload.totalPages;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  setQuery,
  setActiveTab,
  setPage,
  setResults,
  setLoading,
  setError,
} = searchSlice.actions;
export default searchSlice.reducer;
