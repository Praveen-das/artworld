import { Grid, IconButton } from "@mui/material";
import { BASE_URL } from "../../Utils/urls";
import Google from "@mui/icons-material/Google";
import Facebook from "@mui/icons-material/Facebook";
import Twitter from "@mui/icons-material/Twitter";

function SocialLogin(props) {
  return (
    <Grid item xs={12} display="flex" justifyContent="space-evenly" {...props}>
      <IconButton
        size="small"
        aria-label="google"
        onClick={() => {
          window.open(`${BASE_URL}/auth/google`, "_self");
        }}
      >
        <Google sx={{ color: "#DB4437" }} />
      </IconButton>

      <IconButton
        size="small"
        aria-label="delete"
        onClick={() => {
          window.open(`${BASE_URL}/auth/facebook`, "_self");
        }}
      >
        <Facebook sx={{ color: "#4267B2" }} />
      </IconButton>
      
      <IconButton size="small" aria-label="delete">
        <Twitter sx={{ color: "#1DA1F2" }} />
      </IconButton>
    </Grid>
  );
}

export default SocialLogin;
