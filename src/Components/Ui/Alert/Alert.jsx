import { Suspense, lazy, useEffect, useState } from "react";
import { useStore } from "../../../Store/Store";
import "./style.css";

const AlertW = lazy(() => import("./AlertWrapper"))

function AlertMessage() {
  const [loaded, setLoaded] = useState(false)
  const { toggled, message, type } = useStore((state) => state.alert);
  const setAlert = useStore((state) => state.setAlert);

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    setAlert({
      toggled: false,
    });
  };

  useEffect(() => {
    setLoaded(true);
    return () => {
      setLoaded(false);
    }
  }, [])

  return (
    <Suspense >
      {
        loaded &&
        <AlertW toggled={toggled} message={message} type={type} handleClose={handleClose} />
      }
    </Suspense>
  );
}

export default AlertMessage;
