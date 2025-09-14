import "./card.css";
import { Link } from "react-router-dom";
import WishlistButton from "../WishlistButton/WishlistButton";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import { forwardRef } from "react";
import { Image } from "../Image";
import Cardd from "../Card";
import { grey } from "@mui/material/colors";

const Card = forwardRef(({ product, sx }, ref) => {
  const url = product?.images[0]?.url;

  const href = url + "?tr=w-400";
  const placeHolder = url + "?tr=w-5";

  return (
    <Link style={{ color: "black" }} to={`/shop/product/${product?.id}`}>
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
          position: "relative",
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
        <Box>
          <Typography variant="title.secondary" fontWeight={500}>
            {product?.name}
          </Typography>
          <Typography variant="base2" color={grey[600]} sx={{ mt: 0.5, display: "block" }}>
            {product?.sales_person?.displayName}
          </Typography>
        </Box>
      </Box>
    </Link>
  );
});

export default Card;
