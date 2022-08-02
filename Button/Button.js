import { Button } from '@mui/material';
import React from 'react';

function Submit(props) {
  const name = props.name;
  // const color = props.color;
  // const type = props.type;

  return (
    <Button sx={{ mt: 3, mb: 2 }} fullWidth variant="contained" >
      {name}
    </Button>
  
  );
}

export default Submit;
