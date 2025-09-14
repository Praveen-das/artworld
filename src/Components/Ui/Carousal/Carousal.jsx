import Card from "../Card/Card";
import { Swiper, SwiperSlide, Mousewheel, Navigation } from "../../../lib/Swiper";

import "./carousal.css";
import { Box, IconButton } from "@mui/material";
import BackwardIcon from "@mui/icons-material/ArrowBackIosRounded";
import ForwardIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { useMemo, useRef, useState } from "react";

export function Carousal({ data, slidesPerView = "auto", CardElm }) {
  let [prevElm, setPrevElm] = useState(null);
  let [nextElm, setNextElm] = useState(null);

  let navbtn_sx = useMemo(
    () => ({
      position: "absolute",
      top: 20,
      zIndex: 100,
      background: "#e2e2e2",
      "&.Mui-disabled": {
        opacity: 0,
        transition: "0.5s",
      },
      ":hover": {
        background: "#e2e2e2",
      },
    }),
    []
  );

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <IconButton id="prevEl" ref={setPrevElm} size="small" sx={{ ...navbtn_sx, left: 15 }}>
        <BackwardIcon sx={{ fontSize: 16 }} />
      </IconButton>
      <IconButton id="nextEl" ref={setNextElm} size="small" sx={{ ...navbtn_sx, right: 15 }}>
        <ForwardIcon sx={{ fontSize: 16 }} />
      </IconButton>
      
      <Swiper
        slidesPerView={slidesPerView}
        spaceBetween={20}
        mousewheel={true}
        navigation={{
          nextEl: nextElm,
          prevEl: prevElm,
          disabledClass: "Mui-disabled",
        }}
        modules={[Mousewheel, Navigation]}
        className="carousal"
      >
        {!!data?.length &&
          data?.map((product) => (
            <SwiperSlide style={{ height: "" }} key={product?.id}>
              <CardElm product={product} />
            </SwiperSlide>
          ))}
      </Swiper>
    </Box>
  );
}
