import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React from "react";
import TextField from "../Ui/TextField";
import { TF_Style } from "../Seller/Tabs/style";
import { useFormik } from "formik";
import { loginValidation } from "../../Schema/authSchema";
import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { signinUser } from "../../Services/user.api";
import axiosClient from "../../lib/axiosClient";

const box = {
  // width: "100%",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  gap: 4,
  borderRadius: 10,
  boxShadow: "0px 6px 30px -2px var(--shadow)",
  px: 6,
  py: 8,
  my: "auto",
};

function SellerLogin() {
  const { signinAdmin, signin } = useAuth();
  const navigate = useNavigate();

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    setFieldError,
    setSubmitting,
  } = useFormik({
    initialValues: {
      email: "praveendask97@gmail.com",
      password: "asdasdasd",
    },
    validationSchema: loginValidation,
    onSubmit: (values) => {
      handleLogin(values);
    },
    validateOnChange: false,
  });

  function handleLogin(values) {
    signinAdmin(values)
      .then((data) => navigate("/dashboard"))
      .catch((err) => {
        const { field, message } = err.response.data.error;
        setFieldError(field, message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <>
      <Container maxWidth="xs" sx={{ height: "100%" }}>
        <Box display="flex" alignItems="center" width="100%" height="100%" mt={-4}>
          <form onSubmit={handleSubmit}>
            <Box sx={box}>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <Typography
                    sx={{ color: "var(--brand)" }}
                    fontWeight={600}
                    mb={2}
                    textAlign="center"
                    fontSize="1.5rem"
                  >
                    Admin Login
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="email"
                    label="Email"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.email && errors.email}
                    {...TF_Style}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    value={values.password}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={touched.password && errors.password}
                    {...TF_Style}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    disabled={isSubmitting}
                    type="submit"
                    size="large"
                    sx={{
                      background: "var(--brandGradient)",
                      borderRadius: "50px",
                      fontSize: "12px",
                      width: "100%",
                      mt: 4,
                    }}
                    variant="contained"
                  >
                    Log in
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </form>
        </Box>
      </Container>
    </>
  );
}

export default SellerLogin;
