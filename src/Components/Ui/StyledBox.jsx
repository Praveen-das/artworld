
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import { Link } from "react-router-dom";

const StyledTypography = styled(Typography)({
  color: "white",
  fontSize: 16,
  fontWeight: 500,
  position: "relative",
  zIndex: 2,
});

const StyledBox = styled(({ className, ...props }) => (
  <Box component={Link} {...props} className={className + " styledBox"} />
))({
  position: "relative",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-end",
  paddingBottom: "2rem",
  width: "100%",
  textAlign: "center",
  transition: "0.5s",
  overflow: "hidden",
  cursor: "pointer",
  backgroundSize: "cover",
  borderRadius: 80,
  backgroundPosition: "center",
  "::before": {
    content: "''",
    position: "absolute",
    inset: 0,
    background: "hsl(0deg 0% 0% / 80%)",
    transition: "0.5s",
  },
  ":hover": {
    transition: "1s",
    width: "300%",
    "::before": {
      background: "hsl(0deg 0% 100% / 0%)",
    },
  },
  ":first-child": {
    width: "300%",
    "::before": {
      background: "hsl(0deg 0% 100% / 0%)",
    },
  },
});

export default StyledBox