import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { Image } from "../Image";
import "./card.css";

const Card = forwardRef(({ product, sx }, ref) => {
  const url = product?.images[0]?.url;
  const href = url + "?tr=w-400";
  const placeHolder = url + "?tr=w-5";

  return (
    <Link to={`/shop/product/${product?.id}`}>
      <Box
        className="product_card"
        ref={ref}
        sx={{
          ...sx,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Box sx={{ p: { sm: 4 }, pb: 2, borderRadius: 5, width: "100%", height: "100%" }}>
          <Image
            className="product_image"
            sx={{ width: "100%", borderRadius: 5 }}
            href={href}
            placeHolder={placeHolder}
            alt={product?.name}
          />
        </Box>
        <Box className="card_overlay">
          {/* <div className="wishlist-btn">
            <WishlistButton
              IconButton={IconButton}
              buttonProps={{ size: "small" }}
              productId={product?.id}
            />
          </div> */}
          <div className="card_overlay--items">
            <Typography fontWeight={600}>{product?.name}</Typography>
            <Typography variant="body2" color={grey[500]}>
              {product?.sales_person?.displayName}
            </Typography>
          </div>
        </Box>
      </Box>
    </Link>
  );
});

export default Card;
