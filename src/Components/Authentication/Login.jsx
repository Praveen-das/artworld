import { Box, Container, Grid, Typography } from "@mui/material";
import { memo } from "react";
import RightIcon from "@mui/icons-material/ChevronRight";
import LeftIcon from "@mui/icons-material/ChevronLeft";
import Signin from "./Signin";
import "./login.css";
import Signup from "./Signup";
import { useLocation } from "react-router-dom";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { spacing } from "../../const";

function Login() {
  const isSm = useMediaQuery("sm");
  const location = useLocation();
  const isSignup = location.pathname?.startsWith("/sign-up");

  const box_style = {
    zIndex: 100,
    width: "100%",
    height: "100%",
    display: "grid",
    gridTemplateColumns: { xs: "", sm: "1fr 1fr" },
    outline: "none",
    position: "relative",
    borderRadius: 4,
    overflow: "hidden",
    bgcolor: "white",
  };

  const mainElm = {
    transform: isSm && `translateX(${isSignup ? 0 : "100%"})`,
    px: { ...spacing, xs: 4 },
    py: { ...spacing },
    transition: "1s",
    bgcolor: "white",
  };

  const imageSection = {
    position: "relative",
    transform: `translateX(${isSignup ? 0 : "-100%"})`,
    p: 2,
    transition: "1s",
    bgcolor: "white",
  };

  return (
    <Box
      sx={{
        backgroundImage: "linear-gradient(transparent,var(--brandLight))",
        display: "grid",
        placeItems: "center",
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Box sx={box_style}>
          <Box sx={mainElm}>
            <Box sx={{ position: "relative" }}>
              <Box
                style={{
                  transition: "1s",
                  position: "absolute",
                  inset: 0,
                  opacity: 0,
                  zIndex: -1,
                  ...(!isSignup ? { opacity: 1, zIndex: 1 } : {}),
                }}
              >
                <Signin />
              </Box>
            </Box>

            <Box style={{ opacity: 0, zIndex: -1, transition: "1s", ...(isSignup ? { opacity: 1, zIndex: 1 } : {}) }}>
              <Signup />
            </Box>
          </Box>

          {isSm && (
            <Box sx={imageSection}>
              <Box sx={{ width: "100%", height: "100%", borderRadius: 4, overflow: "hidden", position: "relative" }}>
                <Box
                  style={{ opacity: 0, zIndex: -1, ...(isSignup ? { opacity: 1, zIndex: 1 } : {}) }}
                  className="signup_hero"
                >
                  <Grid item xs={12}>
                    <Typography color="white" fontSize="1.8rem">
                      Hello Friend !
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography lineHeight={1.4} color="white">
                      Signup now and start your journey with us
                    </Typography>
                  </Grid>
                  <Box className="signup_btn" sx={{ background: "white" }} type="submit" variant="contained">
                    <LeftIcon sx={{ width: "1.3em", height: "1.3em" }} />
                  </Box>
                </Box>

                <Box
                  style={{ opacity: 0, zIndex: -1, ...(!isSignup ? { opacity: 1, zIndex: 1 } : {}) }}
                  className="signin_hero"
                >
                  <Grid item xs={12}>
                    <Typography color="white" fontSize="1.8rem">
                      Welcome Back !
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography color="white" lineHeight={1.4}>
                      To keep connected with us, please login with your personal details
                    </Typography>
                  </Grid>
                  <Box className="signup_btn" sx={{ background: "white" }} type="submit" variant="contained">
                    <RightIcon sx={{ width: "1.3em", height: "1.3em" }} />
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Container>
    </Box>
  );
}

export default memo(Login);
