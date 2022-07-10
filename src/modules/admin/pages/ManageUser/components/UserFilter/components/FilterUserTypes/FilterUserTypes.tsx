import { API_PATHS } from 'configs/api';
import CheckmarksGroup from 'modules/admin/components/CheckmarksGroup/CheckmarksGroup';
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

  const [usersType, setUserType] = useState<{ name: string; options: { id: string; name: string }[] }[]>([]);
  const getAllCommonRole = async () => {
    try {
      const res = await dispatch(fetchThunk(API_PATHS.getCommonRole));
      console.log(res.data);
      setUserType([
        {
          name: 'Memberships',
          options: res.data.administrator,
        },
        {
          name: 'Spending Membership',
          options: res.data.customer,
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
      name="types"
      options={usersType}
      value={props.value}
      onChange={props.onChange}
    />
  );
};

export default FilterUserTypes;
