import { useLocation } from "react-router-dom";
import Seller from "../Components/Seller/Seller";
import SellerOnboardingSuccess from "../Components/Seller/SellerOnbording/SellerOnbordingSuccess";

function SellerPage() {
  const state = useLocation().state;

  if (state?.status === "success") return <SellerOnboardingSuccess />;
  return <Seller />;
}

export default SellerPage;
