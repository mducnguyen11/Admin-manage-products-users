import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import './sidebar-item.scss';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';
interface Props {
  name: string;
  listItem: { to: string; name: string }[];
  sidebarExpand: boolean;
  icon: React.ReactNode;
  onClick: Function;
}

const SidebarItem = (props: Props) => {
  const pathName = useSelector((state: AppState) => state.router.location.pathname);
  const [expandItem, setExpandItem] = useState(false);
  useEffect(() => {
    if (props.listItem.some((a) => a.to == pathName)) {
      setExpandItem(true);
    }
  }, [pathName, props.sidebarExpand]);

  return (
    <div
      onClick={() => {
        if (!props.sidebarExpand) {
          props.onClick();
        }
      }}
      className={`sidebar-item ${props.sidebarExpand ? `sidebar-expanded` : ``} ${
        props.listItem.some((a) => a.to.split('/')[2] == pathName.split('/')[2]) ? 'sidebar-item-active' : ''
      }`}
    >
      <Accordion
        expanded={expandItem}
        onChange={() => {
          setExpandItem(!expandItem);
        }}
        sx={{ marginBottom: '0px', backgroundColor: 'transparent', color: 'white' }}
      >
        <AccordionSummary
          expandIcon={
            props.sidebarExpand ? (
              <ExpandMoreIcon
                className={
                  props.listItem.some((a) => a.to.split('/')[2] == pathName.split('/')[2]) ? 'sidebar-item-active' : ''
                }
                sx={{ color: 'white' }}
              />
            ) : (
              <ArrowBackIosNewIcon sx={{ fontSize: '15px', marginLeft: '5px' }} />
            )
          }
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          {' '}
          <Typography sx={{ display: 'flex', alignItems: 'center' }}>
            {props.icon}
            {props.sidebarExpand ? <span style={{ marginLeft: '10px' }}>{props.name}</span> : null}
          </Typography>
        </AccordionSummary>
        {props.sidebarExpand ? (
          <>
            {props.listItem.map((a, i) => (
              <AccordionDetails key={i}>
                <Link to={a.to}>
                  <Typography
                    sx={{ marginLeft: '20px' }}
                    className={a.to.split('/')[2] == pathName.split('/')[2] ? 'sidebar-item-active' : ''}
                  >
                    {a.name}
                  </Typography>
                </Link>
              </AccordionDetails>
            ))}
          </>
        ) : null}
      </Accordion>
    </div>
  );
};

export default SidebarItem;
