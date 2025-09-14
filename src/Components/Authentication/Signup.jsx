import { Grid, Typography, TextField, Button, Checkbox, IconButton, Box, Divider } from "@mui/material";
import Google from "@mui/icons-material/Google";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";
import { useFormik } from "formik";
import { signupValidation } from "../../Schema/authSchema";
import { TF_Style } from "../Seller/Tabs/style";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import Success from "./Success";
import { BASE_URL } from "../../Utils/urls";
import SocialLogin from "./SocialLogin";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldError } = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema: signupValidation,
    onSubmit: (values, { setSubmitting }) => {
      signup(values)
        .then(() => {
          setSubmitting(false);
          setOpen(true);
          navigate("/sign-in");
        })
        .catch((err) => {
          console.log(err);
          const {
            error: { field, message },
          } = err.response?.data || { error: { field: "", message: "" } };
          setFieldError(field?.toLowerCase(), message);
          setSubmitting(false);
        });
    },
    validateOnChange: false,
  });

  const canSignIn = values.displayName && values.email && values.password && agreed;
  const haveErrors = errors.displayName && errors.email && errors.password;

  return (
    <form onSubmit={handleSubmit}>
      <Success open={open} setOpen={setOpen} />
      <Grid container spacing={2}>
        <Grid item xs={12} mb={1} textAlign="center">
          <Box sx={{ display: "grid", gap: 2 }}>
            <Typography fontWeight={800} variant="tabTitle">
              Sign up
            </Typography>
            <Box display="flex" gap={1} justifyContent="center">
              <Typography>Already have an account ?</Typography>
              <Link to="/sign-in">
                <Typography color="primary">Sign in</Typography>
              </Link>
            </Box>
          </Box>
        </Grid>

        <SocialLogin />

        <Grid item xs={12}>
          <Divider>
            <Typography>or</Typography>
          </Divider>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: "grid", gap: 4 }}>
            <TextField
              id="displayName"
              name="displayName"
              label="Your name"
              InputLabelProps={{ shrink: true }}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.displayName && Boolean(errors.displayName)}
              helperText={touched.displayName && errors.displayName}
              {...TF_Style}
            />

            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              InputLabelProps={{ shrink: true }}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              {...TF_Style}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type="password"
              InputLabelProps={{ shrink: true }}
              inputProps={{ autoComplete: "off" }}
              onBlur={handleBlur}
              onChange={handleChange}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              {...TF_Style}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ fontSize: "12px", fontWeight: 500 }}>
            <Checkbox
              onChange={(e) => setAgreed(e.target.checked)}
              size="small"
              sx={{
                transform: "translateY(-1px)",
                paddingLeft: 0,
                "&.Mui-checked": {
                  color: "var(--brand)",
                },
              }}
            />
            I Agree to the Terms & Conditions
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            disabled={!canSignIn || haveErrors || isSubmitting}
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
            Sign up
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Signup;
