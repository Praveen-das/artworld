import { Box, Button, Typography } from "@mui/material";
import React from "react";
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
    console.log(values);
    // updateUser
    //   .mutateAsync(values)
    //   .then(() => {
    //     setAlert({
    //       message: `${Object.keys(data)[0]} changed successfully`,
    //       type: "success",
    //       toggled: true,
    //     });
    //     resetForm();
    //     handleClose();
    //     setSubmitting(false);
    //   })
    //   .catch((err) => {
    //     const { field, message } = err.response?.data;
    //     setFieldError(field.toLowerCase(), message);
    //     setSubmitting(false);
    //   });
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      validateOnChange={false}
      validationSchema={emailSchema}
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
            <Typography variant="title.primary">Update Email</Typography>
            <Button onClick={handleClose} sx={{ ml: "auto" }} size="small">
              cancel
            </Button>
            <Button disabled={updateUser.isLoading} onClick={handleSubmit} size="small" variant="contained">
              apply
            </Button>
          </Box>

          {data?.provider === "web" && (
            <TextField name="email" onChange={handleChange} label="Email" placeholder={data?.email} />
          )}
        </>
      )}
    </Formik>
  );
}
