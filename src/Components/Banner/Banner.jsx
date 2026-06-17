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
import { ChevronRight } from "lucide-react";

function Banner() {
  const ref = useRef();
  const scalingImage = useRef();
  const imgContainer = useRef();
  const isLarge = useMediaQuery("sm");

  const scaleValue = useSpring("100%", transition);
  const xLeft = useSpring("0%", transition);
  const xRight = useSpring("0%", transition);

  useEffect(() => {
    if (!isLarge) {
      document.body.style.removeProperty("--pHeight");
      return;
    }

    let handleScroll = null;

    const setupAnimation = () => {
      if (!scalingImage.current || !imgContainer.current || !ref.current) return;

      const spacingVal = Number(getComputedStyle(imgContainer.current).gap.split("px")[0]) * 2;
      const imageWidth = scalingImage.current.clientWidth;
      const imageHeight = scalingImage.current.clientHeight;

      if (!imageWidth || !imageHeight) return;

      const scrollHeight = ref.current.clientHeight / 2;
      const scaleMax = (window.innerWidth - spacingVal) / imageWidth - 1;
      const pHeight = (imageHeight * scaleMax - spacingVal) / 2;

      document.body.style.setProperty("--pHeight", pHeight + "px");

      if (handleScroll) {
        window.removeEventListener("scroll", handleScroll);
      }

      handleScroll = () => {
        const scrollY = Math.min(window.scrollY, scrollHeight);

        const scrollProgress = Math.floor((scrollY / (scrollHeight - spacingVal / 2)) * 100);
        const scaleProgress = Math.floor((scrollY / scrollHeight) * 100);

        const scale = (scaleMax / 100) * scaleProgress + 1;

        xLeft.set(-scrollProgress + "%");
        xRight.set(scrollProgress + "%");
        scaleValue.set(100 * scale + "%");
      };

      window.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    };

    const img = scalingImage.current;
    if (img) {
      if (img.complete) {
        setupAnimation();
      } else {
        img.onload = setupAnimation;
      }
    }

    const handleResize = () => {
      setupAnimation();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      if (img) {
        img.onload = null;
      }
      if (handleScroll) {
        window.removeEventListener("scroll", handleScroll);
      }
      window.removeEventListener("resize", handleResize);
      document.body.style.removeProperty("--pHeight");
    };
  }, [isLarge, scaleValue, xLeft, xRight]);

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
            <CallToAction color="secondary" sx={{ display: { xs: "flex", sm: "none" } }} />
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

const Image = forwardRef(({ src, sx, ...props }, ref) => {
  return (
    <Box
      ref={ref}
      component="img"
      src={src}
      sx={{ width: "100%", objectFit: "cover", borderRadius: 5, ...sx }}
      {...props}
    />
  );
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
      endIcon={<ChevronRight style={{ width: '0.8em', height: '0.8em' }} />}
    >
      Explore Now
    </Button>
  );
}

export default Banner;
