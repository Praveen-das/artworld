import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  Navigate,
  useLocation,
  useNavigate,
  ScrollRestoration,
} from "react-router-dom";

import { Suspense, lazy, useEffect } from "react";
import "./App.css";

import { MUIContext } from "./Context/MUIContext";

import LoadingScreen from "./Components/Ui/LoadingScreen";
import Header from "./Components/Layouts/Header/Header";
import Footer from "./Components/Layouts/Footer/Footer";
import SellerRegistrationPage from "./Pages/SellerRegistrationPage";
import useCurrentUser from "./Hooks/useCurrentUser";
import { toast } from "react-toastify";
import { Box, Button, Alert as MuiAlert } from "@mui/material";
import SellerOnbordingPage from "./Pages/SellerOnbordingPage";

const LoginPage = lazy(() => import("./Pages/LoginPage"));
const CollectionsPage = lazy(() => import("./Pages/CollectionsPage"));
const HomePage = lazy(() => import("./Pages/HomePage"));
const ProductPage = lazy(() => import("./Pages/ProductPage"));
const CheckoutPage = lazy(() => import("./Pages/Checkout/CheckoutPages"));
const CheckoutSuccess = lazy(() => import("./Pages/Checkout/CheckoutSuccess"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage"));
const ShoppingPage = lazy(() => import("./Pages/ShoppingPage"));
const SellerPage = lazy(() => import("./Pages/SellerPage"));
const ShoppingCartPage = lazy(() => import("./Pages/ShoppingCartPage"));
const StorePage = lazy(() => import("./Pages/StorePage"));
const Alert = lazy(() => import("./Components/Ui/Alert/Alert"));
const ForgotPasswordPage = lazy(() => import("./Pages/ForgotPasswordPage"));
const PasswordResetPage = lazy(() => import("./Pages/PasswordResetPage"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      {/* //--------------------- public routes ---------------------*/}
      <Route index element={<HomePage />} />
      <Route path="/shop" element={<Outlet />}>
        <Route index element={<ShoppingPage />} />
        <Route path="/shop/product/:product_id" element={<ProductPage />} />
      </Route>
      <Route path="/results" element={<ShoppingPage />} />
      <Route path="/categories" element={<Outlet />}>
        <Route index element={<CollectionsPage />} />
      </Route>
      <Route path="/artists/profile/:id" element={<StorePage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<PasswordResetPage />} />

      {/* //--------------------- private routes ---------------------*/}
      <Route element={<AuthRoutes />}>
        <Route path="/sign-in" element={<LoginPage />} />
        <Route path="/sign-up" element={<LoginPage />} />
        {/* <Route path="/chat" element={<ChatPage />} /> */}
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/cart" element={<ShoppingCartPage />} />

        <Route element={<AdminRoutes />}>
          <Route path="/dashboard" element={<SellerPage />} />
          <Route path="/seller/registration" element={<SellerRegistrationPage />} />
          <Route path="/seller/onboarding" element={<SellerOnbordingPage />} />
        </Route>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
    </Route>
  )
);

const App = () => <RouterProvider router={router} />;

function AuthRoutes() {
  const {
    currentUser: { data: user, isLoading, isFetched },
  } = useCurrentUser();
  const currentPath = useLocation().pathname;
  const LOGIN_ROUTE = "/sign-in";
  const SIGNUP_ROUTE = "/sign-up";

  const isAuthRoute = currentPath.startsWith(LOGIN_ROUTE) || currentPath.startsWith(SIGNUP_ROUTE);
  const isAuthenticated = Boolean(isFetched && user);

  if (isLoading) return <LoadingScreen />;

  if (isAuthenticated && isAuthRoute) return <Navigate to="/" replace />;
  if (isAuthenticated) return <Outlet />;
  if (isAuthRoute) return <Outlet />;
  return <Navigate to={LOGIN_ROUTE} replace />;
}

const props = { replace: true };

function AdminRoutes() {
  const user = useCurrentUser().currentUser.data;
  const location = useLocation();
  const currentPath = location.pathname;

  const sellerRegistrationPage = "/seller/registration";
  const sellerOnboardingPage = "/seller/onboarding";

  let isAdmin = false;
  let isConnected = false;

  isAdmin = Boolean(user?.role === "seller");
  isConnected = Boolean(user?.onboardingStatus === "success");

  if (location.state?.status === "success") return <Outlet />;
  if (!isAdmin && currentPath !== sellerRegistrationPage) return <Navigate to={sellerRegistrationPage} {...props} />;
  if (!isConnected && currentPath !== sellerOnboardingPage) return <Navigate to={sellerOnboardingPage} {...props} />;
  if (isAdmin && isConnected && !currentPath.startsWith("/dashboard")) return <Navigate to="/dashboard" {...props} />;

  return <Outlet />;
}

function Layout() {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onboarding_status = sessionStorage.getItem("onboarding_status");

    if (
      currentUser.isFetched &&
      currentUser.data?.role === "seller" &&
      currentUser.data?.onboardingStatus === "pending" &&
      location.pathname === "/" &&
      !onboarding_status
    ) {
      toast(
        ({ closeToast }) => (
          <MuiAlert variant="filled" icon={false} style={{ textWrap: "balance" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              Your Onboarding is still in progress. Press Continue to complete it.
              <div style={{ display: "flex", marginLeft: "auto", gap: "10px" }}>
                <Button size="small" color="inherit" onClick={closeToast}>
                  Skip
                </Button>
                <Button
                  size="small"
                  color="inherit"
                  onClick={() => {
                    closeToast();
                    navigate("/seller/onboarding");
                  }}
                >
                  Continue
                </Button>
              </div>
            </div>
          </MuiAlert>
        ),
        {
          delay: 500,
          hideProgressBar: true,
          autoClose: false,
          closeButton: false,
          style: { padding: 0, width: "400px" },
        }
      );
      sessionStorage.setItem("onboarding_status", 1);
    }
  }, [currentUser, location.pathname]);

  const isAdmin = window.location.pathname.startsWith("/dashboard");
  const isSignInPage = window.location.pathname.startsWith("/sign");
  const isSellerPage = window.location.pathname.startsWith("/seller");

  return (
    <Box id="App">
      <MUIContext>
        <Header />
        <div>
          <ScrollRestoration />
          <Suspense fallback={<LoadingScreen />}>
            <Alert />
            {/* <ChatEngin /> */}
            <Outlet />
          </Suspense>
        </div>
        {isAdmin || isSignInPage || isSellerPage ? <span /> : <Footer />}
      </MUIContext>
    </Box>
  );
}

export default App;
