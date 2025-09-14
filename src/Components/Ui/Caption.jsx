import { Typography } from "@mui/material";

export const Caption = ({ children, ...props }) => (
  <Typography fontWeight={500} lineHeight={1.7} {...props}>
    {children}
  </Typography>
);
