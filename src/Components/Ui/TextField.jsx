import { IconButton, InputAdornment, Tooltip as _Tooltip, TextField as _TextField } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import LinkOffIcon from "@mui/icons-material/LinkOff";
import styled from "@emotion/styled";
import { forwardRef } from "react";

const Tooltip = styled(({ className, ...props }) => (
  <_Tooltip {...props} classes={{ popper: className }} placement="top-end" />
))(({ theme }) => ({
  ".MuiTooltip-tooltip": {
    backgroundColor: theme.palette.error.main,
  },
}));

const StyledTextField = styled(_TextField)({
  "& label": {
    // fontWeight: 600,
    // fontSize: 17,
    color: "lch(20 0 0 / 1)",
  },
  "& .MuiInputBase-root": {
    // paddingTop: 8,
    // fontSize: 14,
    // fontWeight: 500,
  },
});

const TextField = forwardRef(
  ({ error, onClick, initialValue, startAdornment, inputProps, endAdornment, children, ...rest }, ref) => {
    return (
      <StyledTextField
        fullWidth
        inputRef={ref}
        size="small"
        variant="standard"
        InputLabelProps={{ shrink: true }}
        error={!!error}
        placeholder={initialValue}
        InputProps={{
          startAdornment,
          endAdornment: error ? (
            <Tooltip title={error} placement="top-end">
              <InputAdornment position="end">
                <ErrorOutlineIcon fontSize="small" color="error" />
              </InputAdornment>
            </Tooltip>
          ) : endAdornment ? (
            endAdornment
          ) : (
            initialValue && (
              <IconButton onClick={onClick} size="small">
                <LinkOffIcon fontSize="small" />
              </IconButton>
            )
          ),
          ...inputProps,
        }}
        {...rest}
      >
        {children}
      </StyledTextField>
    );
  }
);

export default TextField;
