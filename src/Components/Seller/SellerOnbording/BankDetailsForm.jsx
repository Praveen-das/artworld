import { Box, Button, Grid, TextField as _TextField, Typography, Divider, Checkbox } from "@mui/material";
import React from "react";
import TextField from "../../Ui/TextField";
import { useTheme } from "@mui/material/styles";

function BankDetailsForm({
  formData: { isSubmitting, values, errors, handleSubmit, touched, handleChange, handleBlur },
  onBack,
  open,
}) {
  if (!open) return null;

  return (
    <Grid container item xs={12}>
      <form onSubmit={handleSubmit}>
        <Grid container item xs={12} spacing={4} pt={2}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography variant="title.primary">Bank account</Typography>
            <Box ml="auto" display="flex" gap={1}>
              {/* <Button variant="text" onClick={onBack}>
                Back
              </Button> */}
              <Button disabled={isSubmitting || !values.tnc_accepted} variant="contained" type="submit">
                Next
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="account_number"
              name="account_number"
              label="Account Number"
              value={values.account_number}
              error={touched.account_number && Boolean(errors.account_number) && errors.account_number}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={values.ifsc_code}
              id="ifsc_code"
              name="ifsc_code"
              label="IFSC Code"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.ifsc_code && Boolean(errors.ifsc_code) && errors.ifsc_code}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={values.pan}
              id="pan"
              name="pan"
              label="PAN"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.pan && Boolean(errors.pan) && errors.pan}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={values.beneficiary_name}
              id="beneficiary_name"
              name="beneficiary_name"
              label="Beneficiary Name"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.beneficiary_name && Boolean(errors.beneficiary_name) && errors.beneficiary_name}
            />
          </Grid>
          <Grid item xs={12} mt={2}>
            <label style={{ display: "flex", alignItems: "center", width: "fit-content", curson: "pointer" }}>
              <Checkbox
                sx={{ ml: -1 }}
                value={values.tnc_accepted}
                onChange={handleChange}
                type="checkbox"
                size="small"
                name="tnc_accepted"
              />
              <Typography variant="h10">I Agree to the terms and conditions</Typography>
            </label>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
}

export default BankDetailsForm;
