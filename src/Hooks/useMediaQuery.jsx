import { useMediaQuery as useMediaQueryHandler } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React from "react";

function useMediaQuery(query = "xl") {
  const theme = useTheme();
  const matches = useMediaQueryHandler(theme.breakpoints.up(query));
  return matches;
}

export default useMediaQuery;
