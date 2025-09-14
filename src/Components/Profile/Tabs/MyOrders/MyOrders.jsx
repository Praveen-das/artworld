import {
  Avatar,
  Dialog,
  DialogContent,
  FormControl,
  MenuItem,
  Select,
  Step,
  stepClasses,
  stepConnectorClasses,
  StepLabel,
  stepLabelClasses,
  Stepper,
  styled,
} from "@mui/material";
import { useState } from "react";
import useSales from "../../../../Hooks/useSales";
import { NoOrdersScreen } from "./NoOrdersScreen";

import { Box, Button, Grid, Typography } from "@mui/material";
import Status from "../../../Ui/OrderStatus/Status";
import "./style.css";
import { Link } from "react-router-dom";
import Card from "../../../Ui/Card";
import useOrders from "../../../../Hooks/useOrders";
import { grey, red } from "@mui/material/colors";
import moment from "moment";
import { Eye, Home, Package, User } from "lucide-react";
import { gap, modalPaperProps } from "../../../../const";
import useMediaQuery from "../../../../Hooks/useMediaQuery";
import Modal from "../../../Ui/Modal";
import { toast } from "react-toastify";
import Title from "../../../Ui/Title";

function MyOrders() {
  const { data: orders = [] } = useOrders();

  return (
    <Grid container spacing={gap}>
      <Grid item xs={12}>
        <Typography variant="h5">My Orders - {orders?.length}</Typography>
      </Grid>
      <Grid container item xs={12}>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            width: "100%",
          }}
        >
          {!orders?.length ? (
            <NoOrdersScreen />
          ) : (
            orders?.map((order) => (
              <SalesOrder key={order.id} order={order} otherOrders={orders.filter((o) => o.id !== order.id)} />
            ))
          )}
        </Box>
      </Grid>
    </Grid>
  );
}

function SalesOrder({ order, otherOrders }) {
  const [open, setOpen] = useState("");

  const url = order.product.images[0].url + "/tr:w-100";

  return (
    <>
      <OrderModal salesOrder={order} otherOrders={otherOrders} open={open} onClose={() => setOpen(false)} />
      <Card
        sx={{
          p: gap,
          width: "100%",
          transform: "scale(1)",
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "scale(1.01)",
          },
        }}
      >
        <Box display="grid" gridTemplateColumns="200px auto" gap={4}>
          <Box sx={{ position: "relative", width: "100%", aspectRatio: 1 }}>
            <Box position="absolute" top={10} right={10} mb={2}>
              <Status status={order.status} />
            </Box>
            <Box
              component="img"
              sx={{ objectFit: "cover", width: "100%", height: "100%", borderRadius: 4 }}
              width={100}
              height={100}
              src={url}
              alt=""
            />
          </Box>

          <Box display="grid" gridTemplateColumns={{ md: "auto 1fr" }} gap={1}>
            <Box display="flex" flexDirection="column" gap={1}>
              <Link to={`/shop/product/${order.product?.id}`}>
                <Typography variant="h6" fontWeight={600}>
                  {order.product.name}
                </Typography>
              </Link>
              <Typography color={grey[600]} variant="subtitle2" mb={2}>
                Sold By:{order.order.salesPerson.displayName}
              </Typography>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              gap={2}
              alignItems={{ xs: "start", md: "end" }}
              gridRow={{ md: "span 4" }}
            >
              <Typography variant="body2" color={grey[600]}>
                Delivery expected by {moment(order.createdAt).add(5, "days").format("MMM Do YY")}
              </Typography>
              <Button
                variant="contained"
                onClick={() => setOpen(true)}
                startIcon={<Eye style={{ width: "1em", height: "1em" }} />}
                sx={{ px: 2 }}
              >
                View Details
              </Button>
            </Box>

            <Box display={{ xs: "none", md: "flex" }} flexDirection="column" gap={1}>
              <Typography fontWeight={600}>Total: ₹{order.price}</Typography>
              <Typography color={grey[600]} variant="subtitle2">
                Quantity:{order.quantity}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Card>
    </>
  );
}

const StyledStepper = styled(Stepper)(({ theme }) => ({
  [`&> :first-child .${stepLabelClasses.horizontal} .${stepLabelClasses.labelContainer}`]: {
    justifyContent: "start",
    textAlign: "start",
  },
  [`&> :last-child .${stepLabelClasses.horizontal} .${stepLabelClasses.labelContainer}`]: {
    justifyContent: "end",
    textAlign: "end",
  },
  [`& .${stepLabelClasses.root}`]: {
    position: "relative",
  },
  [`& .${stepLabelClasses.horizontal} .${stepLabelClasses.iconContainer}`]: {
    padding: 0,
  },
  [`& .${stepLabelClasses.horizontal} .${stepLabelClasses.labelContainer}`]: {
    position: "absolute",
    top: 40,
    display: "flex",
    justifyContent: "center",
  },
  [`& .${stepLabelClasses.root}.${stepLabelClasses.vertical}`]: {
    marginInline: theme.spacing(-2),
    paddingInline: theme.spacing(2),
    borderRadius: 10,
  },
  [`& .${stepClasses.vertical}.${stepClasses.completed} .${stepLabelClasses.vertical}`]: {
    background: "var(--brandLight50)",
  },
  [`& .${stepLabelClasses.root}.${stepLabelClasses.error}`]: {
    background: red["100"],
  },
  [`& .${stepConnectorClasses.vertical}`]: {
    // paddingLeft: 14,
  },
}));

