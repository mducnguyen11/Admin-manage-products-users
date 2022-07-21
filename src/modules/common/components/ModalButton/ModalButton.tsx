import { Button as MUIBTN, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Button from '../Button/Button';

interface Props {
  color?: string;
  name: string | React.ReactNode;
  modalTitle: string;
  modalContent: string;
  onClick?: Function;
  disabled?: boolean;
}

const ModalButton = (props: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      {typeof props.name == 'string' ? (
        <Button
          disabled={props.disabled ? props.disabled : false}
          color={props.color == 'yellow' ? props.color : 'purple'}
          onClick={() => {
            setOpen(true);
          }}
        >
          {props.name}
        </Button>
      ) : (
        <div
          onClick={() => {
            setOpen(true);
          }}
        >
          {props.name}
        </div>
      )}
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
          <MUIBTN
            variant="contained"
            color="error"
            onClick={() => {
              setOpen(false);
            }}
          >
            No
          </MUIBTN>
          <MUIBTN
            variant="contained"
            color="info"
            onClick={() => {
              setOpen(false);
              if (props.onClick) {
                props.onClick();
              }
            }}
          >
            Yes
          </MUIBTN>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ModalButton;
