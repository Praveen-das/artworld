import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useCurrentUser from "../../../Hooks/useCurrentUser";
import { useStore } from "../../../Store/Store";
import Avatar from "../../Ui/Avatar/Avatar";
import SearchWrapper from "../../Ui/Search/SearchWrapper";
import "./header.css";

import LoginIcon from "@mui/icons-material/LoginOutlined";
import CartIcon from "@mui/icons-material/ShoppingBagOutlined";
import {
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  AlignJustify,
  ChartLine,
  Heart,
  House,
  Layers2,
  LogIn,
  Package,
  ShieldCheck,
  ShoppingCart,
  User,
} from "lucide-react";
import { gap } from "../../../const";
import useMediaQuery from "../../../Hooks/useMediaQuery";
import { grey } from "@mui/material/colors";
import Logo from "../../Ui/Logo";

const _props = { hideCart: false, hideSearch: false };

function Header(props = _props) {
  const matches = useMediaQuery("sm");

  return <nav id="navbar">{matches ? <WindowHeader {...props} /> : <MobileHeader {...props} />}</nav>;
}

function WindowHeader({ hideCart = false, hideSearch = false }) {
  const { currentUser } = useCurrentUser();
  const { handleLogout } = useAuth();
  const isMd = useMediaQuery("md");

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 4,
        height: "4em",
        px: 4,
      }}
    >
      <Logo />
      {!hideSearch && (
        <Box width="40%" color={grey[600]}>
          <SearchWrapper mode={!isMd ? "dialog" : "dropdown"} />
        </Box>
      )}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3, color: grey[900], ml: { sm: "auto" } }}>
        {!hideCart && (
          <Link to="/cart">
            <CartIcon fontSize="small" />
          </Link>
        )}
        {currentUser.data !== null ? (
          <Select
            mainElement={
              <IconButton size="small">
                <Avatar
                  sx={{ width: 35, height: 35 }}
                  displayName={currentUser.data?.displayName}
                  profilePicture={currentUser.data?.photo}
                />
              </IconButton>
            }
          >
            {currentUser.data?.role === "seller" && <Menu to="/dashboard">Dashboard</Menu>}
            <Menu to="/profile">Profile</Menu>
            <Menu onClick={handleLogout}>Logout</Menu>
          </Select>
        ) : (
          <Link to="/sign-in">
            <LoginIcon fontSize="small" />
          </Link>
        )}
      </Box>
    </Box>
  );
}

