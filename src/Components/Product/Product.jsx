import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import "./product.css";
import Reviews from "../Reviews/Reviews";
import { Box, Button, Divider, Grid, IconButton, Rating, Skeleton, Typography } from "@mui/material";
import { useCart } from "../../Hooks/useCart";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useProduct } from "../../Hooks/useProducts";
import SellerProfile from "./SellerProfile/SellerProfile";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCartOutlined";
import StarEmptyIcon from "@mui/icons-material/StarBorderRounded";
import StarIcon from "@mui/icons-material/StarRounded";
import WishlistButton from "../Ui/WishlistButton/WishlistButton";
import UnfoldMoreIcon from "@mui/icons-material/ExpandMore";
import UnfoldLessIcon from "@mui/icons-material/ExpandLess";
import { ShareButton } from "../Ui/ShareButton/ShareButton";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Image } from "../Ui/Image";
import { ShoppingBag } from "lucide-react";
import { gap, spacing } from "../../const";

const IconProps = {
  fontSize: "small",
  color: "primary",
};

const Product = () => {
  const { currentUser } = useCurrentUser();
  const [more, setMore] = useState(false);
  const navigate = useNavigate();
  const { product_id } = useParams();

  const {
    addToCart,
    removeFromCart,
    cart: { data: cart },
  } = useCart();
  const { data: product, ...productApi } = useProduct(product_id);

  const cartItem = cart?.items?.find((o) => o.product_id === product?.id);

  let OneInchInCM = 2.54;
  let artworkWidthInCM = Math.round(product?.widthInInches * OneInchInCM * 10) / 10;
  let artworkHeightInCM = Math.round(product?.heightInInches * OneInchInCM * 10) / 10;
  let artworkSize = `${product?.widthInInches} X ${product?.heightInInches} in | ${artworkWidthInCM} X ${artworkHeightInCM} cm`;

  const _addToCart = () => {
    if (!currentUser.data) return navigate("/sign-in");

    const data = {
      quantity: 1,
      product_id: product?.id,
    };

    addToCart.mutateAsync(data);
  };

  const _removeFromCart = () => removeFromCart.mutateAsync(cartItem.id);

  const handleCheckout = async () => {
    const data = {
      id: product.id,
      product,
      quantity: 1,
    };

    navigate("/checkout", { state: { product: [data] } });
  };

  let discountPrice = product ? product.price - (product.price * product.discount) / 100 : 0;
  const href = product?.images?.[0]?.url + "?tr=w-800";
  const placeHolder = product?.images?.[0]?.url + "?tr=w-5";

  return (
    <Box sx={{ mt: { xs: 2, md: 4 }, px: spacing, pb: 8 }}>
      <Grid container spacing={{ xs: 3, sm: 4, md: 6 }}>
        {/* Left Column - Gallery Image Frame */}
        <Grid item xs={12} md={7} sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Box
            sx={{
              position: { md: "sticky" },
              top: "var(--header)",
              // transform: { md: "translateY(-50%)" },
              display: "flex",
              flexDirection: "column",
              gap: 2,
              mb: { md: "auto" },
            }}
          >
            <Box
              sx={{
                width: "100%",
                pr: { xs: 0, sm: 2, md: 5 },
                display: "flex",
                justifyContent: "center",
                boxShadow: { xs: "none", md: "inset 0 0 50px rgba(0, 0, 0, 0.02)" },
                position: "relative",
              }}
            >
              {productApi.isLoading || productApi.isFetching ? (
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height="100%"
                  sx={{ borderRadius: { xs: 0, md: "16px" } }}
                />
              ) : (
                <Image
                  sx={{
                    width: { xs: "100%", md: "85%" },
                    height: "100%",
                    objectFit: "contain",
                    filter: { xs: "none", md: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.12))" },
                    transition: "transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    "&:hover": {
                      transform: { xs: "none", md: "scale(1.025)" },
                    },
                    borderRadius: { xs: 4, md: "24px" },
                  }}
                  borderRadius={0}
                  href={href}
                  placeHolder={placeHolder}
                  alt={product?.name}
                />
              )}
            </Box>
          </Box>
        </Grid>

        {/* Right Column - Product Purchase Details Panel */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: 2.5, md: 3.5 },
              position: { md: "sticky" },
              top: { md: "2.5rem" },
            }}
          >
            {/* Header Tag + Socials Row */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography
                variant="caption"
                sx={{
                  bgcolor: "rgba(94, 71, 249, 0.08)",
                  color: "var(--brand)",
                  py: 0.8,
                  borderRadius: "20px",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                {product?.sub_category?.name || "Original Artwork"}
              </Typography>
              <Box display="flex" gap={1}>
                <WishlistButton IconButton={IconButton} productId={product?.id} color="var(--brand)" />
                <ShareButton props={IconProps} />
              </Box>
            </Box>

            {/* Title and Artist */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
              {productApi.isLoading || productApi.isFetching ? (
                <>
                  <Skeleton width="80%" height={45} />
                  <Skeleton width="40%" height={24} />
                </>
              ) : (
                <>
                  <Typography
                    textTransform="capitalize"
                    variant="h4"
                    sx={{
                      fontWeight: 800,
                      color: "var(--brandMain)",
                      lineHeight: 1.25,
                      letterSpacing: "-0.01em",
                      fontSize: { xs: "1.75rem", sm: "2rem", md: "2.25rem" },
                    }}
                  >
                    {product?.name}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={1} fontWeight={500} color="text.secondary">
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                      by
                    </Typography>
                    <SellerProfile seller={product?.sales_person} />
                  </Box>
                </>
              )}
            </Box>

            {/* Rating summary */}
            <Box display="flex" alignItems="center" gap={1.2} sx={{ mt: -0.5 }}>
              <Rating
                readOnly
                icon={<StarIcon sx={{ color: "var(--brand)" }} />}
                emptyIcon={<StarEmptyIcon sx={{ color: "var(--brand)" }} />}
                name="read-only"
                value={product?.rating || 0}
                precision={0.5}
              />
              <Typography variant="body2" fontWeight={600} color="var(--brandMain)">
                {product?.rating || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ opacity: 0.6 }}>
                •
              </Typography>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                {product?.reviews?.length || 0} Reviews
              </Typography>
            </Box>

            <Divider />

            {/* Pricing details */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography
                variant="caption"
                sx={{ color: "text.secondary", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                Price
              </Typography>
              <Box display="flex" alignItems="baseline" gap={2}>
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    color: "var(--brandMain)",
                    fontSize: { xs: "1.85rem", sm: "2.25rem", md: "3rem" },
                  }}
                >
                  ₹{Math.round(discountPrice).toLocaleString("en-IN")}
                </Typography>
                {Boolean(product?.discount) && (
                  <Box display="flex" alignItems="center" gap={1.5}>
                    <Typography
                      variant="caption"
                      sx={{
                        bgcolor: "rgba(94, 71, 249, 0.08)",
                        color: "var(--brand)",
                        fontWeight: 700,
                        px: { xs: 1.2, md: 1.5 },
                        py: { xs: 0.5, md: 0.6 },
                        borderRadius: "6px",
                      }}
                    >
                      {product?.discount}% OFF
                    </Typography>
                    <Typography
                      color="text.secondary"
                      variant="body1"
                      sx={{ textDecoration: "line-through", fontWeight: 500, opacity: 0.7 }}
                    >
                      ₹{product?.price.toLocaleString("en-IN")}
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>

            {/* Action Toggles */}
            <Box display="flex" gap={2} sx={{ width: "100%", mt: 1 }}>
              <LoadingButton
                component={motion.button}
                whileTap={{ scale: 0.96 }}
                sx={{
                  flex: 1,
                  textTransform: "none",
                  py: { xs: 1.4, md: 1.8 },
                  borderRadius: { xs: "12px", md: "14px" },
                  borderWidth: "1.5px",
                  borderColor: "rgba(0, 0, 0, 0.12)",
                  color: "var(--brandMain)",
                  fontWeight: 600,
                  "&:hover": {
                    borderWidth: "1.5px",
                    borderColor: "var(--brandMain)",
                    bgcolor: "rgba(0, 0, 0, 0.02)",
                  },
                }}
                variant="outlined"
                size="large"
                onClick={cartItem ? _removeFromCart : _addToCart}
                loading={addToCart.isLoading || removeFromCart.isLoading}
              >
                {cartItem ? (
                  <Box display="flex" alignItems="center" gap={1}>
                    <RemoveShoppingCart style={{ width: "1.2em", height: "1.2em" }} />
                    Remove
                  </Box>
                ) : (
                  <Box display="flex" alignItems="center" gap={1}>
                    <CartIcon style={{ width: "1.2em", height: "1.2em" }} />
                    Add to Cart
                  </Box>
                )}
              </LoadingButton>

              <Button
                component={motion.button}
                whileTap={{ scale: 0.96 }}
                disabled={productApi.isLoading || productApi.isFetching}
                variant="contained"
                size="large"
                startIcon={<ShoppingBag size={18} style={{ marginRight: 2 }} />}
                sx={{
                  flex: 1.2,
                  textTransform: "none",
                  py: { xs: 1.4, md: 1.8 },
                  borderRadius: { xs: "12px", md: "14px" },
                  bgcolor: "var(--brand)",
                  fontWeight: 600,
                  boxShadow: "0 8px 25px -5px rgba(94, 71, 249, 0.3)",
                  "&:hover": {
                    bgcolor: "var(--brandDark)",
                    boxShadow: "0 10px 25px -3px rgba(94, 71, 249, 0.4)",
                  },
                }}
                onClick={() => handleCheckout()}
              >
                Buy Now
              </Button>
            </Box>

            <Divider />

            {/* Description & Technical Specifications */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3.5 }}>
              {/* Product description details */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 700, color: "var(--brandMain)" }}>
                  Description
                </Typography>
                <Box position="relative" sx={{ pr: 2 }}>
                  {productApi.isLoading || productApi.isFetching ? (
                    <Box display="flex" flexDirection="column" gap={0.8}>
                      <Skeleton width="100%" height={20} />
                      <Skeleton width="100%" height={20} />
                      <Skeleton width="80%" height={20} />
                    </Box>
                  ) : (
                    <>
                      <Typography
                        className={!more && "noWrapLine"}
                        variant="body2"
                        sx={{
                          lineHeight: 1.6,
                          color: "text.secondary",
                          opacity: 0.9,
                        }}
                      >
                        {product?.desc}
                      </Typography>
                      <IconButton
                        onClick={() => setMore((s) => !s)}
                        size="small"
                        sx={{
                          position: "absolute",
                          right: -10,
                          bottom: -10,
                          color: "var(--brand)",
                        }}
                      >
                        {more ? <UnfoldLessIcon fontSize="small" /> : <UnfoldMoreIcon fontSize="small" />}
                      </IconButton>
                    </>
                  )}
                </Box>
              </Box>

              {/* Specs parameters container */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 700, color: "var(--brandMain)" }}>
                  Specifications
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gap: 1.5,
                    bgcolor: "rgba(0, 0, 0, 0.01)",
                    border: "1px solid rgba(0, 0, 0, 0.03)",
                    borderRadius: "12px",
                    p: 2.5,
                  }}
                >
                  <SpecRow label="Style" value={product?.style?.name} />
                  <SpecRow label="Material" value={product?.material?.name} />
                  <SpecRow label="Size" value={artworkSize} />
                  <SpecRow
                    label="Available Stock"
                    value={
                      product?.inventory?.availableQty > 0
                        ? `${product?.inventory?.availableQty} units`
                        : "Out of stock"
                    }
                  />
                </Box>
              </Box>

              {/* Logistics & delivery specifications */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography variant="body1" sx={{ fontWeight: 700, color: "var(--brandMain)" }}>
                  Shipping & Delivery
                </Typography>
                <Box
                  sx={{
                    display: "grid",
                    gap: 1.5,
                    bgcolor: "rgba(0, 0, 0, 0.01)",
                    border: "1px solid rgba(0, 0, 0, 0.03)",
                    borderRadius: "12px",
                    p: 2.5,
                  }}
                >
                  <SpecRow label="Ships From" value="Kottayam, Kerala, India" />
                  <SpecRow label="Shipping Class" value="Free International Shipping" />
                  <SpecRow label="Estimated Arrival" value="Arrives within 5-7 business days" />
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>

        {/* Reviews Section - Full bleed bottom */}
        <Grid item xs={12} sx={{ mt: { xs: 4, md: 8 } }}>
          <Divider sx={{ mb: 6 }} />
          <Reviews product={product} />
        </Grid>
      </Grid>
    </Box>
  );
};

function SpecRow({ label, value }) {
  if (!value) return null;
  return (
    <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ py: 0.5 }}>
      <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 500 }}>
        {label}
      </Typography>
      <Typography variant="body2" sx={{ color: "var(--brandMain)", fontWeight: 600 }}>
        {value}
      </Typography>
    </Box>
  );
}

export default Product;
