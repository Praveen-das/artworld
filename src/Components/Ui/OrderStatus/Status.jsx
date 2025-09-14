import { Box } from "@mui/material";
import "./status.css";
import { blue, green, orange, purple, red } from "@mui/material/colors";

const statusBg = {
  pending: orange[500],
  shipped: blue[500],
  delivered: green[500],
  cancelled: red[500],
  refunded: purple[500],
};

function Status({ status }) {
  return (
    <>
      <Box
        id="status"
        sx={{
          bgcolor: statusBg[status],
        }}
      >
        {status}
      </Box>
    </>
  );
}

export default Status;
