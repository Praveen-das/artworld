import create from "zustand";
import { persist } from "zustand/middleware";

const store = (set, get) => {
  return {
    recentSearches: [],
    setRecentSearches: (query) => {
      let recentSearches = get().recentSearches;

      if (recentSearches.length === 3) {
        recentSearches.pop();
      }

      recentSearches = recentSearches.filter((q) => q !== query);

      set({ recentSearches: [query, ...recentSearches] });
    },
    clearRecentSearches: () => set({ recentSearches: [] }),
  };
};

export const useRecentSearches = create(persist(store, { name: "recent-searches" }));
