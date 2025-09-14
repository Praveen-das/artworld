import "./cart.css";

import { Box, Button, Chip, Divider, Grid, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { grey, red } from "@mui/material/colors";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { gap, spacing } from "../../const";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { calculateDiscount } from "../../Utils/utils";
import Card from "../Ui/Card";
import LoadingScreen from "../Ui/LoadingScreen";
import QuantityInput from "../Ui/QuantityInput/QuantityInput";
import WishlistButton from "../Ui/WishlistButton/WishlistButton";
import EmptyCart from "./EmptyCart";
import { getCartPricingDetails } from "../../Utils/product";

function Cart() {
  const navigate = useNavigate();
  const { cart } = useCart();
  const isSm = useMediaQuery("sm");

  const cart_items = cart.data?.items || [];
  const { total, discount, subtotal } = getCartPricingDetails(cart_items);

  const handleCart = () => {
    navigate("/checkout");
  };

  const container = {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    minHeight: "100%",
    alignContent: "flex-start",
  };

  if (!cart.isFetched && (cart.isLoading || cart.isFetching)) return <LoadingScreen />;
  if (cart.isFetched && !cart_items.length) return <EmptyCart />;

  return (
    <Grid container spacing={gap} px={spacing} py={{ sm: 2 }} minHeight="100%">
      <Grid container item xs={12} sm={8} rowSpacing={gap}>
        <Grid item xs={12} sx={{ display: { xs: "none", sm: "flex" } }}>
          <Link
            style={{
              display: "flex",
              width: "fit-content",
              alignItems: "center",
              gap: 10,
              marginTop: "auto",
            }}
            to="/shop"
          >
            <ArrowLeft size={16} />
            <Typography variant="paragraph">Continue Shopping</Typography>
          </Link>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Typography variant="h5">Shopping Cart</Typography>
            <Chip sx={{ fontWeight: 500 }} label={`${cart_items.length} Items`} />
          </Box>
        </Grid>

        <Grid item xs={12} minHeight="100%">
          <Box sx={container}>
            {cart_items?.map(({ id, product, quantity }) =>
              isSm ? (
                <CartItem key={id} cartId={id} product={product} quantity={quantity} />
              ) : (
                <CartItemMobile key={id} cartId={id} product={product} quantity={quantity} />
              )
            )}
          </Box>
        </Grid>
      </Grid>

      <Grid item xs position="sticky" alignSelf="flex-start" top={0} mt={{ xs: "auto", sm: 0 }}>
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            p: gap,
            borderRadius: { sm: 5 },
          }}
        >
          <Typography variant="title.primary">Order Summary</Typography>
          <div className="checkout__checkout">
            <Typography fontWeight={500} fontSize={15}>{`Items (${cart_items?.length || 0})`}</Typography>
            <Typography fontWeight={500} fontSize={15}>
              ₹{subtotal}
            </Typography>
            <Typography fontWeight={500} fontSize={15}>
              You will save
            </Typography>
            <Typography fontWeight={500} fontSize={15}>
              {discount > 0 ? `-₹${discount}` : "₹0"}
            </Typography>
          </div>
          <Divider sx={{ width: "100%" }} />
          <div className="checkout__checkout">
            <Typography fontSize={20} fontWeight={700}>
              Sub-total
            </Typography>
            <Typography fontSize={20} fontWeight={700}>
              ₹{total}
            </Typography>
          </div>

          <Button
            sx={{ mt: 1, textTransform: "none" }}
            onClick={() => handleCart()}
            size="large"
            variant="contained"
            fullWidth
          >
            <Typography fontWeight={600} fontSize={17} sx={{ py: 0.5 }} color="white">
              Proceed to Checkout
            </Typography>
          </Button>
        </Card>
      </Grid>
    </Grid>
  );
}

export default Cart;

