import { Box, Grid } from "@mui/material";
import { useEffect, useLayoutEffect, useState } from "react";
import { StyledTab, StyledTabs, TabPanel, tabStyling } from "../Ui/TabComponents";
import Dashboard from "./Tabs/Dashboard/Dashboard";
import Products from "./Tabs/Products/Products";
import "./style.css";

import useAuth from "../../Hooks/useAuth";
import {  ChartLine, Package } from "lucide-react";
import useMediaQuery from "../../Hooks/useMediaQuery";
import { useLocation, useNavigate } from "react-router-dom";
import { gap } from "../../const";

export default function Seller() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const sm = useMediaQuery("sm");
  const lg = useMediaQuery("lg");

  const tab = location.state?.initialTab || 0;

  const handleChange = (_, newValue) => {
    navigate(location.pathname, { state: { initialTab: newValue }, replace: true });
  };

  const handleLogout = async () => {
    await logout.mutateAsync();
  };

  return (
    <Box
      display="flex"
      height="100%"
      flexDirection={{ xs: "column", lg: "row" }}
      flexWrap={{ lg: "wrap" }}
      gap={gap}
      px={2}
    >
      <Grid container spacing={4}>
        <Grid item sm={12} lg={2.5} hidden={!sm}>
          <StyledTabs
            textColor="primary"
            orientation={lg ? "vertical" : "horizontal"}
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <StyledTab
              icon={<ChartLine style={{ width: "1.4em", height: "1.4em" }} />}
              label="Dashboard"
              {...tabStyling}
            />
            <StyledTab
              icon={<Package style={{ width: "1.4em", height: "1.4em" }} />}
              label="Manage Products"
              {...tabStyling}
            />
          </StyledTabs>
        </Grid>

        <Grid item xs>
          <Box px={{ sm: 2, md: 4 }}>
            <TabPanel value={tab} index={0}>
              <Dashboard />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <Products />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
