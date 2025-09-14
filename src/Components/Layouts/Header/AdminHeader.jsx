import "./header.css";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import Logo from "../../Ui/Logo";

function AdminHeader() {
  const { pathname } = useLocation();

  return (
    <Box
      sx={{
        px: 3,
        pb: 4,
      }}
    >
      <Logo />
    </Box>
  );
}

export default AdminHeader;
