import { Children, cloneElement, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import useWishlist from "../../../Hooks/useWishlist";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useEffect } from "react";

function WishlistButton({
  primaryText,
  secondaryText,
  Button,
  IconButton,
  buttonProps,
  productId,
  color = "primary",
  size = "small",
}) {
  const {
    addToWishlist,
    removeFromWishlist,
    wishlist: { data: wishlist },
  } = useWishlist();
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();

  const item = useMemo(() => wishlist?.find((p) => p.product_id === productId), [productId, wishlist]);

  function handleWishlist(e) {
    e.preventDefault();
    if (currentUser.data === null) return navigate("/sign-in");

    if (item) return removeFromWishlist.mutate(item.id);
    addToWishlist.mutate(productId);
  }

  return (
    <>
      {Button && (
        <Button
          {...buttonProps}
          startIcon={
            item ? (
              <FavoriteIcon fontSize={size} color="error" />
            ) : (
              <FavoriteBorderIcon fontSize={size} color="inherit" />
            )
          }
          onClick={handleWishlist}
          style={{ color }}
        >
          {item ? secondaryText : primaryText}
        </Button>
      )}

      {IconButton && (
        <IconButton {...buttonProps} onClick={handleWishlist} style={{ color }}>
          {item ? (
            <FavoriteIcon fontSize={size} color="error" />
          ) : (
            <FavoriteBorderIcon fontSize={size} color="inherit" />
          )}
        </IconButton>
      )}
    </>
  );
}

export default WishlistButton;
