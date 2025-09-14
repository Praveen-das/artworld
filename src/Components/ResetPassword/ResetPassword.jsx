import { Box, Button, Container, Typography } from "@mui/material";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axiosClient from "../../lib/axiosClient";
import { passwordResetSchema } from "../../Schema/userSchema";
import TextField from "../Ui/TextField";
import Success from "./Success";
import useCurrentUser from "../../Hooks/useCurrentUser";

function ResetPassword() {
  const location = useLocation();
  const { resetPassword } = useCurrentUser();
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function validateToken() {
      setLoading(true);
      const params = new URLSearchParams(location.search);
      const tokenString = params.get("token");

      try {
        const isValid = await axiosClient.get(`/token/verify?token=${tokenString}`);
        if (isValid) setToken(tokenString);
      } catch (error) {
        if (error instanceof AxiosError) return setError(error.response.data);
        if (error instanceof Error) return setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    validateToken();

    return () => {
      setSuccess(false);
      setError(null);
      setLoading(true);
      setToken("");
    };
  }, [location]);

  return loading ? null : error ? (
    <Container maxWidth="sm">
      <Box sx={{ mt: 6 }}>
        {error === "Token expired" ? (
          <ErrorMessage title={error} message="The password reset link has expired. Please request a new one." />
        ) : error === "Invalid token" ? (
          <ErrorMessage title={error} message="The password reset link is invalid or has already been used." />
        ) : error === "Token not found" ? (
          <ErrorMessage
            title="Token already used or doesn't exist"
            message="It may have already been used or expired. Please request a new one to continue."
          />
        ) : (
          <ErrorMessage
            title="Unknown error"
            message="Something went wrong. Please try again later or contact support if the issue persists."
          />
        )}
      </Box>
    </Container>
  ) : (
    <Container maxWidth="sm">
      <Success open={success} setOpen={setSuccess} />
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          try {
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            const passes = await passwordResetSchema.validate(data);
            const body = { ...passes, token };
            const res = await resetPassword.mutateAsync(body);

            if (res) {
              setSuccess(true);
            }
          } catch (error) {
            console.log(error);
            setError(error.message);
          }
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 4,
            width: "100%",
            mt: 4,
            borderRadius: 4,
            boxShadow: "0px 15px 45px -10px var(--shadow)",
            px: 6,
            py: 8,
          }}
        >
          <Typography variant="tabTitle">Password reset</Typography>
          <Typography variant="h10">
            Provide the email address associated with your account to recover your password.
          </Typography>

          <Box sx={{ display: "grid", gap: 4, mt: 4 }}>
            <TextField name="password" label="New password" onChange={() => setError(null)} error={error} />
            <TextField name="c_password" label="Confirm password" onChange={() => setError(null)} error={error} />
          </Box>
          <Button type="submit" variant="contained" mt={4}>
            Reset Password
          </Button>
        </Box>
      </form>
    </Container>
  );
}

function ErrorMessage({ title, message }) {
  const box = {
    // width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 4,
    borderRadius: 10,
    boxShadow: "0px 6px 30px -2px var(--shadow)",
    px: 6,
    py: 8,
  };

  return (
    <Box sx={box}>
      <Typography variant="tabTitle">{title}</Typography>
      <Typography variant="h10">{message}</Typography>
    </Box>
  );
}

export default ResetPassword;
