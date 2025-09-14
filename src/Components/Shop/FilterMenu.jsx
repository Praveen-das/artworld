import { Box, Button, Dialog, Grid, IconButton, Stack, Typography } from "@mui/material";
import { ArrowLeft, Settings2 } from "lucide-react";
import { useState } from "react";
import Sidebar from "../Layouts/Sidebar/Sidebar";
import { useFilter } from "../Layouts/Sidebar/useFilter";

function FilterMenu() {
  const [open, setOpen] = useState(false);
  const { clearFilters } = useFilter();
  return (
    <>
      <Button
        disableRipple
        color="inherit"
        // size="large"
        onClick={() => setOpen(true)}
        startIcon={<Settings2 style={{ width: "0.8em", height: "0.8em" }} />}
      >
        Filter
      </Button>
      <Dialog open={open}>
        <Box
          sx={{
            position: "fixed",
            display: "flex",
            flexDirection: "column",
            inset: 0,
            width: "100%",
            height: "100%",
            bgcolor: "white",
          }}
        >
          <Box display="flex" alignItems="center" p={2}>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ mr: 2 }}>
              <ArrowLeft size={20} />
            </IconButton>
            <Typography>Filter</Typography>
            <Button onClick={clearFilters} sx={{ ml: "auto" }}>
              Clear Filters
            </Button>
          </Box>
          <Box className="no-scrollbar" flex={1} width="100%" height="100%" overflow="scroll">
            <Sidebar />
          </Box>
          {/* <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Typography fontWeight={600}>532 Items</Typography>
            <Button variant="contained">Apply</Button>
          </Box> */}
          {/* <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
          </Box> */}
        </Box>
      </Dialog>
    </>
  );
}

export default FilterMenu;
