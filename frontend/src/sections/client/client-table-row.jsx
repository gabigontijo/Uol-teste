import PropTypes from "prop-types";
import { Icon } from '@iconify/react';

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { grey } from "../../theme/palette";
import { enumStatus, colorStatus } from '../../utils/constants'

export default function ClientTable({
  rows,
  onSubmit,
}) {

  const statusColor = (status) => {
    switch (status) {
      case "Ativo":
        return colorStatus.ativo;
      case "Inativo" :
        return colorStatus.inativo;
      case "Aguardando ativação":
        return colorStatus.aguardandoAtivacao;
      case "Desativado":
        return colorStatus.desativado;
      default:
        return 'white'; 
    }
  }

  return (
    <div>
      {rows.map((row, index) => (
        <Stack display='flex' direction={{xs:'column', md: 'row'}} spacing={{xs: 2}} alignItems={{xs:'initial', md: 'center'}} p={3} border={1} sx={{ borderColor: grey[500] }} key={index} mb={2.5}>
          <Box width={{xs:'100%', md: '40%'}}>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              {row.name}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.common' }}>
              {row.email}
            </Typography>
          </Box>
          <Box width={{xs:'100%', md: '35%'}}>
            <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
              {row.cpf}
            </Typography>
            <Typography variant="body1" sx={{ color: 'text.common' }}>
              {row.phone}
            </Typography>
          </Box>
          <Box  width={{xs:'100%', md: '35%'}} display='flex' direction='column' alignItems='center'>
          <Icon icon="tabler:circle-filled" color={statusColor(enumStatus[row.status])} />
          <Typography variant="body1" ml={1} sx={{ color: 'text.common' }}>
             {enumStatus[row.status]}</Typography>
          </Box>

          <Box width={{xs:'100%', md: '15%'}}>
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
