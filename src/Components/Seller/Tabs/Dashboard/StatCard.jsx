import React from "react";
import Card from "../../../Ui/Card";
import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

function StatCard({ label, Icon, value, iconColor, query, bgcolor, onClick }) {
  return (
    <Box
      onClick={() => onClick(query)}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "1fr auto" },
        alignItems: "center",
        gap: 2,
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 1, sm: 2, md: 3 },
        borderRadius: 4,
        border: "1px solid transparent",
        boxShadow: "0 5px 10px 0 var(--brandLight100)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        bgcolor: { xs: iconColor, sm: "white" },
        "&:hover": {
          boxShadow: "0 10px 10px 0 var(--brandLight100)",
          borderColor: "var(--brandLight50)",
          transform: "translateY(-4px)",
        },
      }}
    >
      <Typography fontWeight={600} variant="body2" color={{ xs: "white", sm: grey[800] }}>
        {label}
      </Typography>
      <Box
        sx={{
          gridRow: "span 2",
          display: { xs: "none", sm: "grid" },
          placeItems: "center",
          p: 1.5,
          borderRadius: 3,
          color: "white",
          bgcolor: iconColor,
        }}
      >
        <Icon color="white" style={{ width: "1.5em", height: "1.5em" }} />
      </Box>
      <Typography fontSize="1.8em" variant="title.primary" color={{ xs: "white", sm: "black" }}>
        {value}
      </Typography>
    </Box>
  );
}

export default StatCard;
