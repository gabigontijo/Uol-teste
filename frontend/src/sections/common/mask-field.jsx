import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

import TextField from '@mui/material/TextField';

export default function MaskFields({ mask, nameMask, label, type, value, handleChange, fieldClass }) {
  return (
    <InputMask
      mask={mask}
      value={value}
      onChange={(event) => handleChange({ target: { name: nameMask, value: event.target.value } })}
    >
      {(inputProps) => (
        <TextField {...inputProps} name= {nameMask} label={label} type={type} fullWidth  sx={{ color: 'text.common', backgroundColor: fieldClass[nameMask] && 'rgba(233, 151, 151, 0.3)' }}/>
      )}
    </InputMask>
  );
}

MaskFields.propTypes = {
  mask: PropTypes.string,
  nameMask: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
  fieldClass: PropTypes.any,
  handleChange: PropTypes.func,
};
