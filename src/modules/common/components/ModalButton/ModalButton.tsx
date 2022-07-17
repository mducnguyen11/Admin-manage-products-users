import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import Button from '../Button/Button';

interface Props {
  color?: string;
  name: string;
  modalTitle: string;
  modalContent: string;
  onClick: Function;
  disabled?: boolean;
}

const ModalButton = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        disabled={props.disabled ? props.disabled : false}
        color={props.color == 'yellow' ? props.color : 'purple'}
        onClick={() => {
          setOpen(true);
        }}
      >
        {props.name}
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{props.modalContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
              props.onClick();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalButton;
