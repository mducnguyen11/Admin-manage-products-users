import { API_PATHS } from 'configs/api';
import { IFilterProductField } from 'models/product';
import SelectAsyncDebounce from 'modules/common/components/SelectAsyncDebounce/SelectAsyncDebounce';
import { fetchThunk } from 'modules/common/redux/thunk';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from 'redux/reducer';
import { Action } from 'typesafe-actions';

interface Props {
  value: string;
  onChange: (value: IFilterProductField) => void;
}

const FilterVendorForm = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [list, setList] = useState<{ companyName: string; id: string; login: string; name: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const getVendorList = async (a: string) => {
    if (a.length >= 2) {
      setLoading(true);
      const xx = await dispatch(fetchThunk(API_PATHS.getVendorsList, 'post', { search: a }));
      setLoading(false);
      if (xx.data && xx.success) {
        setList(xx.data);
      } else {
        setList([]);
      }
    } else {
      setList([]);
    }
  };

  useEffect(() => {
    const v = setTimeout(() => {
      getVendorList(props.value);
    }, 1000);
    return () => {
      clearTimeout(v);
    };
  }, [props.value]);
  return (
    <>
      <SelectAsyncDebounce
        loading={loading}
        options={[
          ...list.map((a) => ({
            value: a.id,
            name: a.name,
          })),
        ]}
        value={props.value}
        onChange={(value: string) => {
          props.onChange({
            vendor: value,
          });
        }}
      />
    </>
  );
};

export default FilterVendorForm;
