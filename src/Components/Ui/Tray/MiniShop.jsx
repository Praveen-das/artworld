import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { gap, landingMotionProps, spacing, vSpacing } from "../../../const";
import useFacets from "../../../Hooks/useFacets";
import { useProductQuery } from "../../../Hooks/useProducts";
import Card from "../Card/Card2";
import TitleWithCTA from "../TitleWithCTA";
import "./tray.css";

const path = new URLSearchParams();
path.append("order", "rating_desc");
path.append("limit", 9);
path.append("collection", 1);

function MiniShop() {
  const facets = useFacets().facets.data;
  const { data } = useProductQuery("popular-collections", "/products?" + path.toString());
  const navigate = useNavigate();

  const [tab, setTab] = useState({ id: null, idx: 0 });
  const tabRefs = useRef(null);
  const bgelm = useRef();

  const collections = facets?.collections || [];

  const handleNavigate = () => {
    const newpath = new URLSearchParams(path.toString());
    newpath.set("limit", 20);
    navigate("/shop?" + newpath.toString());
  };

  useEffect(() => {
    if (!tabRefs.current) return;
    positionHighlight(tabRefs.current);

    // tabRefs.forEach((elm) => {
    //   const elmRect = elm.getBoundingClientRect();

    //   elm.onmouseenter = () => {
    //     let top = elmRect.top - parentRect.top;
    //     let width = elmRect.width;
    //     setElmPosition(top, width);
    //   };
    // });

    // ref.parentNode.onmouseleave = () => {
    //   setElmPosition(top, width);
    // };
  }, [collections]);

  function positionHighlight(elm) {
    const rect = elm.getBoundingClientRect();
    const parentRect = bgelm.current.parentNode.getBoundingClientRect();
    const left = rect.left - parentRect.left + elm.parentNode.scrollLeft;
    const top = rect.top - parentRect.top;
    const width = rect.width;

    bgelm.current.style.left = left + "px";
    bgelm.current.style.top = top + "px";
    bgelm.current.style.width = width + "px";
  }

  return (
    <Box {...landingMotionProps} sx={{ mt: vSpacing, px: spacing }}>
      <Grid container rowSpacing={gap}>
        <Grid item xs={12}>
          <TitleWithCTA label="Get Popular Art Collection Here" onClick={handleNavigate} />
        </Grid>

        <Grid item xs={12} md={3.5}>
          <Box
            className="no-scrollbar"
            sx={{
              display: { xs: "flex", md: "grid" },
              gap: { xs: 1, sm: 2 },
              top: "1em",
              width: "100%",
              overflowX: "scroll",
              contain: "inline-size",
              position: "sticky",
              minHeight: 48,
            }}
          >
            <Box
              ref={bgelm}
              sx={(theme) => ({
                position: "absolute",
                top: 0,
                left: 0,
                width: "0px",
                height: { xs: `100%`, md: `calc(((100% / ${collections.length}) - ${theme.spacing(2)}))` },
                bgcolor: "primary.main",
                borderRadius: 5,
                zIndex: 0,
                transition:
                  "left 0.2s cubic-bezier(.4,0,.2,1), top 0.2s cubic-bezier(.4,0,.2,1), width 0.2s cubic-bezier(.4,0,.2,1)",
              })}
            />

            {/* Tab buttons */}
            {collections.map((s, idx) => {
              return (
                s && (
                  <Box
                    key={idx}
                    ref={(ref) => {
                      if (!tabRefs.current) tabRefs.current = ref;
                    }}
                    onClick={(e) => {
                      setTab({ id: s.id, idx });
                      path.set("collection", s.id);

                      positionHighlight(e.target);
                      e.target.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
                    }}
                    // onMouseEnter={() => setHoveredIdx(idx)}
                    sx={{
                      width: "max-content",
                      px: { xs: 2, sm: 6 },
                      py: 2,
                      borderRadius: 5,
                      cursor: "pointer",
                      position: "relative",
                      zIndex: 1,
                      transition: "color 0.2s cubic-bezier(.4,0,.2,1)",
                      color: tab.idx === idx ? "white" : "black",
                    }}
                  >
                    <Typography
                      whiteSpace="nowrap"
                      textTransform="capitalize"
                      fontSize={{ xs: 14, lg: 16 }}
                      fontWeight={300}
                      color="inherit"
                      sx={{ pointerEvents: "none" }}
                    >
                      {s.name}
                    </Typography>
                  </Box>
                )
              );
            })}
          </Box>
        </Grid>

        <Grid item xs={12} md={8.5}>
          <Box
            className="no-scrollbar"
            sx={{
              display: { xs: "flex", md: "grid" },
              gridTemplateColumns: { md: "repeat(3,1fr)" },
              columnGap: gap,
              rowGap: 8,
              overflow: "scroll",
              contain: "inline-size",
            }}
          >
            {data?.map((item) => (
              <Card
                sx={{
                  minWidth: { xs: "15em", md: "100%" },
                  aspectRatio: "9/16",
                }}
                product={item}
              />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MiniShop;
