import { Box, Dialog, IconButton } from "@mui/material";
import { ArrowLeft, Search as SearchIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import Card from "../Card";
import "./search.css";
import SearchResults from "./SearchResults";

function Search({
  onInput = () => null,
  onSearch,
  onClear = () => null,
  results = [],
  placeholder = "Search for Paintings",
  mode = "dropdown",
}) {
  const [query, setQuery] = useState("");
  const [dropdown, setDropdown] = useState(false);

  const input = useRef();
  const timer = useRef;

  const handleInput = (e) => {
    clearTimeout(timer.current);
    setQuery(e.target.value);

    timer.current = setTimeout(() => {
      onInput(e.target.value);
    }, 300);
  };

  const handleQuery = () => {
    if (query !== "") {
      if (onSearch) {
        onSearch(query);
        clearQuery();
      }
      return;
    }
  };

  const handleKeyUp = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      handleQuery();
    }
  };

  function clearQuery() {
    setQuery("");
    setDropdown(false);

    input.current.blur();
    input.current.blur();
  }

  function handleClearingQuery() {
    onClear();
    clearQuery();
  }

  function handleSelect(selectedQuery) {
    onSearch(selectedQuery);
    setQuery(selectedQuery);
    setDropdown(false);
  }

  return (
    <>
      <Box sx={{ overflow: "visible" }} id="search_wrapper">
        <Box id="searchbox_wrapper">
          <Box p={0.75} display="flex">
            <SearchIcon size={20} />
          </Box>
          <input
            onClick={() => setDropdown(true)}
            id="searchbox"
            type="text"
            autoComplete="off"
            onInput={handleInput}
            onKeyUp={handleKeyUp}
            value={query}
            ref={input}
            placeholder={placeholder}
          />
          {query && (
            <IconButton size="small" onClick={handleClearingQuery}>
              <X size={20} />
            </IconButton>
          )}
        </Box>

        {mode === "dropdown" && (
          <>
            {dropdown && (
              <Card
                sx={{
                  position: "absolute",
                  left: 0,
                  top: "100%",
                  width: "100%",
                  bgcolor: "background.paper",
                  zIndex: 1,
                  boxShadow: "0 5px 10px 0px #0000002b",
                  py: 2,
                }}
              >
                <SearchResults query={query} results={results} onSelect={handleSelect} />
              </Card>
            )}

            {dropdown && <Box onClick={() => setDropdown(false)} sx={{ position: "fixed", inset: 0 }} />}
          </>
        )}

        {mode === "dialog" && (
          <Dialog open={dropdown} onClose={() => setDropdown(false)}>
            <Box sx={{ position: "fixed", inset: 0, width: "100%", height: "100%", bgcolor: "white" }}>
              <Box display="flex" alignItems="center" px={2} py={2}>
                <IconButton size="small" onClick={() => setDropdown(false)} sx={{ mr: 2 }}>
                  <ArrowLeft size={20} />
                </IconButton>

                <SearchIcon size={20} />

                <Box
                  component="input"
                  onClick={() => setDropdown(true)}
                  id="searchbox"
                  type="text"
                  autoComplete="off"
                  onInput={(e) => handleInput(e)}
                  onKeyUp={(e) => handleKeyUp(e)}
                  value={query}
                  ref={input}
                  placeholder={placeholder}
                  sx={{
                    fontSize: "15px !important",
                    fontWeight: "400 !important",
                    px: 2,
                  }}
                />
                {query && (
                  <IconButton size="small" onClick={() => setQuery("")}>
                    <X size={20} />
                  </IconButton>
                )}
              </Box>

              <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
                <SearchResults query={query} results={results} onSelect={handleSelect} />
              </Box>
            </Box>
          </Dialog>
        )}
      </Box>
    </>
  );
}

export default Search;
