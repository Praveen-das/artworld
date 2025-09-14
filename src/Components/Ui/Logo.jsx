import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Logo({ hideLabel = false, label = "Artworld" }) {
  return (
    <Box display="flex" alignItems="center" gap={1} component={Link} to="/">
      <Box component="img" src="logo.svg" sx={{ width: 20, height: 20 }}></Box>
      {!hideLabel && <Typography fontWeight={800}>{label}</Typography>}
    </Box>
  );
}

export default Logo;
