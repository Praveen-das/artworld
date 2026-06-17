import { Box, Button, Divider, Typography } from "@mui/material";
import React from "react";
import { motion } from "framer-motion";
import TextField from "../Ui/TextField";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { useStore } from "../../Store/Store";
import { Formik } from "formik";
import { socialSchema } from "../../Schema/userSchema";

export function SocialMediaLinks({ data, onClose }) {
  const { addSocialMediaLink, removeSocialMediaLink } = useCurrentUser();
  const setAlert = useStore((s) => s.setAlert);

  function handleClose() {
    onClose(false);
  }

  function handleUpdate({ social }, { setSubmitting, setFieldError, resetForm }) {
    addSocialMediaLink
      .mutateAsync(social)
      .then(() => {
        setAlert({
          message: "Link added successfully",
          type: "success",
          toggled: true,
        });
        resetForm();
        setSubmitting(false);
      })
      .catch((err) => {
        const { field, message } = err.response?.data || { field: null, message: null };
        setFieldError(field.toLowerCase(), message);
        setSubmitting(false);
      });
  }

  function handleRemovingSocialMediaLink(data) {
    if (!data) return;
    removeSocialMediaLink.mutateAsync(data?.id).then(() => {
      setAlert({
        message: `${data?.name} link removed`,
        type: "success",
        toggled: true,
      });
    });
  }

  const initSocial = {
    social: [
      {
        name: "facebook",
        url: "",
      },
      {
        name: "instagram",
        url: "",
      },
      {
        name: "twitter",
        url: "",
      },
      {
        name: "linkedIn",
        url: "",
      },
    ],
  };

  return (
    <Formik initialValues={initSocial} validateOnChange={false} validationSchema={socialSchema} onSubmit={handleUpdate}>
      {({ handleChange, handleBlur, handleSubmit, touched, errors, isSubmitting }) => (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          {/* Header */}
          <Box sx={{ pb: 1 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "var(--brandMain)" }}>
              Social Profiles
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, opacity: 0.8 }}>
              Connect your social media links. Click the link icon to remove an existing URL.
            </Typography>
          </Box>

          <Divider />

          {/* Responsive 2-column Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              columnGap: 2.5,
              rowGap: 3,
            }}
          >
            <TextField
              id="social.0.url"
              label="Facebook URL"
              onChange={handleChange}
              onBlur={handleBlur}
              initialValue={data?.social["facebook"]?.url}
              error={touched.social?.[0]?.url && errors.social?.[0]?.url}
              onClick={() => handleRemovingSocialMediaLink(data?.social["facebook"])}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              id="social.1.url"
              label="Instagram URL"
              onChange={handleChange}
              onBlur={handleBlur}
              initialValue={data?.social["instagram"]?.url}
              error={touched.social?.[1]?.url && errors.social?.[1]?.url}
              onClick={() => handleRemovingSocialMediaLink(data?.social["instagram"])}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              id="social.2.url"
              label="Twitter URL"
              onChange={handleChange}
              onBlur={handleBlur}
              initialValue={data?.social["twitter"]?.url}
              error={touched.social?.[2]?.url && errors.social?.[2]?.url}
              onClick={() => handleRemovingSocialMediaLink(data?.social["twitter"])}
              sx={{ gridColumn: "span 1" }}
            />
            <TextField
              id="social.3.url"
              label="LinkedIn URL"
              onChange={handleChange}
              onBlur={handleBlur}
              initialValue={data?.social["linkedIn"]?.url}
              error={touched.social?.[3]?.url && errors.social?.[3]?.url}
              onClick={() => handleRemovingSocialMediaLink(data?.social["linkedIn"])}
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
              disabled={isSubmitting || addSocialMediaLink.isLoading}
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
              Apply Links
            </Button>
          </Box>
        </Box>
      )}
    </Formik>
  );
}
