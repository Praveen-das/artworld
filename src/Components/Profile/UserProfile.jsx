import { Box, Grid } from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LocalMallIcon from "@mui/icons-material/LocalMallOutlined";
import PersonIcon from "@mui/icons-material/PersonOutlineOutlined";
import SecurityIcon from "@mui/icons-material/Security";
import PasswordIcon from "@mui/icons-material/Password";

import { useState } from "react";
import { StyledTab, StyledTabs, TabPanel, tabStyling } from "../Ui/TabComponents";
import MyOrders from "./Tabs/MyOrders/MyOrders";
import MyWishlist from "./Tabs/MyWishlist/MyWishlist";
import ProfileDetails from "./Tabs/ProfileDetails/ProfileDetails";
import SecuritySettings from "./Tabs/Security/SecuritySettings";
import { Heart, ShieldCheck, ShoppingBag, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import useMediaQuery from "../../Hooks/useMediaQuery";

const tabs = [
  {
    label: "My Profile",
    Icon: User,
    component: <ProfileDetails />,
  },
  {
    label: "Security",
    Icon: ShieldCheck,
    component: <SecuritySettings />,
  },
  {
    label: "My Orders",
    Icon: ShoppingBag,
    component: <MyOrders />,
  },
  {
    label: "My Wishlist",
    Icon: Heart,
    component: <MyWishlist />,
  },
];

function UserProfile() {
  const navigate = useNavigate()
  const location = useLocation();
  const tab = location.state?.initialTab || 0;
  const sm = useMediaQuery("sm");
  const lg = useMediaQuery("lg");

  const handleChange = (_, newValue) => {
    navigate(location.pathname, { state: { initialTab: newValue }, replace: true });
  };

  return (
    <Box
      display="flex"
      height="100%"
      flexDirection={{ xs: "column", lg: "row" }}
      flexWrap={{ lg: "wrap" }}
      gap={{ sm: 4, md: 4 }}
      boxSizing="border-box"
      px={2}
    >
      <Grid container spacing={4}>
        <Grid item sm={12} lg={2.5} hidden={!sm}>
          <Box sx={{ maxWidth: "100vw" }}>
            <StyledTabs
              textColor="primary"
              variant={lg ? "standard" : "scrollable"}
              orientation={lg ? "vertical" : "horizontal"}
              value={tab}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {tabs.map(({ label, Icon }) => (
                <StyledTab key={label} {...tabStyling} icon={<Icon size={20} />} label={label} />
              ))}
            </StyledTabs>
          </Box>
        </Grid>

        <Grid item xs={12} lg={9.5}>
          <Box px={{ sm: 2, md: 4 }}>
            {tabs.map(({ component }, idx) => (
              <TabPanel key={idx} value={tab} index={idx}>
                {component}
              </TabPanel>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default UserProfile;
