import React from 'react';
import './fallback-loading.scss';
import { Box, CircularProgress, LinearProgress } from '@mui/material';
interface Props {
  children?: React.ReactNode;
}

const FallbackLoading = (props: Props) => {
  return (
    <Box sx={{ width: '100%', marginTop: '20px' }}>
      <LinearProgress />
      {props.children}
    </Box>
  );
};

export default FallbackLoading;
