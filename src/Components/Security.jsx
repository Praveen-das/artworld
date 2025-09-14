
export function Security() {
  let container = {
      width: "100%",
      boxSizing: "border-box",
      display: "flex",
      gap: 2,
      // mt: 'var(--vSpacing)',
    },
    iconboxProps = {
      sx: {
        width: 50,
        aspectRatio: 1,
        display: "grid",
        placeItems: "center",
        bgcolor: "var(--brandLight)",
        borderRadius: 1000,
      },
    },
    props = {
      sx: {
        width: "100%",
        display: "grid",
        justifyItems: "center",
        alignContent: "start",
        gap: 2,
        textAlign: "center",
      },
    },
    iconProps = {
      style: { width: "30px", height: "30px" },
    };

  return (
    <Box {...container}>
      <Box {...props}>
        <Box {...iconboxProps}>
          <FreeShippingIcon {...iconProps} />
        </Box>
        <Typography fontSize={14} fontWeight={600}>
          Free shipping on all orders
        </Typography>
      </Box>
      <Box {...props}>
        <Box {...iconboxProps}>
          <MoneybackIcon {...iconProps} />
        </Box>
        <Typography fontSize={14} fontWeight={600}>
          100% Money-back Guaranteed
        </Typography>
      </Box>
      <Box {...props}>
        <Box {...iconboxProps}>
          <PaymentIcon style={{ ...iconProps.style, scale: "0.9" }} />
        </Box>
        <Typography fontSize={14} fontWeight={600}>
          Super Secure Payments
        </Typography>
      </Box>
      <Box {...props}>
        <Box {...iconboxProps}>
          <ReturnPolicyIcon {...iconProps} />
        </Box>
        <Typography fontSize={14} fontWeight={600}>
          90 days return policy
        </Typography>
      </Box>
    </Box>
  );
}