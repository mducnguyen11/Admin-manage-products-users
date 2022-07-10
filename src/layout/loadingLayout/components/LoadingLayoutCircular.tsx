import { CircularProgress } from '@mui/material';
import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from 'redux/reducer';

interface Props {}

const LoadingLayoutCircular = () => {
  const isloading = useSelector((state: AppState) => state.loading.isLoading);

  return (
    <>
      {isloading ? (
        <div className="loading-modal">
          <CircularProgress size={50} />
        </div>
      ) : null}
    </>
  );
};

export default memo(LoadingLayoutCircular);
