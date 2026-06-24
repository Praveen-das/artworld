import React from "react";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

export function ShareButton({ props }) {
  const handleSharing = () => {
    navigator
      .share({
        url: window.location.href,
      })
      .catch((err) => console.log(err));
  };

  return (
    <IconButton onClick={handleSharing} size="small">
      <ShareIcon fontSize="small" {...props} />
    </IconButton>
  );
}
