import { useState } from "react";
// import { useQuery } from "react-query";

// import TableBody from '@mui/material/TableBody';
import Box from "@mui/material/Box";
// import Card from '@mui/material/Card';
import Stack from "@mui/material/Stack";
// import Table from '@mui/material/Table';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";

import "../client.css";
import ClientTable from "../client-table-row";
import FormNewClient from "../form-new-client";
// import TableContainer from '@mui/material/TableContainer';
// import TablePagination from '@mui/material/TablePagination';
// import CircularProgress from '@mui/material/CircularProgress';

// import { allClients, deleteClient } from 'src/apis/client';
// import AlertNotifications from 'src/layouts/dashboard/common/alert-notifications';

// import Iconify from 'src/components/iconify';
// import Scrollbar from 'src/components/scrollbar';

// import { clientInterface } from './type';
// import FormNewClient from '../form-new-client';
// import ClientTableRow from '../client-table-row';
// import TableNoData from '../../common/table-no-data';
// import ComoonTableHead from '../../common/table-head';
// import TableToolbar from '../../common/table-toolbar';
// import TableEmptyRows from '../../common/table-empty-rows';
// import { emptyRows, applyFilter, getComparator } from '../../utils';

// ----------------------------------------------------------------------

export default function ClientPage() {
  //   const [page, setPage] = useState(0);

  //   const [order, setOrder] = useState('asc');

  //   const [selected, setSelected] = useState([]);

  //   const [orderBy, setOrderBy] = useState('name');

  //   const [filterName, setFilterName] = useState('');

  //   const [rowsPerPage, setRowsPerPage] = useState(5);

  // const [newClient, setNewClient] = useState(false);
  const [renderForm, setRenderForm] = useState(false);

  //   const [alert, setAlert] = useState(false);

  //   const [alertError, setAlertError] = useState(false);

  //   const [messageError, setMessageError] = useState('');

  //   const [messageAlert, setMessageAlert] = useState('');

    const [clientId, setClientId] = useState(null);

  //   const [openDialog, setOpenDialog] = useState(false);

  //   const [clientList, setClientList] = useState([]);

  //   const [stateClient, setStateClient] = useState( clientInterface);

  //   const {isLoading, refetch: refetchClients} = useQuery("allClients", allClients, {
  //     onSuccess: (response) => {
  //       setClientList(response.Clients);
  //     },
  //     onError: (error) => {
  //       console.error('Erro ao carregar clientes:', error);
  //     }
  //   });

  //   const handleSort = (event, id) => {
  //     const isAsc = orderBy === id && order === 'asc';
  //     if (id !== '') {
  //       setOrder(isAsc ? 'desc' : 'asc');
  //       setOrderBy(id);
  //     }
  //   };

  //   const handleSelectAllClick = (event) => {
  //     if (event.target.checked) {
  //       const newSelecteds = clientList.map((n) => ({
  //         name: n.name,
  //         id: n.id,
  //       }));
  //       setSelected(newSelecteds);
  //       return;
  //     }
  //     setSelected([]);
  //   };

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

  //   const handleDelete = async () => {
  //     try {
  //       const results = await Promise.all(
  //         selected.map(async (client) => {
  //           const result = await deleteClient(client.id);
  //           return result;
  //         })
  //       );
  //       console.log(results);
  //       setAlert(true);
  //       setMessageAlert('Cliente deletado com sucesso');
  //       setOpenDialog(false);
  //       setSelected([]);
  //       refetchClients();
  //     } catch (error) {
  //       console.error('Erro ao excluir clientes:', error);
  //       setAlertError(true);
  //       setMessageError('Erro ao excluir clientes');
  //       setOpenDialog(false);
  //       setSelected([]);
  //     }
  //   };

  //   const notFound = !dataFiltered.length && !!filterName;

  const handleNewClient = () => {
    setRenderForm(true);
  };

  return (
    <Container>
      <Typography borderColor="#F1F1F1" borderBottom={1} pb={2} variant="h4">
        Painel de clientes
      </Typography>
      {!renderForm ? (
        <>
          <Stack
            direction="row"
            alignContent="center"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box mb={4} mt={4}>
              <Typography variant="subtitle1">Listagem de usuários</Typography>
              <Typography variant="body1">
                Escolha um cliente para visualizar os detalhes
              </Typography>
            </Box>
            <Box>
              <Button fullWidth onClick={handleNewClient}>
                Novo cliente
              </Button>
            </Box>
          </Stack>
          <ClientTable />
        </>
      ) : (
        <FormNewClient
        setRenderForm={setRenderForm}
        renderForm={renderForm}
        clientId={clientId}
        setClientId={setClientId}
         />
      )}
    </Container>
  );
}
