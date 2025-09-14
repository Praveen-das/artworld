import { Box, Typography } from "@mui/material";

export default function Title({ children }) {
  return (
    <Typography variant="h6" fontWeight="bold">
      {children}
    </Typography>
  );
}
