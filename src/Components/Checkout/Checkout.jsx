import React, { useState } from "react";
import "./checkout.css";

import { Box, Grid, Button, Typography, Divider } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../../Hooks/useCart";
import useCurrentUser from "../../Hooks/useCurrentUser";
import LoadingScreen from "../Ui/LoadingScreen";
import EditsModal from "../Ui/Modals/EditsModal";

import { loadScript } from "../../Utils/utils";
import axiosClient from "../../lib/axiosClient";
import Visa from "../../Assets/svg/visa.svg?react";
import Mastercard from "../../Assets/svg/mastercard.svg?react";
import Upi from "../../Assets/svg/upi.svg?react";
import { useStore } from "../../Store/Store";
import { BASE_URL } from "../../Utils/urls";
import Card from "../Ui/Card";
import { gap, spacing } from "../../const";
import { getCartPricingDetails } from "../../Utils/product";
import useRzp from "../../Hooks/useRzp";

const button_style = {
  borderRadius: "100px",
  fontSize: "0.8rem",
};

const item = {
  boxSizing: "border-box",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  gap: { xs: 3, sm: 6 },
};

const container = {
  display: "grid",
  gap: { xs: 2, sm: 3 },
};

function Checkout() {
  const [open, setOpen] = useState(false);
  const {
    currentUser: { data: user },
  } = useCurrentUser();
  const address = user?.address;
  const location = useLocation();

  const product = location.state?.product;

  const {
    cart: { data, isLoading, isFetching, isFetched },
  } = useCart(!Boolean(product?.length));
  const cartItems = product || data?.items || [];

  if (isLoading || isFetching) return <LoadingScreen />;
  if (isFetched && !cartItems?.length) return <Navigate to="/cart" />;

  return (
    <>
      <EditsModal user={user} open={open} onClose={setOpen} />
      <Grid container spacing={spacing} px={spacing}>
        <Grid container item xs={12} sm={8} spacing={4}>
          <Grid item xs={12} mt={{ sm: 2 }}>
            <Typography variant="h5">Checkout</Typography>
          </Grid>
          <Grid item xs={12} minHeight="100%">
            <Box sx={item}>
              <Box sx={container}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="title.primary">Shipping Address</Typography>
                  <Button
                    onClick={() => setOpen(address ? "address.update" : "address.add")}
                    sx={button_style}
                    variant="outlined"
                    size="small"
                  >
                    {address ? "Edit" : "Add"}
                  </Button>
                </Box>
                <Card
                  sx={{
                    px: { xs: 2, sm: 4 },
                    py: { xs: 1.5, sm: 3 },
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {!address ? (
                    <Button onClick={() => setOpen("address.add")} sx={{ m: "auto" }}>
                      Add your address here
                    </Button>
                  ) : (
                    <>
                      <Typography variant="paragraph">{address.name}</Typography>
                      <Typography variant="body2">{address.address}</Typography>
                      <Typography variant="body2">
                        {address.city + " " + address.state + " " + address.pincode}
                      </Typography>
                      <Typography variant="body2">{address.mobile}</Typography>
                    </>
                  )}
                </Card>
              </Box>

              <Box sx={container}>
                <Typography variant="title.primary">Order Summary</Typography>
                <Box className="no-scrollbar" sx={{ display: "flex", gap: 2, overflowX: "scroll" }}>
                  {cartItems.map(({ id, product, quantity }) => (
                    <Box
                      key={id}
                      sx={{
                        width: 150,
                        aspectRatio: 1,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                      }}
                    >
                      <Box
                        component="img"
                        sx={{ width: "100%", height: "100%", borderRadius: 2 }}
                        width={100}
                        height={100}
                        src={product.images[0].url + "/tr:w-100"}
                        alt=""
                      />
                      <Typography variant="caption">Rs. {product.price * quantity}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>

              <Box sx={container}>
                <Typography sx={{ mr: 4 }} variant="title.primary">
                  We Support
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Upi width={50} height={50} />
                  <Visa width={50} height={50} />
                  <Mastercard width={50} height={50} />
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <CheckoutBox cartItems={cartItems} />
      </Grid>
    </>
  );
}

const CheckoutBox = ({ cartItems }) => {
  const user = useCurrentUser().currentUser.data;
  const setAlert = useStore((s) => s.setAlert);
  const [loading, setLoading] = useState(false);
  const { verifyPayment } = useRzp();
  const navigate = useNavigate();

  const { total } = getCartPricingDetails(cartItems);

  async function handlePurchase() {
    if (!user?.address) {
      setAlert({
        message: `You should provide an address`,
        type: "error",
        toggled: true,
      });
      return;
    }

    setLoading(true);

    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      alert("Razorpay SDK failed to load.");
      return;
    }

    const order_request_obj = cartItems.map(({ product, quantity }) => ({ quantity, productId: product.id }));

    const order = await axiosClient.post("/rzp/orders/purchase", order_request_obj).then((res) => res.data);

    if (!order || order.error) {
      console.log(order);
      alert("Server error. Are you online?");
      return;
    }

    async function handler(response) {
      const { data, error } = await verifyPayment.mutateAsync(response);
      if (error) navigate("/checkout", { state: { error }, replace: true });
      else navigate("/checkout", { state: { data }, replace: true });
      setLoading(false);
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      currency: order.currency,
      amount: order.amount?.toString(),
      order_id: order.id,
      name: "Artworld",
      description: "Artist registration",
      image: "http://localhost:1337/logo.svg?react",
      handler,
      prefill: {
        name: user?.displayName,
        email: user?.email,
        phone_number: user?.address?.phone,
      },
      config: {
        display: {
          hide: [
            {
              method: "wallet",
            },
            {
              method: "paylater",
            },
          ],
        },
      },
      modal: {
        ondismiss: async function () {
          const res = await axiosClient.post(`/orders/dismis/${order.id}`).then((res) => res.data);
          console.log(res);
          setLoading(false);
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
    rzp.on("payment.failed", async function (response) {
      const res = await axiosClient.post(`/orders/dismis/${order.id}`).then((res) => res.data);
      console.log(res);
      setLoading(false);
      console.log(response);
    });
  }

  return (
    <>
      <Grid item xs={12} sm={4} position="sticky" top="2rem" alignSelf="flex-start">
        <Card
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            bgcolor: { xs: "primary.light", sm: "unset" },
            px: 4,
            py: 5,
            borderRadius: 5,
            mt: { xs: 4, sm: 0 },
          }}
        >
          <Box
            sx={{
              display: "grid",
              justifyContent: "center",
              textAlign: "center",
              gap: 1,
            }}
          >
            <Typography variant="title.primary">Sub total</Typography>
            <Typography fontSize={28} fontWeight={800}>
              ₹{total || 0}
            </Typography>
          </Box>
          <Divider />
          <Typography variant="subtitle2">
            After clicking “Confirm Order”, you will be redirected to Razorpay to complete your purchase securely.
          </Typography>
          <LoadingButton
            sx={{ textTransform: "none", mt: 1 }}
            onClick={handlePurchase}
            // onClick={() => handler()}
            size="large"
            variant="contained"
            fullWidth
            loading={loading}
          >
            <Typography fontWeight={600} fontSize={17} sx={{ py: 0.5 }} color="white">
              Confirm Order
            </Typography>
          </LoadingButton>
          <Typography sx={{ mt: -1 }} variant="subtitle2" textAlign="center" mt={1}>
            All transactions are secure and encrypted.
          </Typography>
          {/* <a style={{ marginInline: 'auto' }} href="https://razorpay.com/" target="_blank" rel="noreferrer" > <img referrerPolicy="origin" src="https://badges.razorpay.com/badge-light.png " style={{ height: '45px', width: '113px' }} alt="Razorpay | Payment Gateway | Neobank" /></a> */}
        </Card>
      </Grid>
    </>
  );
};

export default Checkout;
