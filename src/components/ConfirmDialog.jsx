import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { MdInfoOutline } from "react-icons/md";

function ConfirmDialog({ open, desc, handleConfirm, handleCancel }) {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <MdInfoOutline />
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {desc}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleConfirm}>
          확인
        </Button>
        <Button variant="contained" color="primary" onClick={handleCancel}>
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;
