import { Box, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CheckIcon from "@mui/icons-material/Check";
import React from "react";

function OnboardingStatus({ title, icon: Icon, active, completed, error, index }) {
  const theme = useTheme();

  const borderColor = completed
    ? "rgb(22 163 74)"
    : error
    ? "#ffb3b2"
    : active
    ? theme.palette.primary.light
    : theme.palette.grey[300];

  const fontColor = completed
    ? "rgb(22 163 74)"
    : error
    ? theme.palette.error.light
    : active
    ? "var(--brand)"
    : theme.palette.grey[800];

  const iconColor = completed
    ? "rgb(22 163 74)"
    : error
    ? theme.palette.error.light
    : active
    ? "var(--brand)"
    : "rgb(209 213 219)";

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        border: `1px solid ${borderColor}`,
        borderRadius: 3,
        cursor: "pointer",
        color: fontColor,
        transition: "0.2s",
        "&:hover": { transform: "scale(1.02)" },
      }}
    >
      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            width: 40,
            height: 40,
            bgcolor: iconColor,
            borderRadius: 999999,
            color: active || completed ? "white" : "",
          }}
        >
          {completed ? (
            <CheckIcon fontSize="small" />
          ) : (
            <Typography color="inherit" fontSize={12} fontWeight={500}>
              {index + 1}
            </Typography>
          )}
        </Box>
        <Typography color="inherit" fontSize={15} fontWeight={600}>
          {title}
        </Typography>
      </Box>
      <div style={{ color: iconColor }}>
        <Icon color="inherit" fontSize="medium" />
      </div>
    </Box>
  );
}

export default OnboardingStatus;
