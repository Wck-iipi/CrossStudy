import React from 'react';
import { FormControlLabel, Radio } from '@mui/material';

interface OptionProps {
  label: string;
  value: string;
}

const Option: React.FC<OptionProps> = ({ label, value }) => {
  return (
    <FormControlLabel 
      value={value} 
      control={<Radio color="primary" />} 
      label={label} 
    />
  );
};

export default Option;
