import { Box, Button, Container, Link, Typography } from "@mui/material";
import { useState } from "react";
import TextField from "../Ui/TextField";
import { emailSchema } from "../../Schema/userSchema";
import Inbox from "../../Assets/svg/inbox.svg?react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../Hooks/useCurrentUser";
import { ValidationError } from "yup";
import { AxiosError } from "axios";

function ForgotPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const { requestPasswordResetLink } = useCurrentUser();

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      setIsLoading(true);
      const body = await emailSchema.validate(data);
      const res = await requestPasswordResetLink.mutateAsync(body);
      if (res.status === "success") {
        setEmail(body.email);
        setSubmitted(true);
      }
    } catch (err) {
      console.log(err);
      if (err instanceof ValidationError) return setError(err.message);
      if (err instanceof AxiosError) return setError(err.response.data.error);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const box_wrapper = {
    borderRadius: 4,
    boxShadow: "0px 15px 45px -10px var(--shadow)",
    px: 6,
    py: 8,
    my: "auto",
  };

  const box = {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 4,
  };

  return submitted ? (
    <Container maxWidth="md">
      <Box sx={{ ...box_wrapper, display: "flex", gap: 4, alignItems: "center" }}>
        <Inbox width={500} height={300} />
        <Box sx={box}>
          <Typography variant="tabTitle">Check your email</Typography>
          <Typography variant="h10">
            We have send password reset instructions to your email {email}. If it doesn't arrive soon, check your spam
            folder or
            <br />
            <Link underline="hover" onClick={() => setSubmitted(false)} sx={{ cursor: "pointer" }}>
              {" "}
              send the email again.
            </Link>
            <br />
            <Box mt={4}>
              <Link
                underline="hover"
                onClick={() => {
                  navigate("/sign-in");
                  setSubmitted(false);
                }}
                sx={{ cursor: "pointer" }}
              >
                Back to sign-in.
              </Link>
            </Box>
          </Typography>
        </Box>
      </Box>
    </Container>
  ) : (
    <Container maxWidth="sm">
      <form onSubmit={handleSubmit}>
        <Box sx={{ ...box, ...box_wrapper }}>
          <Typography variant="tabTitle">Forgot password</Typography>
          <Typography variant="h10">
            Provide the email address associated with your account to recover your password.
          </Typography>

          <Box mt={4}>
            <TextField name="email" label="Email" onChange={() => setError(null)} error={error} />
          </Box>
          <Button type="submit" variant="contained" mt={4}>
            Reset Password
          </Button>
        </Box>
      </form>
    </Container>
  );
}

export default ForgotPassword;
