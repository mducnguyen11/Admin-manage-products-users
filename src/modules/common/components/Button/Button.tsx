import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: Function;
  color?: 'purple' | 'yellow';
  disabled?: boolean;
}

const Button = (props: Props) => {
  const getClassName = (): string => {
    let xx = 'cs-btn';
    if (props.className) {
      xx = xx + ' ' + props.className;
    }
    if (props.color) {
      xx = xx + ' ' + 'btn-' + props.color;
    } else {
      xx = xx + ' ' + 'btn-default';
    }
    if (props.disabled) {
      xx = xx + ' disabled-btn';
    }
    return xx;
  };
  return (
    <button
      onClick={() => {
        if (props.onClick && !props.disabled) {
          props.onClick();
        }
      }}
      className={getClassName()}
    >
      {props.children}
      {props.disabled ? <div className="disabled-btn-ground"></div> : null}
    </button>
  );
};

export default Button;
