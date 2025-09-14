import { Box, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Image } from "../Image";
import WishlistButton from "../WishlistButton/WishlistButton";

import "./card.css";

const Card = forwardRef(({ product, sx }, ref) => {
  const url = product?.images[0]?.url;

  const href = url + "?tr=w-400";
  const placeHolder = url + "?tr=w-5";

  return (
    <Link to={`/shop/product/${product?.id}`}>
      <Box
        ref={ref}
        sx={{
          ...sx,
          borderRadius: 5,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 3,
          cursor: "pointer",
          "&:hover .card_img": { transform: "scale(1.1)" },
        }}
      >
        <Box sx={{ width: "100%", height: "100%", contain: "size", borderRadius: 5, overflow: "hidden" }}>
          <Image
            className="card_img"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "0.3s ease-in-out",
            }}
            href={href}
            placeHolder={placeHolder}
            alt={product?.name}
          />
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="start">
          <Box>
            <Typography fontWeight={500}>{product?.name}</Typography>
            <Typography variant="subtitle2" color={grey[600]} sx={{ mt: 0.5, display: "block" }}>
              {product?.sales_person?.displayName}
            </Typography>
          </Box>
          <WishlistButton IconButton={IconButton} buttonProps={{ size: "small" }} productId={product?.id} />
        </Box>
      </Box>
    </Link>
  );
});

export default Card;
