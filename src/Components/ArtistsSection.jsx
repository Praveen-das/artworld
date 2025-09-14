
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import useArtists from "../Hooks/useArtists";

export default function ArtistsSection() {
  let artists = useArtists();

  let container = {
      display: "grid",
      px: 4,
      gap: "var(--vGap)",
      mt: "var(--vSpacing)",
      boxSizing: "border-box",
    },
    tray = {
      display: "flex",
      gap: 4,
      py: 2,
      overflowX: "scroll",
    },
    artistWrapper = {
      display: "grid",
      justifyItems: "center",
      gap: 2,
      minWidth: 180,
      maxWidth: 180,
      transition: "0.2s",
      cursor: "pointer",
      ":hover .img_container::before, :hover .img_container::after": {
        opacity: "1",
      },
    },
    img_wrapper = {
      position: "relative",
      width: "100%",
      height: "100%",
      aspectRatio: 1,
      borderRadius: "50%",
      overflow: "hidden",
      "::before": {
        content: "''",
        position: "absolute",
        inset: 0,
        bgcolor: "#000000db",
        opacity: "0",
        transition: "0.2s",
      },
      "::after": {
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        color: "white",
        opacity: "0",
        transition: "0.2s",
      },
    },
    img = {
      objectFit: "contain",
      width: "100%",
      display: "block",
    };

  return (
    <>
      <Box sx={container}>
        <Typography variant="heading" mx="auto">
          OUR ARTISTS
        </Typography>
        <Box className="noScroll" sx={tray}>
          {artists.data?.map(({ displayName, photo, product, id }) => (
            <Box component={Link} to={`/artists/profile/${id}`} sx={artistWrapper} key={id}>
              <Box
                className="img_container"
                sx={{
                  ...img_wrapper,
                  "::after": {
                    content: `"${product?.length} artworks"`,
                    ...img_wrapper["::after"],
                  },
                }}
              >
                <img src={photo} style={img} alt={photo} />
              </Box>
              <Typography className="artist_name" variant="body1" fontWeight={600}>
                {displayName}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
