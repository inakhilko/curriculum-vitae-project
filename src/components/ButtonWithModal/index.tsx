import { ComponentProps, useState } from 'react';
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

const DialogWithPadding = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-container': {
    margin: 0,
  },
  '& .MuiPaper-root': {
    padding: '24px',
    gap: '12px',
    width: '100%',
  },
  '& .MuiDialogContent-root': {
    padding: '6px',
  },
  '& .MuiDialogActions-root': {
    padding: 0,
  },
  '& .MuiTypography-root': {
    padding: 0,
  },
}));

interface ButtonWithModalProps extends ComponentProps<'div'> {
  modalTitle: string;
  createOpenButton;
  createCancelButton;
  createConfirmButton;
}

function ButtonWithModal({
  modalTitle,
  createOpenButton,
  children,
  createCancelButton,
  createConfirmButton,
}: ButtonWithModalProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {createOpenButton?.(handleClickOpen)}
      <DialogWithPadding
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: 'background.default',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <DialogTitle id="alert-dialog-title">{modalTitle}</DialogTitle>
          <IconButton onClick={handleClose}>
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          {createCancelButton?.(handleClose)}
          {createConfirmButton?.(handleClose)}
        </DialogActions>
      </DialogWithPadding>
    </>
  );
}

export default ButtonWithModal;
