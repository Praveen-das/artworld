import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { landingMotionProps, spacing, vSpacing } from "../../../const";
import useMediaQuery from "../../../Hooks/useMediaQuery";
import { useProductQuery } from "../../../Hooks/useProducts";
import { Caption } from "../Caption";
import Card from "../Card/Card2";
import { Carousal } from "../Carousal/Carousal";
import TitleWithCTA from "../TitleWithCTA";
import "./tray.css";

const path = new URLSearchParams();
path.append("limit", 10);
path.append("sellingOption", "ORIGINAL");

function OriginalWorks() {
  const { data = [] } = useProductQuery("originals", "/products?" + path.toString());
  const matches = useMediaQuery("sm");
  const navigate = useNavigate();

  const handleNavigate = () => {
    const newpath = new URLSearchParams(path.toString());
    newpath.set("limit", 20);
    navigate("/shop?" + newpath.toString());
  };

  return (
    <Box
      {...landingMotionProps}
      sx={{
        position: "relative",
        width: "100%",
        display: "grid",
        gap: spacing,
        my: vSpacing,
        px: spacing,
        // overflow: 'hidden',
        boxSizing: "border-box",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          color: "black",
        }}
      >
        <TitleWithCTA label="ORIGINAL ARTWORKS" onClick={handleNavigate} />
        <Caption>Curated pieces that are one-of-a-kind, limited edition, or hidden gems waiting to be found.</Caption>
      </Box>

      <Box sx={{ height: "80vh" }}>
        <Carousal slidesPerView={matches ? 3 : 1} data={data} CardElm={Card} />
      </Box>
    </Box>
  );
}

export default OriginalWorks;
