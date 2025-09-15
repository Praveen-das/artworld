import { Box, Button, Grid, IconButton, Pagination, Skeleton, Typography } from "@mui/material";
import { Package, PackagePlus } from "lucide-react";
import { useState } from "react";
import { useAdmin } from "../../../../Hooks/useProducts";
import { CopyToClipboard } from "../../../../lib/CopyToClipboard";
import Search from "../../../Ui/Search/Search";
import "./products.css";

import { grey, purple } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";
import { gap, hidden } from "../../../../const";
import Card from "../../../Ui/Card";
import TableHead from "../Components/TableHead";
import Td from "../Components/Td";
import ProductModal from "./ProductModal";
import useCurrentUser from "../../../../Hooks/useCurrentUser";

const skeleton = new Array(5).fill();

function Products() {
  const [searchParams, setSearchParams] = useState(new URLSearchParams({ p: 1 }));
  const [productModal, setProductModal] = useState(null);
  const theme = useTheme();
  const currentUser = useCurrentUser().currentUser.data;

  const {
    products: { data, isLoading },
  } = useAdmin(currentUser?.id, searchParams.toString());

  const productList = data?.products || [];
  const total = data?.total || 0;

  function handleSearch(value) {
    if (value === "") return clearQuery();
    searchParams.set("q", value);
    setSearchParams(new URLSearchParams(searchParams));
  }

  function clearQuery() {
    searchParams.delete("q");
    setSearchParams(new URLSearchParams(searchParams));
  }

  function toogleAddProductModal() {
    setProductModal({ open: true, modal: "add_product" });
  }

  const handlePagination = (_, value) => {
    searchParams.set("p", value);
    setSearchParams(new URLSearchParams(searchParams));
  };

  return (
    <>
      <ProductModal
        open={Boolean(productModal?.open)}
        product={productModal?.product}
        modal={productModal?.modal}
        setModel={setProductModal}
        onClose={() => setProductModal((s) => ({ ...s, open: false }))}
      />

      <IconButton
        size="large"
        sx={{
          position: "fixed",
          bottom: { xs: 20, sm: 40 },
          right: { xs: 20, sm: 40 },
          bgcolor: "var(--brand)",
          color: "white",
          "&:hover": { bgcolor: theme.palette.primary.dark },
          zIndex: 1000,
        }}
        onClick={toogleAddProductModal}
      >
        <PackagePlus sx={{ width: "1em", height: "1em" }} />
      </IconButton>

      <Grid container rowSpacing={{ ...gap, xs: 4 }} pb={2}>
        <Grid container item xs={12} rowSpacing={{ xs: 4, sm: 0 }} columnSpacing={4}>
          <Grid item xs={12} sm="auto">
            <Typography whiteSpace="nowrap" variant="h5">
              Manage Products
            </Typography>
          </Grid>
          <Grid item xs={12} sm>
            <Box display="flex" alignItems="center" width="100%" height="100%" position="relative">
              <Box
                width={{ xs: "100%", sm: "auto" }}
                px={0.5}
                borderRadius={9999}
                bgcolor={{ xs: grey[300], sm: "unset" }}
                fontSize="1.2em"
                position="absolute"
              >
                <Search onInput={handleSearch} onClear={clearQuery} />
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <div className="dashboard-wrapper">
            <Card id="dashboard" sx={{ fontWeight: 500, p: 0 }}>
              <>
                <Box id="product_table" component="table">
                  <Box component="thead" textAlign="justify" mb={4}>
                    <Box bgcolor="primary.main" color="white" component="tr">
                      <TableHead sx={{ textAlign: "start" }}>Product</TableHead>
                      <TableHead textAlign="center">image</TableHead>
                      <TableHead sx={hidden.sm} textAlign="center">
                        id
                      </TableHead>
                      <TableHead textAlign="center">availible</TableHead>
                      <TableHead sx={hidden.sm} textAlign="center">
                        discount %
                      </TableHead>
                      <TableHead textAlign="end">Price</TableHead>
                    </Box>
                  </Box>

                  <Box sx={{ fontSize: "0.85em" }} component="tbody">
                    {!isLoading ? (
                      !!productList.length ? (
                        productList?.map(
                          (product) =>
                            product && (
                              <Box
                                onClick={() => setProductModal({ open: true, product, modal: "view_product" })}
                                sx={{ "&:hover": { bgcolor: "var(--brandLight50) !important" }, cursor: "pointer" }}
                                component="tr"
                                key={product.id}
                              >
                                <Td>{product.name}</Td>
                                <Td>
                                  <img id="dashbord_product--image" src={product.images[0]?.url + "?tr=w-100"} alt="" />
                                </Td>
                                <Td sx={hidden.sm}>
                                  <Box display="flex" justifyContent="center" alignItems="center">
                                    <Typography maxWidth="150px" variant="inherit" noWrap>
                                      {product.id}
                                    </Typography>
                                    <CopyToClipboard name="Product id" value={product.id} />
                                  </Box>
                                </Td>
                                <Td textAlign="center">{product.inventory.availableQty}</Td>
                                <Td sx={hidden.sm} textAlign="center">
                                  {product.discount}
                                </Td>
                                <Td sx={{ textAlign: "end" }}>₹{product.price}</Td>
                              </Box>
                            )
                        )
                      ) : (
                        <tr>
                          <Td colSpan={9999}>
                            <Box
                              sx={{
                                display: "grid",
                                placeItems: "center",
                                textAlign: "center",
                                gap: 2,
                                px: { xs: 2, sm: 6 },
                                py: 6,
                              }}
                            >
                              <Box
                                sx={{
                                  p: 2,
                                  bgcolor: purple[50],
                                  display: "grid",
                                  placeItems: "center",
                                  borderRadius: 99999,
                                  mb: 4,
                                }}
                              >
                                <Package color={purple[400]} style={{ width: "3em", height: "3em" }} />
                              </Box>
                              <Typography variant="title.primary" fontWeight={500}>
                                No Artworks Yet
                              </Typography>
                              <Typography width="clamp(300px, 50vw, 400px)">
                                Start showcasing your artistic talent by adding your first artwork to the platform.
                              </Typography>
                              <Box mt={2}>
                                <Button variant="contained" size="large" onClick={toogleAddProductModal}>
                                  Add Your Artwork
                                </Button>
                              </Box>
                            </Box>
                          </Td>
                        </tr>
                      )
                    ) : (
                      skeleton.map((_, i) => (
                        <tr key={i}>
                          <Td>
                            <Skeleton animation="wave" />
                          </Td>
                          <Td>
                            <Skeleton animation="wave" />
                          </Td>
                          <Td>
                            <Skeleton animation="wave" />
                          </Td>
                          <Td>
                            <Skeleton animation="wave" />
                          </Td>
                          <Td>
                            <Skeleton animation="wave" />
                          </Td>
                          <Td>
                            <Skeleton animation="wave" />
                          </Td>
                        </tr>
                      ))
                    )}
                  </Box>
                </Box>

                {total > 10 && (
                  <Pagination
                    page={Number(searchParams.get("p"))}
                    color="primary"
                    sx={{ mt: "auto" }}
                    onChange={handlePagination}
                    count={Math.ceil(total / 10)}
                  />
                )}
              </>
            </Card>
          </div>
        </Grid>
      </Grid>
    </>
  );
}

export default Products;
