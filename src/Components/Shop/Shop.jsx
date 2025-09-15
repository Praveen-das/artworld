import { useState } from "react";
import "./shop.css";
import Card from "../Ui/Card/Card";
import { Box, Button, Divider, Grid, Menu, MenuItem, Pagination, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router-dom";
import { useProducts } from "../../Hooks/useProducts";
import Masonry from "react-masonry-css";
import { useFilter } from "../Layouts/Sidebar/useFilter";
import noresultImg from "../../Assets/Images/noresult.png";
import useFacets from "../../Hooks/useFacets";
import useMediaQuery from "../../Hooks/useMediaQuery";
import FilterMenu from "./FilterMenu";
import SortMenu from "./SortMenu";
import Sidebar from "../Layouts/Sidebar/Sidebar";
import { grey } from "@mui/material/colors";

const sortOptions = [
  {
    value: "createdAt_desc",
    name: "Most recent",
  },
  {
    value: "price_desc",
    name: "Price - high to low",
  },
  {
    value: "price_asc",
    name: "Price - low to high",
  },
  {
    value: "discount_desc",
    name: "Discount - high to low",
  },
  {
    value: "discount_asc",
    name: "Discount - low to high",
  },
];

function Shop() {
  const { searchParams, setPage } = useFilter();
  const { data: products = [], isLoading } = useProducts(searchParams.toString());
  const { facets } = useFacets();
  const { pathname } = useLocation();
  const isLg = useMediaQuery("md");
  const theme = useTheme();

  let pathName = pathname.slice(1);
  const data = facets?.data;
  const total = data?.total || 0;

  const handlePagination = (_, value) => {
    setPage(value);
  };

  if (pathName === "results" && !isLoading && !products?.length) return <NoResults />;
  return (
    <Grid container spacing={2} px={2}>
      {isLg && (
        <Grid item xs={2.5}>
          <Sidebar />
        </Grid>
      )}
      <Grid item xs={12} md={9.5}>
        <Stack height="100%" spacing={2}>
          {isLg && (
            <Box sx={{ display: "flex", justifyContent: "space-evenly", alignItems: "center" }}>
              {pathName === "results" && !isLoading && (
                <Box display="flex" alignItems="baseline">
                  <Typography fontSize={18}>Showing results for</Typography>
                  <Typography ml={1} fontSize={20} fontWeight={700}>
                    {searchParams.get("q") || ""}
                  </Typography>
                </Box>
              )}

              <Box sx={{ display: "flex", alignItems: "center", ml: "auto" }}>
                <Typography fontWeight={500} variant="subtitle2">
                  SORT BY :
                </Typography>
                <SortList />
              </Box>
            </Box>
          )}
          {!isLg && (
            <Box
              sx={{
                position: "sticky",
                top: 0,
                bgcolor: "white",
                zIndex: 1,
                display: "flex",
                color: grey[700],
                justifyContent: "space-between",
                alignItems: "center",
                p: 1,
              }}
            >
              <SortMenu />
              <Divider orientation="vertical" variant="middle" flexItem />
              <FilterMenu />
            </Box>
          )}
          <Box display="flex" flexDirection="column" sx={{ width: "100%" }}>
            <Box
              sx={{ "& .my-masonry-grid_column": { pl: 4 } }}
              component={Masonry}
              breakpointCols={{
                default: 3,
                [theme.breakpoints.values.sm]: 2,
              }}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {products.map((o, i) => (
                <Box sx={{ width: "100%", mb: 4 }} key={o?.id}>
                  <Card product={o} />
                </Box>
                // <Box component="img" width={300} sx={{ width: "100%" }} src={o.images[0]?.url} key={o.id} />
              ))}
            </Box>
          </Box>
          {/* <Grid item xs={12} display="flex" flexDirection="column">
        </Grid> */}
          <Box display="flex" mt="auto !important">
            {total > 10 && (
              <Pagination
                page={Number(searchParams.get("p") || 1)}
                color="primary"
                sx={{ mt: "auto", mx: "auto" }}
                onChange={handlePagination}
                count={Math.ceil(total / 20)}
              />
            )}
          </Box>
        </Stack>
      </Grid>
    </Grid>
  );
}

export default Shop;

function SortList() {
  const { setFilter, searchParams } = useFilter();

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);
  const order = searchParams.get("order");
  let sortTitle = sortOptions.find((o) => o.value === order)?.name ?? "Most recent";

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (value) => {
    setFilter("order", value, true);
    handleClose();
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        size="small"
      >
        <Typography noWrap variant="subtitle2">
          {sortTitle}
        </Typography>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        // defaultValue={}
      >
        {sortOptions.map(({ value, name }) => (
          <MenuItem dense onClick={() => handleSort(value)}>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function NoResults() {
  return (
    <>
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          maxHeight: "500px",
          display: "grid",
          justifyItems: "center",
          alignContent: "center",
          gap: 1,
        }}
      >
        <img height={200} src={noresultImg} alt="" />
        <Typography variant="h5">Sorry, no results found!</Typography>
        <Typography>Please check the spelling or try searching for something else</Typography>
      </Box>
    </>
  );
}
