import "./cart.css";
import EMPTY_CART from "../../Assets/svg/empty_cart.svg?react";
import { Box, Button, Typography, Container } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function EmptyCart() {
  const navigate = useNavigate();
  return (
    <Container maxWidth='sm'>
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
        <EMPTY_CART height={250} />
        <Typography variant="title.primary" fontWeight={500}>
          Your cart is empty.
        </Typography>
        <Typography >
          You have no items in your shopping cart.
          <br />
          Let's go buy something!
        </Typography>
        <Button onClick={() => navigate("/shop")} sx={{ mt: 2 }} variant="contained">
          Shop Now
        </Button>
      </Box>
    </Container>
  );
}

export default EmptyCart;
