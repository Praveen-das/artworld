import { Box, Button, Chip, Divider, Grid, Typography } from "@mui/material";
import { Edit, Package, Trash2 } from "lucide-react";
import confirmAction from "../../../Ui/ConfirmationDialog/ConfirmationDialog";
import { useAdmin } from "../../../../Hooks/useProducts";
import Modal from "../../../Ui/Modal";
import Title from "../../../Ui/Title";

export function ViewProduct({ onClose, product, setModel }) {
  const { deleteProduct } = useAdmin();

  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const productImage = product?.images?.[0]?.url + "?tr=w-500";

  function handleDelete(productId) {
    confirmAction("Remove Product", "Press Confirm to Remove your product", () => {
      deleteProduct.mutate(productId);
    });
    onClose();
  }


  return (
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <Modal.Title mainPage="Products" onClose={onClose} />
      </Grid>

      <Grid item xs={12} lg={6}>
        <Box
          sx={{
            aspectRatio: "1",
            overflow: "hidden",
            borderRadius: 2,
            bgcolor: "grey.100",
          }}
        >
          <Box
            component="img"
            src={productImage}
            alt={product?.name}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transition: "transform 0.3s",
            }}
            onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          />
        </Box>

        {product.images?.length > 1 && (
          <Box display="flex" gap={1} mt={2} overflow="auto">
            {product.images.slice(1, 4).map((image, index) => (
              <Box
                key={index}
                width={80}
                height={80}
                sx={{
                  borderRadius: 1,
                  bgcolor: "grey.100",
                  overflow: "hidden",
                  flexShrink: 0,
                }}
              >
                <img
                  src={image.url + "?tr=w-100"}
                  alt={`${product?.name} ${index + 2}`}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    cursor: "pointer",
                    transition: "transform 0.2s",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                />
              </Box>
            ))}
          </Box>
        )}
      </Grid>

      {/* Product Details Section */}
      <Grid item xs={12} lg={6}>
        <Box display="flex" flexDirection="column" gap={3}>
          {/* Basic Info */}
          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography variant="h4" fontWeight="bold">
              {product?.name}
            </Typography>
            <Typography variant="subtitle1">{product.desc}</Typography>
            <Box display="flex" alignItems="center" gap={2} mt={2}>
              {product.discount > 0 ? (
                <>
                  <Typography variant="h5" fontWeight="bold" color="success.main">
                    ${discountedPrice.toFixed(2)}
                  </Typography>
                  <Typography sx={{ textDecoration: "line-through" }} color="text.secondary">
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Chip size="small" color="error" label={`${product.discount}% OFF`} />
                </>
              ) : (
                <Typography variant="h5" fontWeight="bold">
                  ${product.price.toFixed(2)}
                </Typography>
              )}
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <Package size={16} />
              <Typography variant="body2">
                Stock: <b>{product.inventory.availableQty} units</b>
              </Typography>
            </Box>
          </Box>

          <Divider />

          {/* Specifications */}
          <Box>
            <Title>Specifications</Title>
            <Box display="flex" flexDirection="column" gap={2} mt={2}>
              {[
                { label: "Category", value: product.category?.name },
                { label: "Subject", value: product.subject?.name },
                { label: "Style", value: product.style?.name },
                { label: "Material", value: product.material?.name },
                {
                  label: "Dimensions",
                  value: `${product.widthInInches}" × ${product.heightInInches}"`,
                },
              ].map(({ label, value }, idx) => (
                <Box key={idx} display="flex" justifyContent="space-between" py={1} bgcolor="grey.100" borderRadius={2}>
                  <Typography variant="body2">{label}</Typography>
                  <Typography variant="subtitle2">{value}</Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Divider />

          {/* Action Buttons */}
          <Box display={{ xs: "grid", sm: "flex" }} gap={2} pt={2}>
            <Button
              fullWidth
              size="large"
              startIcon={<Edit size={18} />}
              variant="contained"
              onClick={() => setModel((s) => ({ ...s, modal: "update_product" }))}
              sx={{ bgcolor: "primary.main", "&:hover": { bgcolor: "primary.dark" } }}
            >
              Update
            </Button>
            <Button
              fullWidth
              size="large"
              startIcon={<Trash2 size={18} />}
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
