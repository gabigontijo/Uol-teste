import { useState } from "react";
import { useQuery } from "react-query";

// import TableBody from '@mui/material/TableBody';
import Box from "@mui/material/Box";
// import Card from '@mui/material/Card';
import Stack from "@mui/material/Stack";
// import Table from '@mui/material/Table';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { allClients } from "src/apis/client";

import ClientTable from "../client-table-row";
import FormNewClient from "../form-new-client";
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';

// import AlertNotifications from 'src/layouts/dashboard/common/alert-notifications';

// import Iconify from 'src/components/iconify';
// import Scrollbar from 'src/components/scrollbar';

import "../client.css";
import { clientInterface } from "./type";
import { grey } from "../../../theme/palette";
import user from "../../../assets/images/user.png";

// ----------------------------------------------------------------------

export default function ClientPage() {
  //   const [page, setPage] = useState(0);

  //   const [order, setOrder] = useState('asc');

  //   const [selected, setSelected] = useState([]);

  //   const [orderBy, setOrderBy] = useState('name');

  //   const [filterName, setFilterName] = useState('');

  //   const [rowsPerPage, setRowsPerPage] = useState(5);

  //   const [alert, setAlert] = useState(false);

  //   const [alertError, setAlertError] = useState(false);

  //   const [messageError, setMessageError] = useState('');

  //   const [messageAlert, setMessageAlert] = useState('');
  //   const [openDialog, setOpenDialog] = useState(false);

  const [renderForm, setRenderForm] = useState(false);
  const [clientId, setClientId] = useState(null);
  const [clientList, setClientList] = useState([]);
  const [client, setClient] = useState(clientInterface);
  const { isLoading, refetch: refetchClients } = useQuery(
    "allClients",
    allClients,
    {
      onSuccess: (response) => {
        setClientList(response.Clients);
      },
      onError: (error) => {
        console.error("Erro ao carregar clientes:", error);
      },
    }
  );

  //   const handleClick = (event, name, id) => {
  //     const selectedIndex = selected.findIndex((item) => item.name === name);

  //     let newSelected = [];

  //     if (selectedIndex === -1) {
  //       newSelected = [...selected, { name, id }];
  //     } else {
  //       newSelected = selected.filter((item) => item.name !== name);
  //     }

  //     setSelected(newSelected);
  //   };

  //   const handleChangePage = (event, newPage) => {
  //     setPage(newPage);
  //   };

  //   const handleChangeRowsPerPage = (event) => {
  //     setPage(0);
  //     setRowsPerPage(parseInt(event.target.value, 10));
  //   };

  //   const handleFilterByName = (event) => {
  //     setPage(0);
  //     setFilterName(event.target.value);
  //   };

  //   const handleAddUser = () => {
  //     setNewUser(true);
  //   };

  //   const handleCloseAdd = () => {
  //     setNewUser(false);
  //     setClientId(null);
  //     setStateClient(clientInterface);
  //   };

  //   const dataFiltered = applyFilter({
  //     inputData: clientList,
  //     comparator: getComparator(order, orderBy),
  //     filterName,
  //     field: 'name',
  //   });

  //   const notFound = !dataFiltered.length && !!filterName;

  const handleNewClient = () => {
    setRenderForm(true);
  };

  return (
    <Container>
      <Stack
        direction="row"
        sx={{ borderColor: grey[500] }}
        borderBottom={1.5}
        alignItems="center"
        pb={2}
      >
        <Box
          component="img"
          src={user}
          sx={{
            height: 40,
            mr: 2,
          }}
        />
        <Typography variant="h4" sx={{ color: "text.primary" }}>
          Painel de clientes
        </Typography>
      </Stack>

      {!renderForm ? (
        <>
          <Stack
            direction="row"
            alignContent="center"
            justifyContent="space-between"
            alignItems="center"
            pr={4}
            pl={4}
          >
            <Box mb={4} mt={4} width="90%">
              <Typography variant="subtitle1" sx={{ color: "text.secondary" }}>
                Listagem de usuários
              </Typography>
              <Typography variant="body1" sx={{ color: "text.common" }}>
                Escolha um cliente para visualizar os detalhes
              </Typography>
            </Box>

            <Box width="12%">
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={handleNewClient}
                className="btn-client"
              >
                Novo cliente
              </Button>
            </Box>
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            mb={3}
          >
            {isLoading && <CircularProgress />}
          </Stack>
          <ClientTable />
        </>
      ) : (
        <FormNewClient
          setRenderForm={setRenderForm}
          renderForm={renderForm}
          clientId={clientId}
          setClientId={setClientId}
          client={client}
          refetchClients={refetchClients}
          setClient={setClient}
        />
      )}
    </Container>
  );
}
