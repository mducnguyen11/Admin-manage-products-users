import { API_PATHS } from 'configs/api';
import CheckmarksGroup from 'modules/common/components/CheckmarksGroup/CheckmarksGroup';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';

interface Props {
  value: string[];
  onChange: Function;
}

const FilterUserTypes = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [usersType, setUserType] = useState<{ name: string; options: { value: string; name: string }[] }[]>([]);
  const getAllCommonRole = async () => {
    try {
      const res = await dispatch(fetchThunk(API_PATHS.getCommonRole));
      setUserType([
        {
          name: 'Memberships',
          options: res.data.administrator.map((c: { id: string; name: string; [key: string]: any }) => ({
            value: c.id,
            name: c.name,
          })),
        },
        {
          name: 'Spending Membership',
          options: res.data.customer.map((c: { id: string; name: string; [key: string]: any }) => ({
            value: c.id,
            name: c.name,
          })),
        },
      ]);
    } catch (error) {
      console.log('errr');
    }
  };

  useEffect(() => {
    getAllCommonRole();
  }, []);

  return (
    <CheckmarksGroup
      placeholder="All usertypes"
      key_name="types"
      options={usersType}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default FilterUserTypes;
