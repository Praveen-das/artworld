import { Typography } from "@mui/material";

function Td({ children, sx, ...props }) {
  return (
    <Typography
      variant="body2"
      component="td"
      sx={{
        ...sx,
        p: 2,
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export default Td;
