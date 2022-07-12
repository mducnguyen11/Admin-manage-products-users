import React, { useEffect, useState } from 'react';

interface Props {
  fieldName: string;
  value: string | React.ReactNode;
  options?: { id: string; name: string; [key: string]: any }[];
}

const UserRowItem = (props: Props) => {
  const [name, setName] = useState<string>('');
  const findValue = () => {
    props.options?.forEach((x) => {
      if (x.id == props.value) {
        setName(x.name);
      }
    });
  };
  useEffect(() => {
    if (props.options) {
      findValue();
    }
  }, [props.options]);

  return (
    <div className="user-detail-row-item">
      <p className="user-detail-row-name">{props.fieldName}</p>
      <p className="user-detail-row-value">{props.options ? <>{name} </> : <>{props.value}</>}</p>
    </div>
  );
};

export default UserRowItem;