function CartItemMobile({ cartId, product, quantity }) {
  const { updateCart, removeFromCart } = useCart();

  return (
    <Card sx={{ p: gap }}>
      <Grid container spacing={4}>
        <Grid item xs={5}>
          <Box sx={{ width: "100%", aspectRatio: 1, position: "relative" }}>
            <Box
              component="img"
              sx={{ borderRadius: 4, width: "100%", height: "100%", display: "block" }}
              width={250}
              height={250}
              src={product.images[0].url + "?tr:w-100"}
              alt=""
            />

            {product.discount > 0 && (
              <Box
                sx={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  display: "grid",
                  placeItems: "center",
                  color: "white",
                  ml: "auto",
                  width: "fit-content",
                  fontSize: 12,
                  bgcolor: "var(--brand)",
                  px: 0.8,
                  py: 0.5,
                  borderRadius: 2,
                }}
              >
                {product.discount}% OFF
              </Box>
            )}
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Box sx={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
            <Link to={`/shop/product/${product?.id}`}>
              <Typography variant="subtitle2" color="primary.dark">
                by {product.sales_person.displayName}
              </Typography>
            </Link>
            <Link to={`/shop/product/${product?.id}`}>
              <Typography fontWeight={600} variant="h6">
                {product.name}
              </Typography>
            </Link>

            <Box sx={{ display: "flex", alignItems: "baseline", mt: "auto", gap: 1 }}>
              <Typography fontWeight={500}>Rs. {product.price * quantity}</Typography>
              <Typography fontWeight={400} variant="body2" color={grey[600]} sx={{ textDecoration: "line-through" }}>
                Rs. {product.price * quantity}
              </Typography>
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <QuantityInput
                size="small"
                onChange={(quantity) => {
                  let updates = {
                    id: cartId,
                    quantity,
                    price: quantity * product?.price,
                    discount: calculateDiscount(product?.price, 12, quantity),
                  };
                  updateCart.mutateAsync(updates);
                }}
                defaultValue={quantity}
              />

              <Box sx={{ "& svg:hover": { color: red[700] } }} color={grey[800]} display="flex" gap={2}>
                <WishlistButton
                  buttonProps={{ size: "small" }}
                  IconButton={IconButton}
                  productId={product?.id}
                  color="inherit"
                />
                <IconButton color="inherit" size="small" onClick={() => removeFromCart.mutate(cartId)}>
                  <DeleteOutlineIcon color="inherit" fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
}

function CartItem({ cartId, product, quantity }) {
  const { updateCart, removeFromCart } = useCart();

  return (
    <Card
      key={cartId}
      sx={{
        display: "flex",
        gap: gap,
        p: 2,
        transform: "scale(1)",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "scale(1.01)",
        },
      }}
    >
      <img className="img_border" width={150} height={150} src={product.images[0].url + "?tr:w-100"} alt="" />

      <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Link to={`/shop/product/${product?.id}`}>
              <Typography fontWeight={600}>{product.name}</Typography>
            </Link>
            <Typography variant="body2" color={grey[600]}>
              by {product.sales_person.displayName}
            </Typography>
            {/* <Link to={`/shop/product/${product?.id}`}>
            </Link> */}
          </Box>
          <Box sx={{ display: "flex", alignItems: "start", gap: 2 }}>
            <Typography fontWeight={600}>Rs. {product.price * quantity}</Typography>
            {Boolean(product.discount) && (
              <Box
                sx={{
                  display: "grid",
                  placeItems: "center",
                  width: "fit-content",
                  bgcolor: "var(--brandLight50)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 3,
                }}
              >
                <Typography variant="caption" fontWeight={600} color="var(--brand)">
                  {product.discount}% OFF
                </Typography>
              </Box>
            )}
          </Box>
        </Box>

        <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", gap: 4, mt: "auto" }}>
          <Box>
            <QuantityInput
              size="small"
              onChange={(quantity) => {
                let updates = {
                  id: cartId,
                  quantity,
                };

                updateCart.mutateAsync(updates);
              }}
              defaultValue={quantity}
            />
          </Box>

          <Box sx={{ "& svg:hover": { color: red[700] } }} color={grey[800]} display="flex" gap={2}>
            <IconButton color="inherit" size="small" onClick={() => removeFromCart.mutate(cartId)}>
              <DeleteOutlineIcon color="inherit" fontSize="small" />
            </IconButton>
            <WishlistButton
              buttonProps={{ size: "small" }}
              IconButton={IconButton}
              productId={product?.id}
              color="inherit"
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}