function MobileHeader({ hideCart = false, hideSearch = false }) {
  const { pathname } = useLocation();
  const currentUser = useCurrentUser().currentUser.data;
  const navigate = useNavigate();

  const [openDrawer, toggleDrawer] = useState(false);

  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isAdminRoute = isDashboardRoute || pathname.startsWith("/seller");

  return (
    <>
      <Box
        sx={{
          // position: "fixed",
          top: 0,
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          height: "4em",
          px: gap,
          bgcolor: "white",
        }}
      >
        <IconButton size="small" onClick={() => toggleDrawer(true)}>
          <AlignJustify style={{ width: "1.1em", height: "1.1em" }} />
        </IconButton>

        <Link to={isDashboardRoute ? "/dashboard" : "/"}>
          <Logo hideLabel={!isDashboardRoute} label={isDashboardRoute ? "Dashboard" : "Artworld"} />
        </Link>

        <Box sx={{ display: "flex", alignItems: "center", gap: 2, ml: "auto" }}>
          {!hideSearch && <SearchWrapper mode="dialog" />}
          {!hideCart && (
            <IconButton sx={{ ml: "auto" }} size="small" onClick={() => navigate("/cart")}>
              <CartIcon sx={{ fontSize: 20 }} />
            </IconButton>
          )}
        </Box>

        <Drawer sx={{ position: "fixed", inset: 0 }} open={Boolean(openDrawer)} onClose={() => toggleDrawer(false)}>
          <Box
            sx={{ pb: 2, width: "70vw", height: "100%", bgcolor: "var(--brand)", color: "white" }}
            role="presentation"
            onClick={() => toggleDrawer(false)}
          >
            <Box sx={{ mx: 1, my: 2, bgcolor: "var(--brand)", borderRadius: 4 }}>
              {currentUser !== null ? (
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }} onClick={() => navigate("/profile")}>
                  <IconButton size="small" onClick={() => toggleDrawer(true)}>
                    <Avatar displayName={currentUser?.displayName} profilePicture={currentUser?.photo} />
                  </IconButton>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2, color: "white" }}>
                    <Typography color="white">Hello, {currentUser?.displayName}</Typography>
                  </Box>
                </Box>
              ) : (
                <Button
                  fullWidth
                  endIcon={<LogIn size={20} />}
                  component={Link}
                  variant="text"
                  size="large"
                  color="secondary"
                  to="/sign-in"
                  sx={{ justifyContent: "start" }}
                >
                  Login / Signup
                </Button>
              )}
            </Box>
            <Divider />
            <List>
              {(isDashboardRoute ? adminListItems : listItems).map(({ label, Icon, showIcon, to, state }, idx) => (
                <ListItem key={idx} disablePadding>
                  <ListItemButton onClick={() => navigate(to, { state })}>
                    {showIcon && (
                      <ListItemIcon sx={{ minWidth: 0, mr: 2 }}>
                        <Icon size={18} color="white" />
                      </ListItemIcon>
                    )}
                    <ListItemText primary={label} primaryTypographyProps={{ color: "white" }} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
}

const adminListItems = [
  {
    label: "Home",
    showIcon: true,
    to: "/",
    Icon: House,
  },
  {
    label: "Dashboard",
    showIcon: true,
    to: "/dashboard",
    state: { initialTab: 0 },
    Icon: ChartLine,
  },
  {
    label: "Manage Products",
    showIcon: true,
    to: "/dashboard",
    state: { initialTab: 1 },
    Icon: Package,
  },
];

const listItems = [
  {
    label: "Dashboard",
    showIcon: true,
    to: "/dashboard",
    state: { initialTab: 0 },
    Icon: ChartLine,
  },
  {
    label: "My Profile",
    showIcon: true,
    to: "/profile",
    state: { initialTab: 0 },
    Icon: User,
  },
  {
    label: "Security",
    showIcon: true,
    to: "/profile",
    state: { initialTab: 1 },
    Icon: ShieldCheck,
  },

  {
    label: "My Cart",
    showIcon: true,
    to: "/cart",
    state: null,
    Icon: ShoppingCart,
  },
  {
    label: "My Orders",
    showIcon: true,
    to: "/profile",
    state: { initialTab: 2 },
    Icon: Package,
  },
  {
    label: "My Wishlist",
    showIcon: true,
    to: "/profile",
    state: { initialTab: 3 },
    Icon: Heart,
  },
  {
    label: "All Categories",
    showIcon: true,
    to: "/categories",
    state: null,
    Icon: Layers2,
  },
];

function Select({ mainElement, children }) {
  return (
    <Box
      sx={{
        position: "relative",
        ":hover": {
          ".select_options": {
            opacity: 1,
            translate: "10px 0",
            pointerEvents: "all",
            transition: "0.2s",
          },
        },
      }}
    >
      {mainElement}
      <Box
        className="select_options"
        sx={{
          position: "absolute",
          right: 0,
          bgcolor: "white",
          opacity: 0,
          translate: "10px 20px",
          pointerEvents: "none",
          borderRadius: 2,
          overflow: "hidden",
          transition: "0.1s",
          boxShadow: "0 5px 10px rgb(0 0 0 / 17%)",
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

function Menu({ children, to, onClick }) {
  return (
    <Link to={to} onClick={onClick}>
      <Box
        sx={{
          pl: "1em",
          pr: "2em",
          py: "0.7em",
          bgcolor: "white",
          display: "flex",
          alignItems: "center",
          transition: "0.2s",

          ":hover": {
            color: "var(--brand) !important",
            background: "#0000001a !important",
          },
        }}
      >
        <Typography fontSize="0.85em" fontWeight={500}>
          {children}
        </Typography>
      </Box>
    </Link>
  );
}

function MessagesLink() {
  const unreadMessages = useStore((s) => s.unreadMessages);
  const totalUnreadMessages = useMemo(() => {
    const u_msg = Array.from(unreadMessages?.values());
    return (
      u_msg?.reduce((c, a) => {
        c += a.length;
        return c;
      }, 0) || 0
    );
  }, [unreadMessages]);

  return (
    <Badge badgeContent={totalUnreadMessages} color="primary">
      <Link to="/chat" className="create">
        Messages
      </Link>
    </Badge>
  );
}

export default Header;
