import React, { useEffect, useState } from 'react';
import Sidebar from 'modules/admin/components/Sidebar/Sidebar';
import Header from 'modules/admin/components/Header/Header';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
import './admin-layout.scss';
interface Props {
  children: React.ReactNode;
}

const AdminLayout = (props: Props) => {
  const [expandSidebar, setExpandSidebar] = useState(true);
  const route = useSelector((state: AppState) => state.router.location);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route]);

  return (
    <div className="admin-layout">
      <div className="admin-layout-header">
        <Header
          expandSidebar={() => {
            setExpandSidebar(!expandSidebar);
          }}
        />
      </div>
      <div className="admin-layout-container">
        <div className="admin-layout-sidebar">
          <Sidebar
            expandSidebar={() => {
              setExpandSidebar(!expandSidebar);
            }}
            expand={expandSidebar}
          />
        </div>
        <div className="admin-layout-content">{props.children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
