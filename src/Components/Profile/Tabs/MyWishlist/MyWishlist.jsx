import { Box, Chip, Divider, Grid, IconButton, Rating, Typography } from "@mui/material";
import React, { Fragment } from "react";
import "../../../Checkout/Components/Products/products.css";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { calculateDiscount } from "../../../../Utils/utils";
import StarEmptyIcon from "@mui/icons-material/StarBorderRounded";
import StarIcon from "@mui/icons-material/StarRounded";
import { Link } from "react-router-dom";
import EmptyWishlist from "./EmptyWishlist";
import useWishlist from "../../../../Hooks/useWishlist";
import useCurrentUser from "../../../../Hooks/useCurrentUser";
import Card from "../../../Ui/Card";
import { Trash2 } from "lucide-react";
import { grey } from "@mui/material/colors";
import { gap } from "../../../../const";

function MyWishlist() {
  const {
    currentUser: { data, isLoading, isFetching },
  } = useCurrentUser();
  const { removeFromWishlist } = useWishlist();
  const wishlist = data?.wishlist;

  return (
    <>
      <Grid container spacing={gap}>
        <Grid item xs={12}>
          <Typography variant="h5">My Wishlist - {wishlist?.length}</Typography>
        </Grid>
        <Grid item xs={12}>
          {!wishlist?.length ? (
            <EmptyWishlist />
          ) : (
            <Box display="flex" flexDirection="column" gap={2}>
              {wishlist?.map(({ id, product }, key) => {
                const url = product.images[0].url;

                return (
                  <Card
                    sx={{
                      transform: "scale(1)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.01)",
                      },
                    }}
                  >
                    <Box key={product?.id} position="relative" width="100%" height="100%" display="flex" gap={4} p={gap}>
                      <Box width={200} height={200}>
                        <Box
                          width="100%"
                          height="100%"
                          component="img"
                          className="img_border"
                          borderRadius={4}
                          sx={{ objectFit: "cover" }}
                          src={product.images[0].url + "/tr:w-100"}
                          alt=""
                        />
                      </Box>

                      <Box flex={1} width="100%" position="relative" display="flex" flexDirection="column" gap={1}>
                        <Link to={`/shop/product/${product?.id}`}>
                          <Typography variant="h6" fontWeight={600}>
                            {product.name}
                          </Typography>
                        </Link>

                        <Box display="flex" gap={1} color={grey[600]} mt={0.25} fontWeight={500}>
                          <Rating
                            size="small"
                            readOnly
                            icon={<StarIcon fontSize="small" />}
                            emptyIcon={<StarEmptyIcon fontSize="small" />}
                            name="read-only"
                            value={product?.rating || 0}
                          />
                          ({product?.rating || 0})
                        </Box>

                        <Box display="flex" gap={2} mt="auto" mb={2}>
                          <Box display="flex" alignItems="baseline" gap={2}>
                            <Typography fontWeight={600}>₹{product.price}</Typography>
                            {product?.discount > 0 && (
                              <Chip label={`${product?.discount}% off`} size="small" color="primary" />
                            )}
                          </Box>
                        </Box>

                        <Box position="absolute" top={0} right={0}>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.preventDefault();
                              removeFromWishlist.mutate(id);
                            }}
                          >
                            <Trash2 style={{ width: "0.9em", height: "0.9em" }} />
                          </IconButton>
                        </Box>
                      </Box>
                    </Box>
                  </Card>
                );
              })}
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  );
}

export default MyWishlist;
