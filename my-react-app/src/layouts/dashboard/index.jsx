import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Main from './main';
import Header from './header';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  return (

    <>
    <Header/>
    <Box
      sx={{
        minHeight: 1,
        display: 'flex',
        flexDirection: { xs: 'column', lg: 'row' },
      }}
    >
      <Main>{children}</Main>
    </Box>
    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
