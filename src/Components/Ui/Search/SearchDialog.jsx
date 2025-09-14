import { Box, Dialog, IconButton } from "@mui/material";
import { ArrowLeft, Search as SearchIcon, X } from "lucide-react";
import { useRef, useState } from "react";
import "./search.css";
import SearchResults from "./SearchResults";

function SearchDialog({
  onInput = () => null,
  onSearch,
  results = [],
  placeholder = "Search for Paintings",
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const input = useRef();
  const timer = useRef;

  const handleSearch = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") return handleQuery();

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
        setQuery("");
        setOpen(false);
        input.current.blur();
      }
      return;
    }
  };

  return (
    <>
      <IconButton size="small" onClick={() => setOpen(true)}>
        <SearchIcon size={20} />
      </IconButton>

      <Dialog open={open}>
        <Box sx={{ position: "fixed", inset: 0, width: "100%", height: "100%", bgcolor: "white" }}>
          <Box display="flex" alignItems="center" px={2} py={2}>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ mr: 2 }}>
              <ArrowLeft size={20} />
            </IconButton>

            <SearchIcon size={20} />

            <Box
              component="input"
              onFocus={() => setOpen(true)}
              id="searchbox"
              type="text"
              autoComplete="off"
              onInput={(e) => handleSearch(e)}
              onKeyUp={(e) => handleSearch(e)}
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
            <SearchResults
              query={query}
              results={results}
              onSelect={(selectedQuery) => {
                onSearch(selectedQuery);
                setOpen(false);
              }}
            />
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

export default SearchDialog;
