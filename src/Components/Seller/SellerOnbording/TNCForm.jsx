import { Box, Button, Grid, TextField as _TextField, Typography, Divider, Checkbox } from "@mui/material";
import React from "react";
import TextField from "../../Ui/TextField";
import { useTheme } from "@mui/material/styles";
import { Field } from "formik";

function TNCForm({
  formData: { isSubmitting, values, errors, handleSubmit, touched, handleChange, handleBlur },
  open,
  onBack,
}) {
  if (!open) return null;
  return (
    <Grid container item xs={12}>
      <form onSubmit={handleSubmit}>
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography variant="title.primary">Terms & Conditions</Typography>
            <Box ml="auto" display="flex" gap={1}>
              <Button variant="text" onClick={onBack}>
                Back
              </Button>
              <Button disabled={isSubmitting || !values.tnc_accepted} variant="contained" type="submit">
                Submit
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="grid" gap={4}>
              <Typography sx={{ textDecoration: "underline" }}>Acceptance of Terms and Conditions</Typography>
              <Typography variant="h10">
                By proceeding, you confirm that you have read, understood, and agree to be bound by our Terms and
                Conditions. If you do not agree, please refrain from using our services.
              </Typography>
              <label style={{ display: "flex", alignItems: "center", width: "fit-content", curson: "pointer" }}>
                <Checkbox sx={{ ml: -1 }} onChange={handleChange} type="checkbox" size="small" name="tnc_accepted" />
                <Typography variant="h10">I Agree to the terms and conditions</Typography>
              </label>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default TNCForm;
