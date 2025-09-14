import { ArrowForward, CheckCircle } from "@mui/icons-material";
import { Avatar, Box, Button, Divider, Grid, Stack, Typography } from "@mui/material";
import { green } from "@mui/material/colors";
import { Mail, Package, Truck } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gap } from "../../const";
import Card from "../Ui/Card";
import Status from "../Ui/OrderStatus/Status";
import Title from "../Ui/Title";

const PurchaseSuccess = () => {
  const orders = useLocation().state?.data || [];
  // Mock order data for testing
  // const orders = [
  //   {
  //     orderId: "ORD123456",
  //     status: "Confirmed",
  //     amount: 5000,
  //     discount: 500,
  //     price: 4500,
  //     quantity: 1,
  //     product: {
  //       name: "Starry Night Canvas",
  //       images: [{ url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" }],
  //     },
  //   },
  //   {
  //     orderId: "ORD123457",
  //     status: "Confirmed",
  //     amount: 6000,
  //     discount: 800,
  //     price: 6000 - 800,
  //     quantity: 2,
  //     product: {
  //       name: "asdsa asdasd",
  //       images: [{ url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb" }],
  //     },
  //   },
  // ];

  const navigate = useNavigate();

  return (
    <Box maxWidth="lg" display="flex" flexDirection="column" alignItems="center" mx="auto" p={gap}>
      {/* Success Header */}
      <Box textAlign="center" mb={6} maxWidth="sm">
        <CheckCircle sx={{ fill: green[500], fontSize: 64, mb: 2 }} />
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Order Confirmed!
        </Typography>
        <Typography color="text.secondary">
          Thank you for your purchase. Your order has been successfully placed and expected to arrive in 3-5 business
          days.
        </Typography>
      </Box>

      <Grid container spacing={4} alignItems="flex-start">
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Stack spacing={4}>
            <Card sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
              {/* Order Items */}
              <Title>Items Ordered</Title>
              <Stack divider={<Divider />} spacing={4} mt={4}>
                {orders.map((order) => (
                  <Stack spacing={2}>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                          src={order.product.images[0]?.url + "/tr:w-100"}
                          variant="rounded"
                          sx={{ width: 56, height: 56 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {order.product.name}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Qty: {order.quantity}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography fontWeight={600}>₹{order.price}</Typography>
                    </Box>
                    <Divider />
                    <Box display="grid" gap={1}>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle2" color="text.secondary">
                          Subtotal
                        </Typography>
                        <Typography variant="body2">₹{order.price}</Typography>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Typography variant="subtitle2" color="text.secondary">
                          Discount
                        </Typography>
                        <Typography variant="body2">-₹{order.discount}</Typography>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      <Box display="flex" justifyContent="space-between" fontWeight={700}>
                        <Typography>Total</Typography>
                        <Typography fontWeight={600}>₹{order.price}</Typography>
                      </Box>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Card>
          </Stack>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          <Stack spacing={4} sx={{ position: { md: "sticky" }, top: { md: 32 }, height: "100%" }}>
            <Card sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, display: "grid", gap: 2 }}>
              <Typography variant="title.secondary" mb={2}>
                Quick Actions
              </Typography>
              <Button
                onClick={() => navigate("/profile", { state: { initialTab: 2 }, replace: true })}
                variant="contained"
                size="large"
                fullWidth
                endIcon={<ArrowForward />}
              >
                View All Orders
              </Button>
              <Button onClick={() => navigate("/shop", { replace: true })} variant="outlined" size="large" fullWidth>
                Continue Shopping
              </Button>
            </Card>

            <Card sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, display: "grid", gap: 2 }}>
              <Typography variant="title.secondary" mb={2}>
                What's Next?
              </Typography>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Mail color="var(--brand)" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Order Confirmation
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Check your email for order details
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2} mb={1}>
                <Package color="var(--brand)" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Processing
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    We'll prepare your items
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" alignItems="center" gap={2}>
                <Truck color="var(--brand)" />
                <Box>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Shipping Updates
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Track your package progress
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PurchaseSuccess;
