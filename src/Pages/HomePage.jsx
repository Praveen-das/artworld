import { Suspense, lazy, useEffect, useRef } from "react";

import ShopByPrice from "../Components/ShopByPrice";
import OriginalWorks from "../Components/Ui/Tray/OriginalWorks";
import PopularCollections from "../Components/Ui/Tray/PopularCollections";
import Banner from "../Components/Banner/Banner";
import { Box } from "@mui/material";
import MiniShop from "../Components/Ui/Tray/MiniShop";
import { useScroll } from "framer-motion";
import { ScrollRestoration } from "react-router-dom";

const NewArrivals = lazy(() => import("../Components/Ui/Tray/NewArrivals"));

function HomePage() {
  return (
    <Box>
      <ScrollRestoration />
      <Banner />
      <Suspense>
        <NewArrivals />
        <MiniShop />
        {/* <PopularCollections /> */}
        <OriginalWorks />
        <ShopByPrice />

        {/* <ShopByMedium /> */}
        {/* <Tray
          title="ORIGINAL ARTWORKS"
          titleProps={{
            width: "min-content",
            lineHeight: 1,
            fontSize: 40,
          }}
          url='/products?orderBy=%7B"createdAt"%3A"asc"%7D&limit=10'
        /> */}
        {/* <AboutUsSection /> */}
      </Suspense>
    </Box>
  );
}

export default HomePage;
