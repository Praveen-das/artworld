import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import success from "../../Assets/success.gif";

function Success({ open, setOpen, title, message, callbackMessage, callbackURL = "/" }) {
  const navigate = useNavigate();

  const style = {
    boxSizing: "border-box",
    position: "absolute",
    display: "grid",
    placeItems: "center",
    textAlign: "center",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: "3em 3em",
    gap: 3,
    outline: "none",
    borderRadius: "40px",
  };

  return (
    <Modal open={open} onClose={() => navigate(callbackURL)} closeAfterTransition hideBackdrop>
      <Fade in={open}>
        <Box sx={style}>
          <img width={160} height={160} src={success} alt="" />
          <Typography variant="title.primary" sx={{ textTransform: "none" }} fontSize="1.5rem">
            Congradulations
          </Typography>
          <Typography variant="paragraph">Your account has been successfully created. Continue by loging in</Typography>
          <Button
            type="submit"
            size="large"
            sx={{
              background: "var(--brandGradient)",
              borderRadius: "50px",
              mt: 2,
            }}
            variant="contained"
            onClick={() => navigate(callbackURL)}
          >
            Continue
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}

export default Success;
