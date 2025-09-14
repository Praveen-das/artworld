import { Button, Divider, FormControl, FormControlLabel, Radio, RadioGroup, Stack, Typography } from "@mui/material";
import { ArrowDownWideNarrow, Divide } from "lucide-react";
import React, { useState } from "react";
import Modal from "../Ui/Modal";

const sortOptions = [
  {
    value: "createdAt_desc",
    name: "Most recent",
  },
  {
    value: "price_desc",
    name: "Price - high to low",
  },
  {
    value: "price_asc",
    name: "Price - low to high",
  },
  {
    value: "discount_desc",
    name: "Discount - high to low",
  },
  {
    value: "discount_asc",
    name: "Discount - low to high",
  },
];

function SortMenu() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button
        disableRipple
        color="inherit"
        // size="large"
        onClick={() => setOpen(true)}
        startIcon={<ArrowDownWideNarrow style={{ width: "0.8em", height: "0.8em" }} />}
      >
        Sort
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} onAnimationEnd={console.log}>
        <Stack spacing={2}>
          <Typography fontWeight={500}>SORT BY</Typography>
          <Divider />
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={sortOptions[0].value}
              name="radio-buttons-group"
              sx={{ gap: 2 }}
            >
              {sortOptions.map(({ name, value }) => (
                <FormControlLabel
                  key={value}
                  sx={{ justifyContent: "space-between", m: 0 }}
                  labelPlacement="start"
                  value={value}
                  control={<Radio sx={{ p: 0 }} size="small" />}
                  label={name}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Stack>
      </Modal>
    </>
  );
}

export default SortMenu;
