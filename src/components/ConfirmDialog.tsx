import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";
import { InfoOutlined } from "@mui/icons-material";

interface IConfirmDialog {
  open: boolean;
  children: React.ReactNode;
  handleConfirm: () => void;
  handleCancel: () => void;
}

function ConfirmDialog({
  open,
  children,
  handleConfirm,
  handleCancel,
}: IConfirmDialog) {
  return (
    <Dialog open={open} onClose={handleCancel}>
      <DialogTitle>
        <InfoOutlined />
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
