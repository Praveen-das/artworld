import { IconButton } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { useStore } from "../Store/Store";
import { Copy } from "lucide-react";
import { grey } from "@mui/material/colors";

export function CopyToClipboard({ name, value, fontSize = 16 }) {
  const setAlert = useStore((s) => s.setAlert);

  const copyToClipboard = async (type, value) => {
    setAlert({ toggled: false });
    await navigator.clipboard.writeText(value);
    setAlert({
      toggled: true,
      message: `${type} copied to clipboard`,
      type: "info",
      time: 1000,
    });
  };

  return (
    <IconButton
      onClick={(e) => {
        e.stopPropagation();
        copyToClipboard(name, value);
      }}
    >
      <Copy color={grey[500]} style={{ width: "0.7em", height: "0.7em" }} />
    </IconButton>
  );
}
