import React from 'react';
import './fallback-loading.scss';
import { Box, CircularProgress } from '@mui/material';
interface Props {}

const FallbackLoading = (props: Props) => {
  return (
    <div className="fallback-modal">
      <CircularProgress size={50} />
    </div>
  );
};

export default FallbackLoading;
