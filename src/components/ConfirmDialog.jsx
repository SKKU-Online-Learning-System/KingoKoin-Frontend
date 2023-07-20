import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { MdInfoOutline } from "react-icons/md";

function ConfirmDialog({ open, children, handleConfirm, handleCancel }) {
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>
        <MdInfoOutline />
      </DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
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
