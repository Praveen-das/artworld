import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import TextField from "../Ui/TextField";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useStore } from "../../Store/Store";
import { Formik } from "formik";
import { bioSchema, personalInfoSchema } from "../../Schema/userSchema";
import { removieEmptyValues } from "../../Utils/utils";

export function AddBio({ data, onClose }) {
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
    <Formik initialValues={{ bio: "" }} validateOnChange={false} validationSchema={bioSchema} onSubmit={handleUpdate}>
      {({ handleChange, handleBlur, handleSubmit, errors, touched, isSubmitting }) => (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Header */}
          <Box sx={{ pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "var(--brandMain)" }}>
              Edit Bio
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, opacity: 0.8 }}>
              Introduce yourself to the art community with a short bio.
            </Typography>
          </Box>

          <Divider />

          {/* Form Field */}
          <Box sx={{ minWidth: "100%" }}>
            {data?.role === "seller" ? (
              <TextField
                name="bio"
                onChange={handleChange}
                onBlur={handleBlur}
                multiline
                rows={4}
                label="Bio"
                error={touched.bio && errors.bio}
                placeholder={data?.bio || "Tell us about your artistic style and journey..."}
              />
            ) : (
              <Typography variant="body2" color="text.secondary">
                Bios are currently only available for seller profiles.
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
              Save Bio
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
}
