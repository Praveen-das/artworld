import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./product.css";
import Reviews from "../Reviews/Reviews";
import { Box, Button, Divider, Grid, IconButton, Rating, Skeleton, Typography } from "@mui/material";
// import makeStyles from '@mui/styles';
import { useCart } from "../../Hooks/useCart";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useProduct } from "../../Hooks/useProducts";
import SellerProfile from "./SellerProfile/SellerProfile";
import CartIcon from "@mui/icons-material/ShoppingCartOutlined";
import RemoveShoppingCart from "@mui/icons-material/RemoveShoppingCartOutlined";
import ChatIcon from "@mui/icons-material/Chat";
import { useStore } from "../../Store/Store";
import StarEmptyIcon from "@mui/icons-material/StarBorderRounded";
import StarIcon from "@mui/icons-material/StarRounded";
import WishlistButton from "../Ui/WishlistButton/WishlistButton";
import UnfoldMoreIcon from "@mui/icons-material/ExpandMore";
import UnfoldLessIcon from "@mui/icons-material/ExpandLess";
import { ShareButton } from "../Ui/ShareButton/ShareButton";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Image } from "../Ui/Image";
import { ShoppingBag } from "lucide-react";
import { grey } from "@mui/material/colors";
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
    <>
      <Grid container spacing={spacing} px={spacing}>
        <Grid item xs={12} mt={2}>
          <Image
            sx={{
              display: "block",
              width: { xs: "100%", sm: "unset" },
              maxWidth: { sm: "90vw" },
              maxHeight: { sm: "90vh" },
              objectFit: "contain",
              backgroundSize: "contain",
              marginInline: "auto",
            }}
            borderRadius={4}
            href={href}
            placeHolder={placeHolder}
            alt={product?.name}
          />
        </Grid>

        <Grid container item xs={12} spacing={gap}>
          {/* product info */}
          <Grid item xs display={"flex"} flexDirection="column" rowGap={{ xs: 2, sm: 3 }}>
            <Box display="flex" alignItems="center" gap={1}>
              {productApi.isLoading || productApi.isFetching ? (
                <Skeleton width="70%" height={55} />
              ) : (
                <Typography textTransform="capitalize" variant="h4" fontWeight={700}>
                  {product?.name || <Skeleton width="60%" />}
                </Typography>
              )}
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={-2} fontWeight={500}>
              by
              {productApi.isLoading || productApi.isFetching ? (
                <>
                  <Skeleton variant="circular" width={28} height={28} />
                  <Skeleton width={100} />
                </>
              ) : (
                <SellerProfile seller={product?.sales_person} />
              )}
            </Box>

            <Box display="flex" alignItems="center" gap={1}>
              <Rating
                readOnly
                icon={<StarIcon />}
                emptyIcon={<StarEmptyIcon />}
                name="read-only"
                value={product?.rating || 0}
              />
              <Typography variant="text.grey"> {product?.rating || 0}&nbsp;</Typography>
              <label id="bull">&bull;</label>
              <Typography variant="text.grey"> {product?.reviews?.length || 0}&nbsp;Reviews</Typography>
              <Box display={"flex"} gap={1}>
                {/* {sellerId !== currentUser.data?.id && (
                    <IconButton onClick={() => handleChatWidget()}>
                      <ChatIcon {...IconProps} />
                    </IconButton>
                  )} */}
                <WishlistButton IconButton={IconButton} productId={product?.id} color="var(--brand)" />
                <ShareButton props={IconProps} />
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs="auto"
            display={"flex"}
            gap={{ xs: 2, sm: 0 }}
            flexDirection="column"
            alignItems={{ sm: "end" }}
          >
            {/* product price */}
            <Box display="flex" height={50} gap={2} ml="auto" alignItems="center">
              <Typography lineHeight={1} variant="h4" fontWeight={700}>
                ₹{discountPrice}
              </Typography>
              {Boolean(product?.discount) && (
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography
                    fontWeight={800}
                    color="var(--brand)"
                    sx={{ bgcolor: "#5e47f921" }}
                    borderRadius={2.5}
                    px={1.5}
                    py={1}
                  >
                    {product?.discount}% OFF
                  </Typography>
                  <Typography
                    lineHeight={1}
                    color="grey"
                    variant="h6"
                    sx={{ textDecoration: "line-through", fontSize: 16, fontWeight: 600 }}
                  >
                    ₹{product?.price}
                  </Typography>
                </Box>
              )}
            </Box>

            {/* action buttons */}
            <Box display="flex" alignItems="center" my="auto" gap={2}>
              <LoadingButton
                sx={{ textTransform: "none" }}
                variant="outlined"
                size="large"
                color="primary"
                onClick={cartItem ? _removeFromCart : _addToCart}
              >
                {cartItem ? <RemoveShoppingCart /> : <CartIcon />}
              </LoadingButton>
              <Button
                // fullWidth
                disabled={productApi.isLoading || productApi.isFetching}
                variant="contained"
                size="large"
                startIcon={<ShoppingBag size={20} />}
                sx={{ textTransform: "none" }}
                onClick={() => handleCheckout()}
              >
                Buy Now
              </Button>
            </Box>
          </Grid>

          <Grid container item xs={12} spacing={4} mt={2}>
            <Grid container item xs={12} sm={7} spacing={4}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "grid",
                    gap: 4,
                    "table tr": {
                      lineHeight: 1.9,
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Product Details
                  </Typography>

                  <Box position="relative">
                    {productApi.isLoading || productApi.isFetching ? (
                      <Box display="flex" flexDirection="column" gap={0.5} mb={0.5}>
                        <Skeleton width="100%" height={25} />
                        <Skeleton width="100%" height={25} />
                        <Skeleton width="100%" height={25} />
                        <Skeleton width="100%" height={25} />
                        <Skeleton width="70%" height={25} />
                      </Box>
                    ) : (
                      <>
                        <Typography className={!more && "noWrapLine"} variant="paragraph">
                          {product?.desc}
                        </Typography>
                        <IconButton
                          onClick={() => setMore((s) => !s)}
                          size="small"
                          sx={{
                            position: "absolute",
                            right: -25,
                            bottom: -3,
                          }}
                        >
                          {more ? <UnfoldLessIcon fontSize="small" /> : <UnfoldMoreIcon fontSize="small" />}
                        </IconButton>
                      </>
                    )}
                  </Box>

                  <table style={{ width: "100%" }}>
                    <tbody>
                      {/* <tr>
                        <Th>Medium :</Th>
                        <Td>{product?.sub_category?.name}</Td>
                      </tr> */}
                      <tr>
                        <Th>Style :</Th>
                        <Td>{product?.style?.name}</Td>
                      </tr>
                      <tr>
                        <Th>Material :</Th>
                        <Td>{product?.material?.name}</Td>
                      </tr>
                      <tr>
                        <Th>Stock :</Th>
                        <Td>{product?.inventory.availableQty}</Td>
                      </tr>
                      <tr>
                        <Th>Size :</Th>
                        <Td>{artworkSize}</Td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    display: "grid",
                    gap: 4,
                    "table tr": {
                      lineHeight: 1.9,
                    },
                  }}
                >
                  <Typography variant="h6" fontWeight={600}>
                    Shipping Details
                  </Typography>

                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <Th>Delivery :</Th>
                        <Td>Shipping from kottayam, Kerala</Td>
                      </tr>
                      <tr>
                        <Th>Shipping :</Th>
                        <Td>Free International Shipping</Td>
                      </tr>
                      <tr>
                        <Th>Arrive :</Th>
                        <Td>Estimated arrival on 25 - 27 Oct 2023</Td>
                      </tr>
                    </tbody>
                  </table>
                </Box>
              </Grid>
            </Grid>

            <Grid item container xs>
              <Reviews product={product} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

function Th({ children }) {
  return <td style={{ color: grey[800], fontWeight: 500 }}>{children}</td>;
}

function Td({ children }) {
  return <td>{children}</td>;
}

export default Product;
