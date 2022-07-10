import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Box } from '@mui/material';
interface Props {}

const FallbackLoading = (props: Props) => {
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgress />
    </Box>
  );
};

export default FallbackLoading;
