import { Box, Button, Typography } from "@mui/material";
import React from "react";
import TextField from "../Ui/TextField";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useStore } from "../../Store/Store";
import { Formik } from "formik";
import { personalInfoSchema } from "../../Schema/userSchema";
import { removieEmptyValues } from "../../Utils/utils";

export function PersonalInfo({ data, onClose }) {
  const { updateUser } = useCurrentUser();

  const setAlert = useStore((s) => s.setAlert);

  function handleClose() {
    onClose(false);
  }

  const handleUpdate = (values, { resetForm, setFieldError, setSubmitting }) => {
    removieEmptyValues(values);

    updateUser
      .mutateAsync(values)
      .then(() => {
        setAlert({
          message: `${Object.keys(data)[0]} changed successfully`,
          type: "success",
          toggled: true,
        });
        resetForm();
        handleClose();
        setSubmitting(false);
      })
      .catch((err) => {
        const { field, message } = err.response?.data || { field: null, message: null };
        setFieldError(field.toLowerCase(), message);
        setSubmitting(false);
      });
  };

  const initialValues = {
    displayName: "",
    email: "",
    phoneNumber: "",
    bio: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validationSchema={personalInfoSchema}
      onSubmit={handleUpdate}
    >
      {({ handleChange, handleSubmit }) => (
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
            <Typography variant="title.primary">Edit Personal Info</Typography>
            <Button onClick={handleClose} sx={{ ml: "auto" }} size="small">
              cancel
            </Button>
            <Button disabled={updateUser.isLoading} onClick={handleSubmit} size="small" variant="contained">
              apply
            </Button>
          </Box>
          <TextField name="displayName" onChange={handleChange} label="Display Name" placeholder={data?.displayName} />
          <TextField name="phoneNumber" onChange={handleChange} label="Phone Number" placeholder={data?.phoneNumber} />
          {data?.provider === "web" && (
            <TextField name="email" onChange={handleChange} label="Email" placeholder={data?.email} />
          )}
          {data?.role === "seller" && (
            <TextField name="bio" onChange={handleChange} multiline rows={3} label="Bio" placeholder={data?.bio} />
          )}
        </>
      )}
    </Formik>
  );
}
