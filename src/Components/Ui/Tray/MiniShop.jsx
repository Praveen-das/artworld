import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { gap, landingMotionProps, spacing, vSpacing } from "../../../const";
import useFacets from "../../../Hooks/useFacets";
import { useProductQuery } from "../../../Hooks/useProducts";
import Card from "../Card/Card2";
import TitleWithCTA from "../TitleWithCTA";
import "./tray.css";

function MiniShop() {
  const facets = useFacets().facets.data;
  const navigate = useNavigate();

  const collections = facets?.collections || [];
  const [tab, setTab] = useState({ id: null, idx: 0 });

  // Sync active tab state when collections finish loading
  useEffect(() => {
    if (collections.length > 0 && tab.id === null) {
      const defaultColl = collections.find((c) => c.id === 1) || collections[0];
      const defaultIdx = collections.findIndex((c) => c.id === defaultColl.id);
      setTab({ id: defaultColl.id, idx: defaultIdx >= 0 ? defaultIdx : 0 });
    }
  }, [collections, tab.id]);

  const activeCollectionId = tab.id ?? 1;
  const queryUrl = `/products?order=rating_desc&limit=9&collection=${activeCollectionId}`;

  const { data, isFetching } = useProductQuery("popular-collections", queryUrl);

  const handleNavigate = () => {
    navigate(`/shop?order=rating_desc&limit=20&collection=${activeCollectionId}`);
  };

  const sidebarContainerSx = {
    display: "flex",
    flexDirection: { xs: "row", md: "column" },
    gap: { xs: 1, md: 1 },
    top: { xs: 0, md: "2.5rem" },
    width: { xs: "100vw", md: "100%" },
    mx: { xs: -2, sm: -4, md: 0 },
    pr: { xs: 2, sm: 4, md: 8 },
    pl: { xs: 2, sm: 0 },
    overflowX: { xs: "auto", md: "visible" },
    position: "sticky",
    zIndex: 10,
    bgcolor: { xs: "rgba(255, 255, 255, 0.9)", md: "rgba(255, 255, 255, 0.45)" },
    backdropFilter: "blur(20px)",
    borderBottom: { xs: "1px solid rgba(0, 0, 0, 0.08)", md: "none" },
    border: { xs: "none", md: "1px solid rgba(0, 0, 0, 0.06)" },
    borderRadius: { xs: 0, md: "20px" },
    boxShadow: { xs: "0 4px 20px -10px rgba(0, 0, 0, 0.08)", md: "0 8px 30px -10px rgba(0, 0, 0, 0.05)" },
    "&::-webkit-scrollbar": { display: "none" },
    msOverflowStyle: "none",
    scrollbarWidth: "none",
  };

  return (
    <Box {...landingMotionProps} sx={{ mt: vSpacing, px: spacing }}>
      <Grid container rowSpacing={gap}>
        <Grid item xs={12}>
          <TitleWithCTA label="Get Popular Art Collection Here" onClick={handleNavigate} />
        </Grid>

        <Grid item xs={12} md={3.5}>
          <Box sx={sidebarContainerSx}>
            {/* Sidebar title - visible only on desktop */}
            <Box sx={{ display: { xs: "none", md: "block" }, px: 1.5, pb: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  textTransform: "uppercase",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  color: "text.secondary",
                  opacity: 0.6,
                }}
              >
                Categories
              </Typography>
            </Box>

            {/* Tab buttons */}
            {collections.map((s, idx) => {
              const isActive = tab.idx === idx;
              return (
                s && (
                  <Box
                    key={s.id || idx}
                    onClick={(e) => {
                      setTab({ id: s.id, idx });
                      e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
                    }}
                    sx={{
                      width: { xs: "max-content", md: "100%" },
                      px: { xs: 2.5, md: 2.5 },
                      py: { xs: 1, md: 1.5 },
                      borderRadius: { xs: "20px", md: "12px" },
                      cursor: "pointer",
                      position: "relative",
                      zIndex: 1,
                      color: isActive ? "#ffffff" : "var(--brandMain)",
                      transition: "color 0.25s cubic-bezier(.4,0,.2,1), background-color 0.25s cubic-bezier(.4,0,.2,1)",
                      "&:hover": {
                        bgcolor: isActive ? "transparent" : "rgba(0, 0, 0, 0.03)",
                      },
                    }}
                  >
                    {isActive && (
                      <Box
                        component={motion.div}
                        layoutId="activeTabPill"
                        sx={{
                          position: "absolute",
                          inset: 0,
                          background: "var(--brandGradient)",
                          borderRadius: { xs: "20px", md: "12px" },
                          boxShadow: "0 6px 16px -4px rgba(116, 123, 255, 0.3)",
                          zIndex: -1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 350,
                          damping: 30,
                        }}
                      />
                    )}
                    <Typography
                      whiteSpace="nowrap"
                      textTransform="capitalize"
                      fontSize={{ xs: 14, lg: 15 }}
                      fontWeight={isActive ? 600 : 400}
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
            component={motion.div}
            key={activeCollectionId}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", md: "repeat(3, 1fr)" },
              columnGap: gap,
              rowGap: { xs: 3, md: 6 },
              width: "100%",
              opacity: isFetching ? 0.7 : 1,
              transition: "opacity 0.25s ease-in-out",
            }}
          >
            {data?.map((item) => (
              <Box
                key={item.id}
                component={motion.div}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.97 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 120,
                      damping: 14,
                    },
                  },
                }}
                sx={{
                  width: "100%",
                  aspectRatio: { xs: "3/4.8", sm: "3/4.4", md: "3/4.2" },
                }}
              >
                <Card
                  sx={{
                    height: "100%",
                    width: "100%",
                  }}
                  product={item}
                />
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default MiniShop;
