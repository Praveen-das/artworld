import { Box, Button } from "@mui/material";
import React from "react";
import { MainTitle } from "./MainTitle";
import { ArrowRight } from "lucide-react";

function TitleWithCTA({ label, onClick }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        color: "black",
        gap: 2,
      }}
    >
      <MainTitle>{label}</MainTitle>
      {onClick && (
        <Button
          onClick={onClick}
          variant="text"
          sx={{
            borderRadius: 99999,
            textTransform: "unset",
            color: "inherit",
            whiteSpace: "nowrap",
            "&:hover #arrow_icon": {
              translate: "200%",
              // transition:'0.2s'
            },
          }}
          endIcon={
            <Box sx={{ pr: 1, overflow: "hidden" }}>
              <Box
                id="arrow_icon"
                sx={{ position: "relative", display: "flex", alignItems: "center", transition: "0.2s" }}
              >
                <ArrowRight style={{ width: "0.8em", height: "0.8em", position: "absolute", top: 0, left: "-200%" }} />
                <ArrowRight style={{ width: "0.8em", height: "0.8em" }} />
              </Box>
            </Box>
          }
        >
          View all
        </Button>
      )}
    </Box>
  );
}

export default TitleWithCTA;
