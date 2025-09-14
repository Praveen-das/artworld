import { Box, Container, Typography } from "@mui/material";
import NoOrders from "../../../../Assets/svg/noorders.svg?react";
import { emptyItemBoxStyle } from "../../styles";

export function NoOrdersScreen() {
  return (
    <Box
      sx={{
        display: "grid",
        placeItems: "center",
        textAlign: "center",
        gap: 2,
        px: 6,
        py: 4,
      }}
    >
      <NoOrders height={250} />
      <Typography variant="title.primary" fontWeight={500}>
        No orders found
      </Typography>
      <Typography>Looks like you haven't made any orders yet</Typography>
    </Box>
  );
}
