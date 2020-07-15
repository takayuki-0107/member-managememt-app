import React from 'react';
import Button from '@material-ui/core/Button';

const PrimaryButton = (props) => {
  return (
    <Button variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
