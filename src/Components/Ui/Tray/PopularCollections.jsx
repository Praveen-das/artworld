import "./tray.css";
import { useProductQuery } from "../../../Hooks/useProducts";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { Caption } from "../Caption";
import { MainTitle } from "../MainTitle";
import { spacing, vSpacing } from "../../../const";
import useMediaQuery from "../../../Hooks/useMediaQuery";
// import mural from "../../../Assets/Images/collections_section/murals.webp";

function PopularCollections() {
  const { data = [] } = useProductQuery("popular-collections", '/products?orderBy=%7B"createdAt"%3A"desc"%7D&limit=10');
  const theme = useTheme();
  const matches = useMediaQuery("sm");
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/shop?orderBy=%7B"createdAt"%3A"desc"%7D');
  };

  return (
    <Box
      sx={{
        mt: vSpacing,
        px: spacing,
      }}
    >
      <Grid container rowSpacing={4}>
        <Grid item xs={12} sm="auto">
          <Box
            sx={
              matches
                ? {}
                : {
                    // backgroundImage: `url(${mural})`,
                    p: 3,
                    borderRadius: 7,
                    position: "relative",
                    overflow: "hidden",
                    "::after": {
                      content: "''",
                      position: "absolute",
                      inset: 0,
                      backgroundImage: "linear-gradient(90deg, lch(0 0 0), transparent 200%)",
                    },
                  }
            }
          >
            <Box
              lineHeight={1.7}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                color: "black",
                gap: { xs: 1, sm: 2 },
                position: "relative",
                zIndex: 3,
              }}
            >
              <MainTitle color={{ xs: "white", sm: "var(--main)" }} variant="h2">
                Get Popular Art <br />
                Collection Here
              </MainTitle>
              <Caption color={{ xs: "white", sm: "var(--main)" }}>
                Collection the top selling artworks <br /> from top rated artists.
              </Caption>
              <Button
                onClick={handleNavigate}
                variant="contained"
                size="large"
                color={matches ? "primary" : "secondary"}
                sx={{
                  mt: 4,
                  borderRadius: 7,
                  color: { xs: "black", sm: "white" },
                  textTransform: "unset",
                }}
              >
                View All
              </Button>
            </Box>
          </Box>
        </Grid>

        <Grid item xs sx={{ display: { xs: "none", sm: "unset" } }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                position: "relative",
                height: "25em",
              }}
            >
              {data.map((product, idx) => {
                let fontSize = theme.typography.fontSize;
                let scale = 1 - idx / 10;
                let left = ((idx + 1) * 80) / fontSize;
                let zIndex = data.length - idx - 1;

                let src = product?.images[0]?.url + "?tr=w-400";

                return (
                  <Box
                    key={product.id}
                    sx={{
                      width: { xs: 1, sm: 200, md: 250, lg: 300 },
                      position: "absolute",
                      mx: "auto",
                      top: 0,
                      bottom: 0,
                      left: `${left}em`,
                      transform: `translate(-100%, 0%) scale(${scale})`,
                      zIndex,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      as="img"
                      sx={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 7,
                      }}
                      src={src}
                    />

                    {idx !== 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          inset: 0,
                          bgcolor: "lch(0 0 0 / .4)",
                          borderRadius: 7,
                          transform: `translate(-22%) scale(1, 1.5)`,
                          filter: "blur(10px)",
                        }}
                      >
                        <Box />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default PopularCollections;
