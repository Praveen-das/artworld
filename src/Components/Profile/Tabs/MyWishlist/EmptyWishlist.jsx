import { Box, Button, Typography } from "@mui/material";
import IMG from "../../../../Assets/svg/wishlist.svg?react";
import { useNavigate } from "react-router-dom";

export default function EmptyWishlist() {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        gap: 2,
        px: 6,
        py: 4,
      }}
    >
      <IMG height={250} />
      <Typography variant="title.primary" fontWeight={500}>
        Empty Wishlist
      </Typography>
      <Typography>You have no items in your wishlist.</Typography>
    </Box>
  );
}
