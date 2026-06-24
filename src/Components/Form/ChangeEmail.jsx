import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import TextField from "../Ui/TextField";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useStore } from "../../Store/Store";
import { Formik } from "formik";
import { emailSchema, personalInfoSchema } from "../../Schema/userSchema";
import { removieEmptyValues } from "../../Utils/utils";

export function ChangeEmail({ data, onClose }) {
  const { updateUser } = useCurrentUser();

  const setAlert = useStore((s) => s.setAlert);

  function handleClose() {
    onClose(false);
  }

  const handleUpdate = (values, { resetForm, setFieldError, setSubmitting }) => {
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
        const { field, message } = err.response?.data;
        setFieldError(field.toLowerCase(), message);
        setSubmitting(false);
      });
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validateOnChange={false}
      validationSchema={emailSchema}
      onSubmit={handleUpdate}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Header */}
          <Box sx={{ pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "var(--brandMain)" }}>
              Update Email Address
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, opacity: 0.8 }}>
              Change the registered email address for your account.
            </Typography>
          </Box>

          <Divider />

          {/* Form Field */}
          <Box sx={{ minWidth: "100%" }}>
            {data?.provider === "web" ? (
              <TextField
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Email"
                error={touched.email && errors.email}
                placeholder={data?.email}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Email updates are only available for email-registered accounts.
              </Typography>
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
              Update Email
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
}
