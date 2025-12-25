import { Button, styled } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  background: "var(--brandGradient)",
  borderRadius: "50px",
  padding: "12px 0",
  fontWeight: 600,
  textTransform: "unset",
  transition: "all 0.3s ease",
  "&:disabled": {
    background: "#e0e0e0",
    color: "#9e9e9e",
    cursor: "not-allowed",
    pointerEvents: "auto",
  },
}));

export default StyledButton;
