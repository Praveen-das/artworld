import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import { useCart } from "../../../../Hooks/useCart";

import { Link } from "react-router-dom";
import useCurrentUser from "../../../../Hooks/useCurrentUser";

function Products() {
  const { currentUser } = useCurrentUser();
  const { cart, updateCart, removeFromCart } = useCart();
  const cart_items = cart.data?.items || [];

  return (
    <>
      <Grid item xs={12}>
        {cart_items.map(({ id, product, quantity }, key) => (
          <Box sx={{ display: "flex", gap: 4 }} key={id}>
            <img width={80} height={80} src={product.images[0].url + "/tr:w-100"} alt="" />
            <Box>
              <Link to={`/shop/product/${product?.id}`}>
                <Typography variant="paragraph">{product.name}</Typography>
              </Link>
              <Typography fontWeight={700} fontSize={18}>
                Rs. {product.price * quantity}
              </Typography>
            </Box>
            {cart_items[key + 1] && <Divider variant="fullWidth" />}
          </Box>
        ))}
      </Grid>
    </>
  );
}

export default Products;
