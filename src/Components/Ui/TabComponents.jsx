import styled from "@emotion/styled";
import { Box, Tab, Tabs } from "@mui/material";

export function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    value === index && (
      <Box
        sx={{
          position: "relative",
          flex: { xs: "1 1 100%", lg: "1 1 0" },
        }}
        {...other}
      >
        <Item>{children}</Item>
      </Box>
    )
  );
}

export const Item = styled(Box)(({ theme }) => ({
  ...theme.typography.body2,
  boxSizing: "border-box",
  height: "100%",
  position: "relative",
  color: theme.palette.text.primary,
  // padding: "0.3rem 1rem",
}));

export const StyledTabs = styled(Tabs)({
  // minHeight: 0,
  "& .MuiTabs-indicator": {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    // height: '100%',
    // zIndex: -1,
    // width: '100%',
    // backgroundColor: 'var(--brand)',
    // borderRadius: 20,
  },
  ".MuiTabs-flexContainer": {
    gap: 8,
  },
});

export const StyledTab = styled(Tab)(() => ({
  marginBlock: "0.3em",
  marginInline: "0.6em",
  fontWeight: 600,
  fontSize: 15,
  minHeight: "2.5em",
  height: "2.5em",
  gap: "0.5em",
  transition: "color 0.5s",
  textTransform: "capitalize",
  "&.Mui-selected": {
    // color: '#fff',
  },
  "&.Mui-focusVisible": {
    background: "red",
  },
  ".MuiButtonBase-root": {
    minWidth: 0,
  },
}));

export const tabStyling = {
  sx: { justifyContent: "left" },
  iconPosition: "start",
};
