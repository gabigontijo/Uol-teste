
import Box from "@mui/material/Box";
// import { makeStyles } from "@mui/styles";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { grey } from "../../theme/palette";

const rows = [
  {
    name: "John Doe",
    email: "JohnDoe@gmail.com",
    cpf: "123.456.789-00",
    phone: "(11)9998-8866",
    status: "Ativo",
  },
  {
    name: "Jane Doe",
    email: "JaneDoe@gmail.com",
    cpf: "987.654.321-00",
    phone: "(11)9998-8866",
    status: "Inativo",
  },
  {
    name: "Jane Doe",
    email: "JaneDoe@gmail.com",
    cpf: "987.654.321-00",
    phone: "(11)9998-8866",
    status: "Aguardando ativação",
  },
  {
    name: "Jane Doe",
    email: "JaneDoe@gmail.com",
    cpf: "987.654.321-00",
    phone: "(11)9998-8866",
    status: "Desativado",
  },
];

export default function CustomTable() {

  return (
    <div>
      {rows.map((row, index) => (
        <Stack display='flex' direction='row' alignItems='center' p={3} border={1} borderColor={grey[10]} key={index} mb={2.5}>
          <Box width="40%">
            <Typography variant="subtitle1">
              {row.name}
            </Typography>
            <Typography variant="body1">
              {row.email}
            </Typography>
          </Box>
          <Box width="35%">
            <Typography variant="subtitle1">
              {row.cpf}
            </Typography>
            <Typography variant="body1">
              {row.phone}
            </Typography>
          </Box>
          <Box width="35%">
            <Typography>{row.status}</Typography>
          </Box>
          <Box width="15%">
            <Button
            className='btn-edit'
              fullWidth
            //   className={classes.button}
            //   color={primary.light}
            >
              Editar
            </Button>
          </Box>
        </Stack>
      ))}
    </div>
  );
}
