import { Box } from "@mui/material";

export function Image({ href, placeHolder, sx, ...props }) {
  function removePlaceholder(e) {
    const elm = e.currentTarget;
    if (elm) elm.style.backgroundImage = "";
  }

  return (
    <Box
      component="img"
      {...props}
      sx={{ ...sx, backgroundImage: `url(${placeHolder})` }}
      onLoad={removePlaceholder}
      alt={href}
      src={href}
      
    />
  );
}
