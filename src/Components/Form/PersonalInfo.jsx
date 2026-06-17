import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
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
      {({ handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Header */}
          <Box sx={{ pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "var(--brandMain)" }}>
              Edit Personal Info
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, opacity: 0.8 }}>
              Update your display name, contact information, and public bio.
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
              onBlur={handleBlur}
              name="displayName"
              label="Display Name"
              error={touched.displayName && errors.displayName}
              placeholder={data?.displayName}
              sx={{ gridColumn: { xs: "span 1", sm: "span 1" } }}
            />
            <TextField
              onChange={handleChange}
              onBlur={handleBlur}
              name="phoneNumber"
              label="Phone Number"
              error={touched.phoneNumber && errors.phoneNumber}
              placeholder={data?.phoneNumber}
              sx={{ gridColumn: { xs: "span 1", sm: "span 1" } }}
            />
            {data?.provider === "web" && (
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                label="Email"
                error={touched.email && errors.email}
                placeholder={data?.email}
                sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}
              />
            )}
            {data?.role === "seller" && (
              <TextField
                onChange={handleChange}
                onBlur={handleBlur}
                name="bio"
                multiline
                rows={3}
                label="Bio"
                error={touched.bio && errors.bio}
                placeholder={data?.bio}
                sx={{ gridColumn: { xs: "span 1", sm: "span 2" } }}
              />
            )}
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
              disabled={isSubmitting || updateUser.isLoading}
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
              Apply Changes
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
}
