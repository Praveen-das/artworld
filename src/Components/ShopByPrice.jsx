import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import FancyTypography from "../Components/Ui/FancyTypography";
import { blue, green, grey, orange, pink, purple, red } from "@mui/material/colors";
import Card from "../Components/Ui/Card";
import { Caption } from "./Ui/Caption";
import { MainTitle } from "./Ui/MainTitle";
import { landingMotionProps, spacing, vSpacing } from "../const";

const priceRanges = [
  {
    label: "Under ₹ 10,000",
    url: 'shop?price_range=%7B"max"%3A10000%7D',
    color: `${green[400]}, ${green[600]}`,
  },
  {
    label: "₹ 10,000 - ₹ 50,000",
    url: 'shop?price_range=%7B"min"%3A10000%2C"max"%3A50000%7D',
    color: `${blue[400]}, ${blue[600]}`,
  },
  {
    label: "₹ 50,000 - ₹ 1,00,000",
    url: 'shop?price_range=%7B"min"%3A50000%2C"max"%3A100000%7D',
    color: `${purple[400]}, ${purple[600]}`,
  },
  {
    label: "₹ 1,00,000 - ₹ 3,00,000",
    url: 'shop?price_range=%7B"min"%3A100000%2C"max"%3A300000%7D',
    color: `${pink[400]}, ${pink[600]}`,
  },
  {
    label: "₹ 3,00,000 - ₹ 5,00,000",
    url: 'shop?price_range=%7B"min"%3A300000%2C"max"%3A500000%7D',
    color: `${orange[400]}, ${orange[600]}`,
  },
  {
    label: "₹ 5,00,000 - Above",
    url: 'shop?price_range=%7B"min"%3A300000%7D',
    color: `${red[400]}, ${red[600]}`,
  },
];

function ShopByPrice() {
  return (
    <Box
      {...landingMotionProps}
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        flexDirection: "column",
        gap: "var(--vGap)",
        mt: vSpacing,
        mx: spacing,
      }}
    >
      <Typography fontWeight={600} textTransform={"uppercase"} color="var(--brand)">
        Find Your Perfect Piece
      </Typography>
      <MainTitle mt={-3}>Art for Every Budget</MainTitle>
      <Caption>Explore artworks across different price ranges to find pieces that match your budget and taste</Caption>
      <Box
        sx={{
          width: "100%",
          boxSizing: "border-box",
          display: "grid",
          justifyContent: { xs: "center", md: "space-evenly" },
          gridTemplateColumns: { xs: "repeat(2,auto)", md: "repeat(3,auto)" },
          gap: { xs: 1, sm: 2, md: 4, xl: 4 },
          mt: "2em",
        }}
      >
        {priceRanges?.map(({ label, url, color }) => (
          <Link to={url} key={label}>
            <Card
              sx={{
                position: "relative",
                p: 3,
                height: "100%",
                borderRadius: { xs: 4, sm: 7 },
                transition: "all 0.5s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "scale(1.05)",
                  transformOrigin: "bottom center",
                },
                "&:hover .hoverOverlay": {
                  opacity: 0.1,
                },
              }}
            >
              <Box
                className="hoverOverlay"
                sx={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `linear-gradient(to bottom right, ${color})`,
                  transition: "opacity 0.2s ease",
                  pointerEvents: "none",
                  opacity: 0,
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "4px",
                  backgroundImage: `linear-gradient(to right, ${color})`,
                }}
              />

              {/* Actual content */}
              <Box
                sx={{
                  height: "100%",
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                  zIndex: 10,
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  sx={{
                    transition: "color 0.3s",
                    "&:hover": {
                      color: '"#1f2937"',
                    },
                  }}
                >
                  {label}
                </Typography>
                <Typography variant="caption" sx={{ color: grey[600] }} mt={2}>
                  Discover artworks in this range
                </Typography>
              </Box>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
}

export default ShopByPrice;
