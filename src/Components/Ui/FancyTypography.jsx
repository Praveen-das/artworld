import { Typography } from "@mui/material";

function FancyTypography({ label1, label2, direction, ...props }) {
  return (
    <Typography {...(direction === "rtl" ? { ml: "auto" } : {})} fontSize={60} fontWeight={700} {...props}>
      {label1}
      <Typography
        as="span"
        sx={{
          background: "linear-gradient(to right, #9333ea, #2563eb)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          display: "inline-block",
          fontSize: "inherit",
          fontWeight: "inherit",
          ml: 2,
        }}
      >
        {label2}
      </Typography>
    </Typography>
  );
}

export default FancyTypography;
