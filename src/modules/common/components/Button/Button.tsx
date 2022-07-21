import React from 'react';

interface Props {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  color?: 'purple' | 'yellow';
  disabled?: boolean;
}

const Button = (props: Props) => {
  const getClassName = (): string => {
    let className = 'cs-btn';
    if (props.className) {
      className = className + ' ' + props.className;
    }
    if (props.color) {
      className = className + ' ' + 'btn-' + props.color;
    } else {
      className = className + ' ' + 'btn-default';
    }
    if (props.disabled) {
      className = className + ' disabled-btn';
    }
    return className;
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
