import React, { useEffect, useState } from 'react';
import './memberships.scss';
interface Props {
  value: string[];
  onChange: Function;
  options: { name: string; options: { id: string; name: string; [key: string]: any }[] }[];
  name: string;
  placeholder: string;
}

const CheckmarksGroup = (props: Props) => {
  const [textValue, setTextValue] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let y = '';
    props.value.forEach((a, i) => {
      props.options.forEach((b) => {
        b.options.forEach((c) => {
          if (c.id == a) {
            if (i == 0) {
              y += c.name;
            } else {
              y += ', ' + c.name;
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
          <div className="checkmarks-group-list">
            {props.options.map((a, i) => {
              return (
                <div key={a.name}>
                  <div className="checkmarks-group-list-group-name">{a.name}</div>
                  {a.options.map((x, i) => {
                    return (
                      <div
                        key={x.id}
                        onClick={() => {
                          console.log('id : ', x.id);
                          const obj: { [key: string]: any } = {};
                          if (props.value.includes(x.id)) {
                            console.log('include ');
                            obj[props.name as keyof typeof obj] = [...props.value.filter((a) => a !== x.id)];
                          } else {
                            console.log('nooo include ');
                            obj[props.name as keyof typeof obj] = [...props.value, x.id];
                          }
                          props.onChange(obj);
                        }}
                        className="checkmarks-group-list-item"
                      >
                        {props.value.findIndex((v) => v == x.id) > -1 ? (
                          <i className="bx bxs-check-square"></i>
                        ) : (
                          <i className="bx bx-check-square"></i>
                        )}

                        <p>{x.name}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CheckmarksGroup;
