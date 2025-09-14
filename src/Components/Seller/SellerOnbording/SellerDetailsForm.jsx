import { Box, Button, Grid, TextField as _TextField, Typography, Divider } from "@mui/material";
import React from "react";
import TextField from "../../Ui/TextField";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "../../../Hooks/useMediaQuery";

function SellerDetailsForm({
  formData: { isSubmitting, values, errors, handleSubmit, touched, handleChange, handleBlur },
  open,
}) {
  const theme = useTheme();
  const islg = useMediaQuery("sm");

  if (!open) return null;

  return (
    <Grid container item xs={12}>
      <form onSubmit={handleSubmit}>
        <Grid container item xs={12} spacing={4}>
          <Grid item xs={12} display="flex" justifyContent="space-between">
            <Typography variant="title.primary">Seller & Store Details</Typography>
            {islg && (
              <Box ml="auto">
                <Button disabled={isSubmitting} variant="contained" type="submit">
                  Next
                </Button>
              </Box>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={values.name}
              name="name"
              label="Name"
              error={touched.name && Boolean(errors.name) && errors.name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={values.email}
              name="email"
              label="Email"
              error={touched.email && Boolean(errors.email) && errors.email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={values.phone}
              name="phone"
              label="Phone number"
              error={touched.phone && Boolean(errors.phone) && errors.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item xs={12} textAlign="start">
            <Box
              sx={{
                border: "1px solid",
                borderColor: theme.palette.primary.light,
                color: theme.palette.primary.main,
                borderRadius: 4,
                px: 2,
                py: 2,
                display: "flex",
              }}
            >
              <Typography color="inherit" variant="subtitle2">
                Note:You cannot change the email address once it is registered. Please make sure you enter a valid and
                active email you have access to.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={4}>
          <Divider />
        </Grid>

        <Grid container item xs={12} spacing={4} mt={4}>
          <Grid item xs={6}>
            <TextField
              value={values.street1}
              name="street1"
              label="Street1"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.street1 && Boolean(errors.street1) && errors.street1}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={values.street2}
              name="street2"
              label="Street2"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.street2 && Boolean(errors.street2) && errors.street2}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={values.city}
              name="city"
              label="City"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.city && Boolean(errors.city) && errors.city}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={values.state}
              name="state"
              label="State"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.state && Boolean(errors.state) && errors.state}
            />
          </Grid>
          <Grid item xs={12}>
            <_TextField value="India" name="country" label="Country" variant="standard" fullWidth disabled />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={values.postal_code}
              name="postal_code"
              label="Postal Code"
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.postal_code && Boolean(errors.postal_code) && errors.postal_code}
            />
          </Grid>
          {!islg && (
            <Grid item xs={12}>
              <Button disabled={isSubmitting} fullWidth size="large" variant="contained" type="submit">
                Proceed to Next
              </Button>
            </Grid>
          )}
        </Grid>
      </form>
    </Grid>
  );
}

export default SellerDetailsForm;
