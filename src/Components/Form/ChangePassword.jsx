import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import TextField from "../Ui/TextField";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useStore } from "../../Store/Store";
import { Formik } from "formik";
import { newPasswordSchema } from "../../Schema/userSchema";
import axiosClient from "../../lib/axiosClient";

export function ChangePassword({ data, onClose }) {
  const { currentUser, changePassword } = useCurrentUser();
  const setAlert = useStore((s) => s.setAlert);

  function handleClose() {
    onClose(false);
  }

  const handleChangingPassword = async (values, { resetForm, setFieldError, setSubmitting }) => {
    const body = {
      ...values,
      userId: currentUser.data.id,
    };

    try {
      const res = await changePassword.mutateAsync(body);
      
      setAlert({
        message: `Password changed successfully`,
        type: "success",
        toggled: true,
      });
      
      handleClose();
      resetForm();
    } catch (error) {
      const err = error.response.data;
      console.log(err);
      setFieldError(err.field, err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const initialValues = {
    old_password: "",
    password: "",
    c_password: "",
  };

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      validationSchema={newPasswordSchema}
      onSubmit={handleChangingPassword}
    >
      {({ handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => {
        return (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {/* Header */}
            <Box sx={{ pb: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 700, color: "var(--brandMain)" }}>
                Change Password
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, opacity: 0.8 }}>
                Choose a secure password to keep your account safe.
              </Typography>
            </Box>

            <Divider />

            {/* Form Fields Stack */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <TextField
                error={touched.old_password && errors.old_password}
                name="old_password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Old password"
              />
              <TextField
                error={touched.password && errors.password}
                name="password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                label="New password"
              />
              <TextField
                error={touched.c_password && errors.c_password}
                name="c_password"
                type="password"
                onChange={handleChange}
                onBlur={handleBlur}
                label="Confirm password"
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
                disabled={isSubmitting || changePassword.isLoading}
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
              Update Password
            </Button>
          </Box>
        </Box>
      );
    }}
  </Formik>
);
}
