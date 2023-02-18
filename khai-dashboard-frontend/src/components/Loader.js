import React from 'react';

import { CircularProgress } from '@mui/material';

function Loader(props) {
  return (
    <div {...props} style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', minHeight: '100%' }}>
      <CircularProgress color="secondary" />
    </div>
  );
}

export default Loader;
