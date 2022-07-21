import React, { useRef, useState } from 'react';
import { Button as MUIBTN, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from 'utils/constants';
import './header-user.scss';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { logout } from 'modules/auth/redux/authReducer';
import ModalButton from 'modules/common/components/ModalButton/ModalButton';
interface Props {}

const HeaderUser = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const w1 = useRef<HTMLDivElement>(null);
  const email = useSelector((state: AppState) => {
    return state.profile.user?.login;
  });
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <div
      onMouseMove={() => {
        w1.current?.classList.add('header-user-active');
      }}
      onMouseLeave={() => {
        w1.current?.classList.remove('header-user-active');
      }}
      className="header-user"
    >
      <i className="bx bx-user"></i>
      <div ref={w1} className="header-user-list">
        <a className="header-user-item" href="">
          MY Profile
        </a>
        <p className="header-user-email">{email}</p>
        <a
          onClick={() => {
            setOpenModal(true);
          }}
          className="header-user-item"
        >
          Logout
        </a>
        <Dialog
          fullWidth
          open={openModal}
          onClose={() => {
            setOpenModal(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Logout ?'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{'Confirm logout'}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <MUIBTN
              variant="contained"
              color="error"
              onClick={() => {
                w1.current?.classList.remove('header-user-active');
                setOpenModal(false);
              }}
            >
              No
            </MUIBTN>
            <MUIBTN
              variant="contained"
              color="info"
              onClick={() => {
                Cookies.remove(ACCESS_TOKEN_KEY);
                dispatch(logout());
                w1.current?.classList.remove('header-user-active');
              }}
            >
              Yes
            </MUIBTN>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default HeaderUser;
