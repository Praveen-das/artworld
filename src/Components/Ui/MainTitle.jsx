import { Typography } from "@mui/material";
import { Children } from "react";

export const MainTitle = ({ children, sx, ...props }) => (
  <Typography variant="h3" fontWeight={600} lineHeight={1.3} mb={2} sx={{ sx }} {...props}>
    {children}
  </Typography>
);
