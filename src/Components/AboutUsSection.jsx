
import { Box, Button, Typography } from "@mui/material";


// import natureImg from "../Assets/Images/collections_section/nature.webp";
// import muralImg from "../Assets/Images/collections_section/murals.webp";


let box_wrapper = {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    gap: 6,
    mt: "var(--vSpacing)",
    px: 4,
    boxSizing: "border-box",
  },
  container = {
    width: "100%",
    height: 350,
    position: "relative",
  },
  left_section = {
    container: {
      maxWidth: 450,
    },
    img: {
      width: "92%",
      height: "92%",
      bgcolor: "darkgrey",
      position: "absolute",
      borderRadius: "10px",
      overflow: "hidden",
    },
  },
  middle_section = {
    container: {
      boxSizing: "border-box",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      maxWidth: 150,
      py: 1,
    },
    box: {
      display: "grid",
      gap: 2,
    },
    typo: {
      variant: "h5",
      fontWeight: 700,
    },
  },
  right_section = {
    container: {
      display: "flex",
      flexDirection: "column",
      gap: 4,
      maxWidth: 550,
    },
  };

function AboutUsSection() {
  return (
    <>
      <Box sx={box_wrapper}>
        <Box sx={{ ...container, ...left_section.container }}>
          <Box sx={{ ...left_section.img, bottom: 0, right: 0 }}>
            {/* <img style={{ width: "100%", height: "100%" }} src={natureImg} alt="" /> */}
          </Box>
          <Box sx={{ ...left_section.img, bgcolor: "grey" }}>
            {/* <img style={{ width: "100%", height: "100%" }} src={muralImg} alt="" /> */}
          </Box>
        </Box>
        <Box sx={{ ...container, ...middle_section.container }}>
          <Box sx={middle_section.box}>
            <Typography {...middle_section.typo}>42k+</Typography>
            <Typography variant="body1">Pieces sold</Typography>
          </Box>
          <Box sx={middle_section.box}>
            <Typography {...middle_section.typo}>42k+</Typography>
            <Typography variant="body1">Happy Clients</Typography>
          </Box>
          <Box sx={middle_section.box}>
            <Typography {...middle_section.typo}>42k+</Typography>
            <Typography variant="body1">Artists</Typography>
          </Box>
        </Box>
        <Box sx={{ ...container, ...right_section.container }}>
          <Typography variant="heading">ABOUT US</Typography>
          <Typography variant="body1">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <br />
            <br />
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged.
          </Typography>
          <Box>
            <Button
              variant="contained"
              size="large"
              sx={{
                fontWeight: 600,
                mt: 4,
                borderRadius: 99999,
                backgroundImage: "linear-gradient(90deg, #9333ea, #2563eb)",
              }}
            >
              LEARN MORE
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default AboutUsSection;