const StyledStep = styled(Step)(({ theme }) => ({
  [`& .${stepLabelClasses.horizontal} .${stepLabelClasses.labelContainer}`]: {
    textAlign: "center",
  },
}));

const cancelReasons = [
  "Changed my mind about the artwork",
  "Found a different artwork",
  "Ordered by mistake",
  "Artwork is too expensive",
  "Delivery time is too long",
  "Payment issues",
  "Duplicate order",
  "No longer need the artwork",
  "Other reasons",
];

function OrderModal({ open, salesOrder, otherOrders, onClose }) {
  const { cancelOrder } = useSales();
  const isLg = useMediaQuery("sm");
  const [openOrderCancellation, toggleOrderCancellation] = useState(false);
  const [selectedReason, setSelectedReason] = useState(cancelReasons[0]);

  const delivered = salesOrder.status === "delivered";

  const steps = [
    {
      label: "Order Confirmed",
      desc: moment(salesOrder.createdAt).format("MMM Do YY"),
      completed: salesOrder.status === "pending",
    },
    {
      label: "Shipped",
      desc: moment(salesOrder.createdAt).format("MMM Do YY"),
      completed: salesOrder.status === "shipped",
    },
    {
      label: delivered ? "Delivered" : "Delivery",
      desc: "Expected by " + moment(salesOrder.createdAt).add(5).format("MMM Do YY"),
      completed: delivered,
    },
  ];

  const user = salesOrder.order.user;
  const address = user.address;
  const userAddress = `${address.address}, ${address.city}, ${address.state}, ${address.pincode}`;
  const cancelledOrder = salesOrder.status === "cancelled";

  const handleCancellingOrder = async () => {
    try {
      const res = await cancelOrder.mutateAsync({
        orderId: salesOrder.id,
        reason: selectedReason,
      });

      toast("Order cancelled successfully");
      toggleOrderCancellation(false);
    } catch (error) {
      console.log(error);
      toast("Failed to cancel order", { type: "error" });
    }
  };

  const handleChange = (event) => {
    setSelectedReason(event.target.value);
  };

  return (
    <Dialog
      open={Boolean(open)}
      onClose={() => {
        onClose();
        toggleOrderCancellation(false);
        setSelectedReason("");
      }}
      // onAnimationEnd={() => !open && setModel(null)}
      maxWidth="md"
      scroll="paper"
      PaperProps={modalPaperProps}
    >
      <DialogContent sx={{ p: 4, bgcolor: "none", borderRadius: 7 }}>
        {openOrderCancellation ? (
          <Grid container rowSpacing={4} pb={2}>
            <Grid item xs={12}>
              <Modal.Title
                title="Cancel Order"
                mainPage="Order Details"
                onClose={() => toggleOrderCancellation(false)}
              />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="title.secondary" sx={{ mb: 2, display: "block" }}>
                Reason
              </Typography>
              <FormControl size="small" fullWidth>
                <Select value={selectedReason} onChange={handleChange} inputProps={{ "aria-label": "Without label" }}>
                  {cancelReasons.map((reason) => (
                    <MenuItem key={reason} value={reason}>
                      {reason}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="title.secondary" sx={{ mb: 4, display: "block" }}>
                Cancellation Conditions
              </Typography>
              <Box display="grid" gap={4}>
                <Box display="flex" gap={3}>
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    width={50}
                    height={50}
                    bgcolor="primary.light"
                    color="primary.dark"
                    borderRadius={9999}
                  >
                    <Package />
                  </Box>
                  <Box flex={1} display="grid" gap={2}>
                    <Typography fontWeight={700}>Refunds</Typography>
                    <Typography>
                      The refund will be processed to your original payment method within 5–7 business days. You’ll
                      receive a confirmation once the refund is completed.
                    </Typography>
                  </Box>
                </Box>
                {salesOrder.quantity > 1 && (
                  <Box display="flex" gap={3}>
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      width={50}
                      height={50}
                      bgcolor="primary.light"
                      color="primary.dark"
                      borderRadius={9999}
                    >
                      <Package />
                    </Box>
                    <Box flex={1} display="grid" gap={2}>
                      <Typography fontWeight={700}>{salesOrder.quantity - 1} more item will be cancelled</Typography>
                      <Typography>
                        There is a minimum order quantity for this item. If you cancel any one, all unit of this item
                        will be cancelled.
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            </Grid>
            <Grid item display="flex" xs={12} mt={2}>
              <Button
                disabled={cancelOrder.isLoading}
                onClick={handleCancellingOrder}
                size="large"
                sx={{ ml: "auto", width: { xs: "100%", sm: "max-content" } }}
                variant="contained"
              >
                Accept and Continue
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container rowSpacing={4}>
            <Grid item xs={12}>
              <Modal.Title
                title={`Order Details - ${salesOrder.id}`}
                mainPage="Orders"
                onClose={() => onClose(false)}
              />
            </Grid>

            {/* product details */}
            <Grid item xs={12}>
              <Box display="flex" p={2}>
                <Box display="flex" flexDirection="column" flex={1}>
                  <Typography fontWeight={600}>{salesOrder.product.name}</Typography>
                  <Typography variant="subtitle2" color={grey[600]} fontWeight={500}>
                    Sold by {salesOrder.order.salesPerson.displayName}
                  </Typography>
                  <Box display="flex" alignItems="baseline" gap={1} mt="auto">
                    <Typography variant="subtitle2">2x</Typography>
                    <Typography fontWeight={600}>{salesOrder.price}</Typography>
                  </Box>
                </Box>
                <Avatar
                  src={salesOrder.product.images[0].url + "/tr:w-100"}
                  variant="rounded"
                  sx={{ width: 100, height: 100, borderRadius: 2, mr: 1 }}
                />
              </Box>
            </Grid>

            {/* steps */}
            <Grid item xs={12} mb={{ sm: !cancelledOrder && 12 }} mt={4}>
              <StyledStepper activeStep={1} orientation={!cancelledOrder && isLg ? "horizontal" : "vertical"}>
                {cancelledOrder ? (
                  <StyledStep>
                    <StepContent label="Order Cancelled" desc={salesOrder.cancellationReason} error />
                  </StyledStep>
                ) : (
                  steps.map((props) => (
                    <StyledStep completed={props.completed} key={props.label}>
                      <StepContent {...props} />
                    </StyledStep>
                  ))
                )}
              </StyledStepper>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <Title>Shipping Address</Title>
              </Box>
              <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                <Home size={16} />
                <Typography variant="body2" fontWeight={600}>
                  Home
                </Typography>
                <Typography variant="subtitle2" color="#333">
                  {userAddress}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1.5} mb={1}>
                <User size={16} />
                <Typography variant="body2" fontWeight={600}>
                  {address.name}
                </Typography>
                <Typography variant="subtitle2" color="#333">
                  {address.mobile}
                </Typography>
              </Box>
            </Grid>

            {!cancelledOrder && (
              <Grid item xs={12}>
                <Box display="flex" gap={2}>
                  <Button
                    onClick={() => toggleOrderCancellation(true)}
                    fullWidth
                    size={isLg ? "medium" : "large"}
                    variant="contained"
                    sx={{ px: 4 }}
                  >
                    Cancel Order
                  </Button>
                  <Button fullWidth size={isLg ? "medium" : "large"} variant="contained" sx={{ px: 4 }}>
                    Track Now
                  </Button>
                </Box>
              </Grid>
            )}

            {!!otherOrders.length && (
              <Grid item xs={12}>
                <Box sx={{ mb: 3 }}>
                  <Title>Other items in this order</Title>
                </Box>
                <Box display="grid" gap={1}>
                  {otherOrders.map((order) => (
                    <OrderItem key={order.id} item={order} />
                  ))}
                </Box>
              </Grid>
            )}
          </Grid>
        )}
      </DialogContent>
    </Dialog>
  );
}

function StepContent({ label, desc, error = false }) {
  return (
    <StepLabel error={error}>
      <Box display="grid" justifyContent="inherit" width={{ md: error ? "auto" : 200 }}>
        <Typography fontWeight={600}>{label}</Typography>
        {desc && (
          <Typography variant="subtitle2" color={grey[600]}>
            {desc}
          </Typography>
        )}
      </Box>
    </StepLabel>
  );
}

function OrderItem({ item }) {
  return (
    <Card>
      <Box display="flex" gap={2} sx={{ px: { md: 2 }, py: { xs: 1, md: 2 } }}>
        <Avatar
          src={item.product.images[0]?.url + "/tr:w-100"}
          variant="rounded"
          sx={{ width: 80, height: 80, borderRadius: 2, mr: 1 }}
        />
        <Box display="flex" flexDirection="column" flex={1}>
          <Typography variant="body2" fontWeight={700} color="#222">
            {item.product.name}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" fontWeight={500}>
            Sold by {item.order.salesPerson.displayName}
          </Typography>
          <Box display="flex" alignItems="baseline" gap={1} mt="auto">
            <Status status={item.status} />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}

export default MyOrders;
