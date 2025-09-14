import { Box, FormControl, Typography } from "@mui/material";
import TextField from "../../Ui/TextField";
import { useState } from "react";

function InfoField({ label, children }) {

  let title = {
    sx: { transformOrigin: 'left' },
    fontSize: 14,
    fontWeight: 500,
    color: 'gray',
    width: 'max-content'
  }


  return (
    <>
      <Box>
        <Typography {...title} >{label}</Typography>
        <Typography variant='h10'>{children}</Typography>
      </Box>
    </>
  );
}
