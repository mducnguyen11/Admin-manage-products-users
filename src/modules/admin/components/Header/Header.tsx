import React from 'react';
import HeaderNotification from './components/HeaderNotiFication/HeaderNotification';
import HeaderUser from './components/HeaderUser/HeaderUser';
import './header.scss';

interface Props {
  expandSidebar: Function;
}

const Header = (props: Props) => {
  return (
    <header className="header">
      <div className="header-sidebar-icon">
        <i
          onClick={() => {
            props.expandSidebar();
          }}
          className="bx bx-menu"
        ></i>
      </div>
      <div className="header-title">
        <p>Gear Focus Admin</p>
      </div>
      <HeaderNotification />
      <div className="header-space"></div>
      <HeaderUser />
    </header>
  );
};

export default Header;
