import React, { useEffect, useState } from 'react';
import './CheckmarksGroup.scss';
interface Props {
  value: string[];
  onChange: Function;
  options: { name: string; options: { value: string; name: string; [key: string]: any }[] }[];
  key_name: string;
  placeholder: string;
}

const CheckmarksGroup = (props: Props) => {
  const [textValue, setTextValue] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let y = '';
    props.value.forEach((a, i) => {
      props.options.forEach((optionGroup) => {
        optionGroup.options.forEach((item) => {
          if (item.value == a) {
            if (i == 0) {
              y += item.name;
            } else {
              y += ', ' + item.name;
            }
          }
        });
      });
    });
    if (y == '') {
      setTextValue(props.placeholder);
    } else {
      setTextValue(y);
    }
  }, [props.value]);

  return (
    <div className="checkmarks-group">
      <div
        onClick={() => {
          setOpen(!open);
        }}
        className="checkmarks-group-value"
      >
        <p className="checkmarks-group-value-text"> {textValue}</p>
        <i className={open ? 'bx bx-chevron-down open-list' : 'bx bx-chevron-down'}></i>
      </div>
      <div className="checkmarks-group-ops">
        {open ? (
          <>
            {' '}
            <div className="checkmarks-group-list-options">
              {props.options.map((itemGroup, i) => {
                return (
                  <div key={itemGroup.name}>
                    <div className="checkmarks-group-list-options-group-name">{itemGroup.name}</div>
                    {itemGroup.options.map((option, i) => {
                      return (
                        <div
                          key={option.id}
                          onClick={() => {
                            const obj: { [key: string]: any } = {};
                            if (props.value.includes(option.value)) {
                              obj[props.key_name as keyof typeof obj] = [
                                ...props.value.filter((a) => a !== option.value),
                              ];
                            } else {
                              obj[props.key_name as keyof typeof obj] = [...props.value, option.value];
                            }
                            props.onChange(obj);
                          }}
                          className="checkmarks-group-option"
                        >
                          {props.value.findIndex((v) => v == option.value) > -1 ? (
                            <i className="bx bxs-check-square"></i>
                          ) : (
                            <i className="bx bx-check-square"></i>
                          )}

                          <p>{option.name}</p>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <div
              onClick={() => {
                setOpen(false);
              }}
              className="checkmarks-group-background"
            ></div>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CheckmarksGroup;
