import { useQuery } from "react-query";
import { useState, useEffect } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
// import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { allClients } from "src/apis/client";

import ClientTable from "../client-table-row";
import FormNewClient from "../form-new-client";
// import TablePagination from '@mui/material/TablePagination';

// import AlertNotifications from 'src/layouts/dashboard/common/alert-notifications';

// import Iconify from 'src/components/iconify';
// import Scrollbar from 'src/components/scrollbar';

import "../client.css";
import { clientInterface } from "./type";
import { list } from '../../common/pagination'
import { grey } from "../../../theme/palette";
import PaginationComponent from "../pagination";
import user from "../../../assets/images/user.png";
import AlertNotifications from "../../common/alert-notification";

// ----------------------------------------------------------------------

export default function ClientPage() {
  //   const [page, setPage] = useState(0);

  //   const [order, setOrder] = useState('asc');

  //   const [selected, setSelected] = useState([]);

  //   const [orderBy, setOrderBy] = useState('name');

  //   const [filterName, setFilterName] = useState('');

  //   const [rowsPerPage, setRowsPerPage] = useState(5);

  const [alert, setAlert] = useState(false);
  const [alertError, setAlertError] = useState(false);
  const [messageAlert, setMessageAlert] = useState('');
  const [renderForm, setRenderForm] = useState(false);
  const [itemPerPage, setItemPerPage] = useState(5);
  const [clientListPaginated, setClientListPaginated] = useState(list([], 1, itemPerPage));
  const [clientList, setClientList] = useState([]);
  const [client, setClient] = useState(clientInterface);
  const { isLoading, refetch: refetchClients } = useQuery(
    "allClients",
    allClients,
    {
      onSuccess: (response) => {
        setClientList(response.Clients);
        setClientListPaginated(list(response.Clients, 1, itemPerPage))
      },
      onError: (error) => {
        console.error("Erro ao carregar clientes:", error);
      },
    }
  );

  const handleClick = (c) => {
    setClient(c)
    setRenderForm(true)
  }

  const handleNewClient = () => {
    setClient(clientInterface)
    setRenderForm(true);
  };

  useEffect(() => {
    setClientListPaginated(list(clientList, 1, itemPerPage))
  }, [itemPerPage, clientList])

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
          <ClientTable rows={clientListPaginated} onSubmit={(c) => handleClick(c)} />
          <PaginationComponent
            currentPage={1}
            setClientList={setClientListPaginated}
            totalClients={clientList}
            itemPerPage={itemPerPage}
            setItemPerPage={setItemPerPage}
          />
        </>
      ) : (
        <FormNewClient
          setRenderForm={setRenderForm}
          renderForm={renderForm}
          client={client}
          refetchClients={refetchClients}
          setClient={setClient}
          setAlert={setAlert}
          setAlertError={setAlertError}
          setMessageAlert={setMessageAlert}
        />
      )}
      <AlertNotifications
        alert={alert}
        setAlert={setAlert}
        alertError={alertError}
        setAlertError={setAlertError}
        message={messageAlert}
      />
    </Container>
  );
}
