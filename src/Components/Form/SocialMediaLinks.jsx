import { Box, Button, Typography } from "@mui/material";
import React from "react";
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
      {({ handleChange, handleSubmit, touched, errors }) => (
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
            <Typography variant="title.primary">Edit Social Media Links</Typography>
            <Button onClick={handleClose} sx={{ ml: "auto" }} size="small">
              cancel
            </Button>
            <Button disabled={addSocialMediaLink.isLoading} onClick={handleSubmit} size="small" variant="contained">
              apply
            </Button>
          </Box>
          <TextField
            id="social.0.url"
            label="Facebook URL"
            onChange={handleChange}
            initialValue={data?.social["facebook"]?.url}
            error={touched.social?.[0]?.url && errors.social?.[0]?.url && errors.social?.[0]?.url}
            onClick={() => handleRemovingSocialMediaLink(data?.social["facebook"])}
          />
          <TextField
            id="social.1.url"
            label="Instagram URL"
            onChange={handleChange}
            initialValue={data?.social["instagram"]?.url}
            error={touched.social?.[1]?.url && errors.social?.[1]?.url && errors.social?.[1]?.url}
            onClick={() => handleRemovingSocialMediaLink(data?.social["instagram"])}
          />
          <TextField
            id="social.2.url"
            label="Twitter URL"
            onChange={handleChange}
            initialValue={data?.social["twitter"]?.url}
            error={touched.social?.[2]?.url && errors.social?.[2]?.url && errors.social?.[2]?.url}
            onClick={() => handleRemovingSocialMediaLink(data?.social["twitter"])}
          />
          <TextField
            id="social.3.url"
            label="LinkedIn URL"
            onChange={handleChange}
            initialValue={data?.social["linkedIn"]?.url}
            error={touched.social?.[3]?.url && errors.social?.[3]?.url && errors.social?.[3]?.url}
            onClick={() => handleRemovingSocialMediaLink(data?.social["linkedIn"])}
          />
        </>
      )}
    </Formik>
  );
}
