import { Dialog, DialogContent } from "@mui/material";
import { modalPaperProps } from "../../const";
import { Button, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ArrowLeft } from "lucide-react";

function Modal({ children, open, onClose, onAnimationEnd }) {
  return (
    <Dialog
      open={Boolean(open)}
      onClose={onClose}
      onAnimationEnd={onAnimationEnd}
      maxWidth="md"
      scroll="paper"
      PaperProps={modalPaperProps}
    >
      <DialogContent sx={{ p: 4, bgcolor: "none", borderRadius: 7 }}>{children}</DialogContent>
    </Dialog>
  );
}

function ModalTitle({ title, mainPage, onClose }) {
  return (
    <>
      <Button
        sx={{ color: grey[700], p: 0, pb: 2 }}
        disableRipple
        startIcon={<ArrowLeft style={{ width: "0.8em", height: "0.8em" }} />}
        variant="text"
        size="large"
        onClick={onClose}
      >
        {mainPage}
      </Button>
      <Typography variant="h5" fontWeight={800} letterSpacing={0.5} color="#222">
        {title}
      </Typography>
    </>
  );
}

Modal.Title = ModalTitle;

export default Modal;
