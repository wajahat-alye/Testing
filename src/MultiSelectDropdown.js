import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Chip from '@mui/material/Chip';

const MultiSelectDropdown = ({ value, onChange, options }: any) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="multi-select-label">Select</InputLabel>
      <Select
        labelId="multi-select-label"
        id="multi-select"
        multiple
        value={value}
        onChange={handleChange}
        renderValue={(selected) => (
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {selected.map((value) => (
              <Chip key={value} label={options.find(option => option.value === value)?.label || value} style={{ margin: 2 }} />
            ))}
          </div>
        )}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MultiSelectDropdown;
