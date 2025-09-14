import { useNavigate } from "react-router-dom";
import { useRecentSearches } from "../../../Store/useRecentSearches";
import useFacets from "../../../Hooks/useFacets";
import { Box, Chip, Divider, List, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { History, SearchIcon } from "lucide-react";

export default function SearchResults({ query, results, onSelect }) {
  const { recentSearches, clearRecentSearches } = useRecentSearches();
  const navigate = useNavigate();
  const {
    facets: { data },
    isFetching,
    isLoading,
  } = useFacets();
  const allSubjects = data?.allSubjects || [];

  return (
    <Box
      sx={{
        display: "grid",
        gap: 2,
      }}
    >
      <Box
        className="no-scrollbar"
        sx={{
          display: "flex",
          gap: 1,
          px: 1.5,
          overflowX: "scroll",
        }}
      >
        {allSubjects.map((s) => s && <Chip key={s.id} onClick={() => navigate(`/shop?collection=${s.id}`)} label={s.name} />)}
      </Box>
      <Divider />
      <List
        disablePadding
        subheader={
          query && (
            <Box px={2} display="flex" justifyContent="space-between" alignItems="center" gap={1}>
              <Typography variant="caption" lineHeight={2} sx={{ wordBreak: "break-all" }}>
                All the results For "{query}"
              </Typography>
              <Typography variant="caption" lineHeight={2} sx={{ whiteSpace: "nowrap", alignSelf: "baseline" }}>
                Press Enter &crarr;
              </Typography>
            </Box>
          )
        }
      >
        {Boolean(results.length)
          ? results.map(
              (result) =>
                result && (
                  <ListItemButton key={result.name} onClick={() => onSelect(result.name)}>
                    <ListItemIcon sx={{ minWidth: 0, mx: 2 }}>
                      <SearchIcon size={18} />
                    </ListItemIcon>
                    <ListItemText primary={result.name} />
                  </ListItemButton>
                )
            )
          : null}
      </List>

      {!!recentSearches.length && (
        <List
          disablePadding
          subheader={
            <Box display="flex" justifyContent="space-between" px={2}>
              <Typography variant="caption">Recents</Typography>
              <Typography
                onClick={clearRecentSearches}
                sx={{ "&:hover": { textDecoration: "underline" }, cursor: "pointer" }}
                variant="caption"
              >
                Delete all
              </Typography>
            </Box>
          }
        >
          {recentSearches.map((query) => (
            <ListItemButton key={query} onClick={() => onSelect(query)}>
              <ListItemIcon sx={{ minWidth: 0, mx: 2 }}>
                <History size={18} />
              </ListItemIcon>
              <ListItemText primary={query} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
