import React from 'react';
import './row-table.scss';
import { Transaction } from 'models/transactions';
import { formatStatus, formatDate, STATUS_NAME } from 'modules/manageTransactions/utils';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { API_PATHS } from 'configs/api';

interface Props {
  item: Transaction;
  handleDelete: Function;
}
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const RowTable = (props: Props) => {
  const status = formatStatus(props.item);
  const date = formatDate(props.item.date_confirmed);
  const [isWarningOpen, setIsWarningOpen] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickOpenWarning = () => {
    setIsWarningOpen(true);
  };

  const handleDeleteTransaction = async () => {
    props.handleDelete(props.item.id, props.item.volume_input_in_input_currency);
    setIsWarningOpen(false);
  };
  const handleCloseError = () => {
    setIsWarningOpen(false);
  };
  return (
    <div className="table-row table-content-header">
      <div className="w-14">
        <h6>{status}</h6>
      </div>
      <div className="w-14">
        <h6>{date}</h6>
      </div>
      <div className="w-14">
        <h6>{props.item.currency}</h6>
      </div>
      <div className="w-14">
        <h6>{props.item.volume_input_in_input_currency}</h6>
      </div>
      <div className="w-rest">
        <h6>{props.item.payroll_id}</h6>
      </div>
      <div className="table-row-btns ">
        <button onClick={handleOpen}>
          <p>View Detail</p> <i className="bx bxs-chevron-down"></i>
        </button>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box className="table-detail-modal" sx={style}>
            <div className="table-row">
              <h6>Status : {status}</h6>
            </div>

            <div className="table-row">
              <h6>Curency : {props.item.currency}</h6>
            </div>
            <div className="table-row">
              <h6>Total : {props.item.volume_input_in_input_currency}</h6>
            </div>
            <div className="table-row">
              <h6>Invoice # : {props.item.payroll_id}</h6>
            </div>
            <div className="table-row">
              <h6>Payment type : {props.item.payment_type}</h6>
            </div>
            <div className="table-row">
              <h6>Async status : {props.item.async_status}</h6>
            </div>
            <div className="table-row">
              <h6>
                <a target="_blank" rel="noreferrer" href={API_PATHS.transactionsData + '/' + props.item.id}>
                  Link Data
                </a>
              </h6>
            </div>
          </Box>
        </Modal>
        <div>
          <i onClick={handleClickOpenWarning} className="bx bxs-trash"></i>

          <Dialog
            open={isWarningOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle style={{ marginTop: '20px' }} id="alert-dialog-title">
              {'Make sure that you want to delete this transaction?'}
            </DialogTitle>

            <DialogActions>
              <Button
                onClick={() => {
                  handleCloseError();
                }}
              >
                no, i dont
              </Button>
              <Button
                onClick={() => {
                  handleDeleteTransaction();
                }}
                autoFocus
              >
                yes
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default RowTable;
