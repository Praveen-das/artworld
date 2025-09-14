import { Card as _Card } from "@mui/material";

function Card({ sx, keepBorder = false, variant = "outlined", ...props }) {

  return (
    <_Card
      sx={{
        borderRadius: { xs: keepBorder ? 4 : 0, sm: 4 },
        boxShadow: "15px 15px 100px -10px var(--brandLight100)",
        ...sx,
      }}
      {...props}
    />
  );
}

export default Card;
