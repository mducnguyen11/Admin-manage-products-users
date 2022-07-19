import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
import Cookies from 'js-cookie';
import { ACCESS_TOKEN_KEY } from 'utils/constants';
import './header-user.scss';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { logout } from 'modules/auth/redux/authReducer';
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
        <a
          onClick={() => {
            Cookies.remove(ACCESS_TOKEN_KEY);
            dispatch(logout());
          }}
          className="header-user-item"
          href=""
        >
          Logout
        </a>
      </div>
    </div>
  );
};

export default HeaderUser;
