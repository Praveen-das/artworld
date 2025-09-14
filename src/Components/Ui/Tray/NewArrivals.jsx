import "./tray.css";
import { useProductQuery } from "../../../Hooks/useProducts";
import { Box, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Carousal } from "../Carousal/Carousal";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { grey } from "@mui/material/colors";
import FancyTypography from "../FancyTypography";
import { MainTitle } from "../MainTitle";
import { gap, landingMotionProps, spacing, vSpacing } from "../../../const";
import useMediaQuery from "../../../Hooks/useMediaQuery";
import Card from "../Card/Card2";
import { useRef } from "react";
import { useInView, motion } from "framer-motion";
import TitleWithCTA from "../TitleWithCTA";

const path = new URLSearchParams();
path.append("order", "createdAt_desc");

function NewArrivals() {
  const { data = [] } = useProductQuery("new-arrivals", "/products?" + path.toString());
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
      mt={vSpacing}
      sx={{
        position: "relative",
        width: "100%",
        display: "grid",
        gap,
        px: spacing,
        boxSizing: "border-box",
      }}
    >
      <TitleWithCTA label="NEW ARRIVALS" onClick={handleNavigate} />

      <Box sx={{ height: 400 }}>
        <Carousal data={data} slidesPerView={matches ? 3 : 2} CardElm={Card} />
      </Box>
    </Box>
  );
}

export default NewArrivals;
