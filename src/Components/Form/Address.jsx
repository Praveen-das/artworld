import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import TextField from "../Ui/TextField";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useStore } from "../../Store/Store";
import { Formik } from "formik";
import { userAddressSchema, userAddressUpdateSchema } from "../../Schema/userSchema";
import { removieEmptyValues } from "../../Utils/utils";

export function Address({ data, onClose }) {
  const { addUserAddress, updateUserAddress } = useCurrentUser();
  const setAlert = useStore((s) => s.setAlert);

  function handleClose() {
    onClose(false);
  }

  const handleUpdate = (values, { resetForm, setSubmitting }) => {
    removieEmptyValues(values);

    if (!data) {
      addUserAddress
        .mutateAsync(values)
        .then((res) => {
          console.log(res.data);
          setAlert({
            message: `Address added successfully`,
            type: "success",
            toggled: true,
          });
        })
        .catch((err) => {
          console.log(err);
          setSubmitting(false);
          return;
        });
    } else {
      updateUserAddress
        .mutateAsync({ id: data?.id, ...values })
        .then((res) => {
          console.log(res);
          setAlert({
            message: `${Object.keys(data)[0]} changed successfully`,
            type: "success",
            toggled: true,
          });
        })
        .catch((err) => {
          console.log(err);
          setSubmitting(false);
          return;
        });
    }
    resetForm();
    handleClose();
    setSubmitting(false);
  };

  const initialValues = {
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validationSchema={data ? userAddressUpdateSchema : userAddressSchema}
      onSubmit={handleUpdate}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Header */}
          <Box sx={{ pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "var(--brandMain)" }}>
              {Boolean(data) ? "Update" : "Add New"} Address
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, opacity: 0.8 }}>
              Please enter your shipping and delivery details below.
            </Typography>
          </Box>

          <Divider />

          {/* Form Fields Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              columnGap: 2.5,
              rowGap: 3,
            }}
          >
            <TextField
              onChange={handleChange}
              name="name"
              label="Recipient Name"
              placeholder={data?.name}
              sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}
            />
            <TextField
              onChange={handleChange}
              name="address"
              label="House name / Flat number / Street"
              placeholder={data?.address}
              sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}
            />
            <TextField
              onChange={handleChange}
              name="city"
              label="City"
              placeholder={data?.city}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              onChange={handleChange}
              name="state"
              label="State"
              placeholder={data?.state}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              name="pincode"
              label="Pincode / Zipcode"
              error={Boolean(errors.pincode && touched.pincode) && errors.pincode}
              placeholder={data?.pincode}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              name="mobile"
              label="Phone Number"
              error={Boolean(errors.mobile) && touched.mobile && errors.mobile}
              placeholder={data?.mobile}
              pattern="^[0-9]"
              sx={{ gridColumn: "span 1" }}
            />
          </Box>

          <Divider sx={{ mt: 1 }} />

          {/* Action buttons at the bottom */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Button
              onClick={handleClose}
              variant="text"
              sx={{
                textTransform: "none",
                color: "text.secondary",
                fontWeight: 600,
                px: 3,
                py: 1.2,
                borderRadius: "10px",
              }}
            >
              Cancel
            </Button>
            <Button
              component={motion.button}
              whileTap={{ scale: 0.97 }}
              onClick={handleSubmit}
              variant="contained"
              disabled={isSubmitting}
              sx={{
                textTransform: "none",
                bgcolor: "var(--brand)",
                fontWeight: 600,
                px: 4,
                py: 1.2,
                borderRadius: "10px",
                boxShadow: "0 6px 20px -5px rgba(94, 71, 249, 0.3)",
                "&:hover": {
                  bgcolor: "var(--brandDark)",
                  boxShadow: "0 8px 25px -3px rgba(94, 71, 249, 0.4)",
                },
              }}
            >
              {Boolean(data) ? "Save Changes" : "Save Address"}
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
}
