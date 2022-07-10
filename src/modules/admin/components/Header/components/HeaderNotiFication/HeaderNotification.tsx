import { API_PATHS } from 'configs/api';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';
import './header-notification.scss';
interface Props {}

class HeaderNotificationState {
  unapproved_vendors: string;
  requests_for_payment: string;
  messages: string;
  returns: string;
  orders: string;
  constructor() {
    this.unapproved_vendors = '0';
    this.requests_for_payment = '0';
    this.messages = '0';
    this.returns = '0';
    this.orders = '0';
  }
}

const HeaderNotification = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [headerNotification, setHeaderNotification] = useState<HeaderNotificationState>(new HeaderNotificationState());
  const w1 = useRef<HTMLDivElement>(null);
  const getHeaderNotification = React.useCallback(async () => {
    const res = await dispatch(fetchThunk(API_PATHS.headerNotification, 'post'));

    setHeaderNotification(res.data);
  }, [setHeaderNotification, dispatch, fetchThunk]);
  useEffect(() => {
    getHeaderNotification();
  }, []);
  return (
    <div
      onMouseMove={() => {
        w1.current?.classList.add('header-notification-active');
      }}
      onMouseLeave={() => {
        w1.current?.classList.remove('header-notification-active');
      }}
      className="header-notification"
    >
      <i className="bx bxs-bell"></i>
      <div ref={w1} className="header-notification-list">
        <a className="header-notification-item" href="">
          <i className="bx bx-down-arrow-alt"></i>
          <p>Unapproved vendors</p>
          <p className="header-notification-item-number">{headerNotification.unapproved_vendors}</p>
        </a>
        <a className="header-notification-item" href="">
          <i className="bx bx-no-entry"></i>
          <p>Requests for payment</p>
          <p className="header-notification-item-number">{headerNotification.requests_for_payment}</p>
        </a>
        <a className="header-notification-item" href="">
          <i className="bx bx-envelope"></i>
          <p>Messages</p>
          <p className="header-notification-item-number">{headerNotification.messages}</p>
        </a>
      </div>
    </div>
  );
};

export default HeaderNotification;
