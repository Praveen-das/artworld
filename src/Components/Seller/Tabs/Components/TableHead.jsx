import { Typography } from "@mui/material";

function TableHead({ children, sx, ...props }) {
  return (
    <Typography
      sx={{
        p: 2,
        textTransform: "uppercase",
        color: "white",
        fontWeight: 600,
        borderBottom: { sm: "1px solid rgba(0, 0, 0, 0.12)" },
        ...sx,
      }}
      variant="caption"
      component="th"
      {...props}
    >
      {children}
    </Typography>
  );
}

export default TableHead;
