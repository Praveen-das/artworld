import { Box, Button, Typography } from "@mui/material";
import React from "react";
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
          // const { field, message } = err.response?.data;
          // setFieldError(field.toLowerCase(), message);
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
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              pb: 2,
              gap: 2,
            }}
          >
            <Typography variant="title.primary">{Boolean(data) ? "Update" : "Add"} Address</Typography>
            <Button onClick={handleClose} sx={{ ml: "auto" }} size="small">
              cancel
            </Button>
            <Button onClick={handleSubmit} size="small" variant="contained">
              apply
            </Button>
          </Box>
          <TextField onChange={handleChange} name="name" label="Name" placeholder={data?.name}></TextField>
          <TextField
            onChange={handleChange}
            name="address"
            label="House name/Flat number"
            placeholder={data?.address}
          ></TextField>
          <TextField onChange={handleChange} name="city" label="City" placeholder={data?.city}></TextField>
          <TextField onChange={handleChange} name="state" label="State" placeholder={data?.state}></TextField>
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            name="pincode"
            label="Pincode/Zipcode"
            error={Boolean(errors.pincode && touched.pincode) && errors.pincode}
            placeholder={data?.pincode}
          ></TextField>
          <TextField
            onChange={handleChange}
            onBlur={handleBlur}
            name="mobile"
            label="Phone Number"
            error={Boolean(errors.mobile) && touched.mobile && errors.mobile}
            placeholder={data?.mobile}
            pattern={`^[0-9]`}
          ></TextField>
          {/* <Box>
                        <input
                            id="isDefault"
                            name="isDefault"
                            onChange={handleChange}
                            defaultChecked
                            style={{ transform: "translateY(1.5px)", marginRight: 15 }}
                            type="checkbox"
                        />
                        <label htmlFor='isDefault' style={{ fontSize: "0.9rem" }} >
                            Set as default shipping address.
                        </label>
                    </Box> */}
        </>
      )}
    </Formik>
  );
}
