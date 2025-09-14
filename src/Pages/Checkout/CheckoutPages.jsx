import { useLocation } from "react-router-dom";
import Checkout from "../../Components/Checkout/Checkout";
import PurchaseSuccess from "../../Components/Checkout/PurchaseSuccess";
import CheckoutFailed from "./CheckoutFailed";

function CheckoutPage() {
  const state = useLocation().state;
  
  if (state?.data) return <PurchaseSuccess />;
  if (state?.error) return <CheckoutFailed />;
  return <Checkout />;
}

export default CheckoutPage;
