import { Grid, Typography, TextField, Button, Checkbox, Box, Divider } from "@mui/material";
import "./login.css";
import { useFormik } from "formik";
import { loginValidation } from "../../Schema/authSchema.jsx";
import useAuth from "../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { TF_Style } from "../Seller/Tabs/style.js";
import SocialLogin from "./SocialLogin.jsx";

function Signin() {
  const { signin } = useAuth();
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
    signin(values)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        const { field, message } = err.response.data.error;
        setFieldError(field, message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">
          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography fontWeight={800} variant="tabTitle">
              Sign in to Artworld
            </Typography>
            <Typography>Welcome back! Please sign in</Typography>
          </Box>
        </Grid>

        <SocialLogin />

        <Grid item xs={12} mb={2}>
          <Divider>
            <Typography>or</Typography>
          </Divider>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "grid", gap: 4 }}>
            <TextField
              name="email"
              label="Email"
              InputLabelProps={{ shrink: true }}
              value={values.email}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              {...TF_Style}
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              autoComplete="false"
              InputLabelProps={{ shrink: true }}
              value={values.password}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              {...TF_Style}
            />
          </Box>
        </Grid>

        <Grid item xs={12} display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
            <Checkbox
              size="small"
              sx={{
                paddingLeft: 0,
                "&.Mui-checked": {
                  color: "var(--brand)",
                },
                transform: "translateY(-1px)",
              }}
            />
            Remember me
          </Typography>
          <Link to="/forgot-password">
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>Forgot password ?</Typography>
          </Link>
        </Grid>
        <Grid item xs={12} textAlign="center" mt={2}>
          <Button
            disabled={isSubmitting}
            fullWidth
            type="submit"
            size="large"
            sx={{
              background: "var(--brandGradient)",
              borderRadius: "50px",
              py: 1.5,
              fontWeight: 600,
              textTransform: "unset",
            }}
            variant="contained"
          >
            Log in
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" gap={1} justifyContent="center">
            <Typography>Don't have an account ?</Typography>
            <Link to="/sign-up">
              <Typography color="primary">Sign up</Typography>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
}

export default Signin;
