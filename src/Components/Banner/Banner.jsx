import { Box, Button, Grid, Typography } from "@mui/material";

import { motion, useSpring } from "framer-motion";
import { forwardRef, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import img1 from "../../Assets/Images/collections_section/1.webp";
import img2 from "../../Assets/Images/collections_section/2.webp";
import img3 from "../../Assets/Images/collections_section/3.webp";
import img4 from "../../Assets/Images/collections_section/4.webp";
import { spacing, transition } from "../../const";
import useMediaQuery from "../../Hooks/useMediaQuery";

function Banner() {
  const ref = useRef();
  const scalingImage = useRef();
  const imgContainer = useRef();
  const isLarge = useMediaQuery("sm");

  const scaleValue = useSpring("100%", transition);
  const xLeft = useSpring("0%", transition);
  const xRight = useSpring("0%", transition);

  useEffect(() => {
    if (!isLarge) return;

    scalingImage.current.onload = () => {
      let spacing = Number(getComputedStyle(imgContainer.current).gap.split("px")[0]) * 2;
      let imageWidth = scalingImage.current.clientWidth;
      let imageHeight = scalingImage.current.clientHeight;

      let scrollHeight = ref.current.clientHeight / 2;
      let scaleMax = (window.innerWidth - spacing) / imageWidth - 1;
      let pHeight = (imageHeight * scaleMax - spacing) / 2;

      document.body.style.setProperty("--pHeight", pHeight + "px");

      onscroll = () => {
        let scrollY = Math.min(window.scrollY, scrollHeight);

        let scrollProgress = Math.floor((scrollY / (scrollHeight - spacing / 2)) * 100);
        let scaleProgress = Math.floor((scrollY / scrollHeight) * 100);

        let scale = (scaleMax / 100) * scaleProgress + 1;

        xLeft.set(-scrollProgress + "%");
        xRight.set(scrollProgress + "%");
        scaleValue.set(100 * scale + "%");
      };
    };
  }, [isLarge, scaleValue]);

  return (
    <Grid ref={ref} container px={spacing} mt={2} overflow="clip">
      <Grid container item xs={12} spacing={spacing}>
        <Grid item xs={12} sm={6} md="auto">
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <TextFragment>DISCOVER TIMELESS HANDCRAFTED ARTWORKS</TextFragment>
          </Box>
          <Box sx={{ display: { xs: "none", sm: "grid" }, height: "100%" }}>
            <TextFragment style={{ x: xLeft }}>DISCOVER TIMELESS</TextFragment>
            <TextFragment style={{ x: xLeft, textAlign: "end" }}>HANDCRAFTED</TextFragment>
            <TextFragment style={{ x: xLeft }} sx={{ display: { xs: "block", sm: "none" } }}>
              ARTWORKS
            </TextFragment>
          </Box>
        </Grid>
        <Grid item xs sm={6} md>
          <Box
            sx={{
              height: "100%",
              display: "grid",
              backgroundImage: "linear-gradient(120deg, var(--brand), #2563eb)",
              borderRadius: 5,
              gap: { xs: 4, sm: 2 },
              p: { ...spacing, xs: 3 },
              alignItems: "center",
            }}
            component={motion.div}
            style={{ x: xRight }}
          >
            <Typography color="white" fontWeight={500} lineHeight={2}>
              Explore one-of-a-kind artworks that bring imagination to life. Curated with heart, crafted with soul.
            </Typography>
            <CallToAction color="secondary" sx={{ display: { xs: "block", sm: "none" } }} />
          </Box>
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={spacing}>
        <Grid item xs={4} sx={{ display: { xs: "none", sm: "inherit" } }}>
          <Box
            component={motion.div}
            style={{ x: xLeft }}
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              height: "100%",
              gap: 4,
            }}
          >
            <TextFragment textAlign="end">ARTWORKS</TextFragment>
            <CallToAction sx={{ mb: 2, alignSelf: "end" }} />
            <Box>
              <Image sx={{ height: "100%", objectFit: "cover" }} src={img3} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs mt={{ xs: 4, sm: 8 }}>
          <Box ref={imgContainer} height="100%" display="grid" gridTemplateColumns="1fr 1fr" gap={spacing}>
            <Box
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gridRow: "1/3",
                objectFit: "cover",
                contain: { sm: "size" },
                transformOrigin: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <Box component={motion.div} style={{ position: "absolute", width: scaleValue, height: scaleValue }}>
                <Image
                  ref={scalingImage}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  src={img2}
                />
              </Box>
            </Box>
            <Box component={motion.div} style={{ x: xRight }}>
              <Image
                sx={{
                  height: "100%",
                  objectFit: "cover",
                  contain: { sm: "size" },
                }}
                src={img1}
              />
            </Box>
            <Box component={motion.div} style={{ x: xRight }}>
              <Image
                component={motion.div}
                style={{ x: xRight }}
                sx={{
                  height: "100%",
                  objectFit: "cover",
                  contain: { sm: "size" },
                }}
                src={img4}
              />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Box minHeight="var(--pHeight)" />
        </Grid>
      </Grid>
    </Grid>
  );
}

const TextFragment = ({ children, ...props }) => {
  return (
    <Typography
      component={motion.div}
      fontSize={{ xs: 40, sm: 40, md: 60, lg: 80 }}
      letterSpacing={5}
      lineHeight={1.2}
      fontFamily="League Gothic"
      {...props}
    >
      {children}
    </Typography>
  );
};

const Image = forwardRef(({ src, sx }, ref) => {
  return <Box ref={ref} component="img" src={src} sx={{ width: "100%", objectFit: "cover", borderRadius: 5, ...sx }} />;
});

function CallToAction({ sx, ...props }) {
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate("/shop")}
      variant="contained"
      size="large"
      sx={{ ...sx, textTransform: "unset" }}
      {...props}
    >
      Explore Now
    </Button>
  );
}

export default Banner;
