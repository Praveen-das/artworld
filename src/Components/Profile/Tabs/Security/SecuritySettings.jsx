import { Box, Button, Grid, Typography } from "@mui/material";
import { useState } from "react";
import EditsModal from "../../../Ui/Modals/EditsModal";
import Card from "../../../Ui/Card";
import { gap } from "../../../../const";

export default function SecuritySettings() {
  const [open, setOpen] = useState(null);

  return (
    <>
      <EditsModal open={open} onClose={setOpen} />
      <Grid container spacing={gap}>
        <Grid item xs={12}>
          <Typography variant="h5">Security</Typography>
        </Grid>
        <Grid container item xs={12}>
          <Card sx={{ p: gap }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography variant="title.secondary">Change password</Typography>
              <Typography variant="h10">
                Update your current password to keep your account secure. Make sure to choose a strong password that you
                haven’t used before.
              </Typography>
              <Box mt={2}>
                <Button variant="contained" onClick={() => setOpen("changePassword")}>
                  Reset
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
