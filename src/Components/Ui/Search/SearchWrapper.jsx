import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProductSearch } from "../../../Hooks/useProducts";
import { useRecentSearches } from "../../../Store/useRecentSearches";
import Search from "./Search";
import { useFilter } from "../../Layouts/Sidebar/useFilter";

/**
 * @property {'inline' | 'default'} mode
 */

function SearchWrapper({ mode, onSearch }) {
  const [query, setQuery] = useState("");
  const { data: products = [] } = useProductSearch(query);
  const setRecentSearches = useRecentSearches((s) => s.setRecentSearches);
  const navigate = useNavigate();
  const { deleteFilter } = useFilter();

  function clearQuery() {
    deleteFilter("q");
  }

  return (
    <Search
      results={products}
      onInput={(value) => setQuery("q=" + value)}
      onSearch={(query) => {
        if (mode === "inline") return onSearch(query);
        setRecentSearches(query);
        navigate(`/results?q=${query}`);
      }}
      onClear={clearQuery}
      mode={mode}
    />
  );
}

export default SearchWrapper;
