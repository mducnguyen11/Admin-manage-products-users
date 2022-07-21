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
        <ModalButton
          name={<a className="header-user-item">Logout</a>}
          modalContent="Confirm log out ?"
          modalTitle="Hi"
          onClick={() => {
            Cookies.remove(ACCESS_TOKEN_KEY);
            dispatch(logout());
          }}
        />
      </div>
    </div>
  );
};

export default HeaderUser;
