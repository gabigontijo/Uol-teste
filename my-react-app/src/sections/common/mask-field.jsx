import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import TextField from '@mui/material/TextField';

export default function MaskFields({ mask, name, label, type, value, handleChange }) {
  return (
    <InputMask
      mask={mask}
      value={value}
      onChange={(event) => handleChange({ target: { name, value: event.target.value } })}
    >
      {(inputProps) => (
        <TextField {...inputProps} name= {name} label={label} type={type} fullWidth  sx={{ color: 'text.common' }}/>
      )}
    </InputMask>
  );
}

MaskFields.propTypes = {
  mask: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  handleChange: PropTypes.func,
};
