import { Box, Button, Fade, Modal, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import success from "../../Assets/success.gif";

function Success({ open, setOpen }) {
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
    borderRadius: 10,
  };

  return (
    <Modal open={open} hideBackdrop>
      <Fade in={open}>
        <Box sx={style}>
          <img width={160} height={160} src={success} alt="" />
          <Typography variant="title.primary" sx={{ textTransform: "none" }} fontSize="1.5rem">
            Congradulations
          </Typography>
          <Typography variant="paragraph">Your password has been successfully reset. Try logging in</Typography>
          <Button
            type="submit"
            size="large"
            sx={{
              background: "var(--brandGradient)",
              borderRadius: "50px",
              mt: 2,
            }}
            variant="contained"
            onClick={() => {
              setOpen(false);
              navigate("/sign-in");
            }}
          >
            Login
          </Button>
        </Box>
      </Fade>
    </Modal>
  );
}

export default Success;
