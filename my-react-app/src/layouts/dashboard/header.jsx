
import Box from '@mui/material/Box';

import uolLogo from '../../assets/images/uol-logo.fw.png'


// ----------------------------------------------------------------------

export default function Header() {
 

  return (
    <Box bgcolor='#333333' width='100%' height='10%' display="flex" alignItems='center' justifyContent='center'>
        <img src={uolLogo} alt="uol logo" height={35} color='white' style={{ maxHeight: '100%' }}/>
    </Box>
    
  );
}

