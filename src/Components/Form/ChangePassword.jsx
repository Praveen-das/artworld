import { Box, Button, Typography } from "@mui/material";
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
      {({ handleChange, handleSubmit, errors, touched }) => {
        return (
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
              <Typography variant="title.primary">Change password</Typography>
              <Button onClick={handleClose} sx={{ ml: "auto" }} size="small">
                cancel
              </Button>
              <Button onClick={handleSubmit} size="small" variant="contained">
                apply
              </Button>
            </Box>
            <TextField
              error={touched.old_password && errors.old_password}
              name="old_password"
              onChange={handleChange}
              label="Old password"
            />
            <TextField
              error={touched.password && errors.password}
              name="password"
              onChange={handleChange}
              label="New password"
            />
            <TextField
              error={touched.c_password && errors.c_password}
              name="c_password"
              onChange={handleChange}
              label="Confirm password"
            />
          </>
        );
      }}
    </Formik>
  );
}
