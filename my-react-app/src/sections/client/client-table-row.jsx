import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { enumStatus } from './constants'
import { grey } from "../../theme/palette";

export default function ClientTable({
  rows,
  onSubmit,
}) {

  return (
    <div>
      {rows.map((row, index) => (
        <Stack display='flex' direction='row' alignItems='center' p={3} border={1} sx={{ borderColor: grey[500] }} key={index} mb={2.5}>
          <Box width="40%">
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              {row.name}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.common' }}>
              {row.email}
            </Typography>
          </Box>
          <Box width="35%">
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              {row.cpf}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.common' }}>
              {row.phone}
            </Typography>
          </Box>
          <Box width="35%">
            <Typography variant="body1" sx={{ color: 'text.common' }}>{enumStatus[row.status]}</Typography>
          </Box>
          <Box width="15%">
            <Button
              onClick={() => onSubmit(row)}
              color="primary"
              variant="outlined"
              className='btn-edit'
              fullWidth
            >
              Editar
            </Button>
          </Box>
        </Stack>
      ))}
    </div>
  );
}

ClientTable.propTypes = {
  onSubmit: PropTypes.func,
  rows: PropTypes.array,
};
