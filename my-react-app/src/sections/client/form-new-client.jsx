import { useState } from 'react';
import PropTypes from "prop-types";
// import { useQuery } from "react-query";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
// import Autocomplete from '@mui/material/Autocomplete';

// import { createClient, updateClient } from 'src/apis/client';

import Typography from "@mui/material/Typography";

import MaskFields from "./mask-field";
import { clientInterface } from './view/type';
// import { clientInterface } from './view/type';
// import SelectPixFields from '../common/input-select-pix';
// import InputFileUpload from '../common/input-upload-file';

// ----------------------------------------------------------------------

const statusCurrencies = [
    {
        value: 1,
        label: "Ativo",
    },
    {
        value: 2,
        label: "Inativo",
    },
    {
        value: 3,
        label: "Aguardando ativação",
    },
    {
        value: 4,
        label: "Desativado",
    },
];

export default function FormNewClient({
    setNewClient,
    setAlert,
    setAlertError,
    setNextStep,
    setMessageError,
    setMessageAlert,
    clientId,
    setClientId,
    refetchClients,
    // stateClient: client,
    setStateClient,
    setRenderForm,
}) {

    const [client, setClient] = useState(clientInterface);

      const handleSubmit = async () => {
        try {
          const bodyClient = {
            name: client.name,
            email: client.email,
            phone: client.phone,
            cpf: client.cpf,
            status: client.status,
          };
        //   await createClient(bodyClient);
        //   setAlert(true);
        //   setMessageAlert('Cliente cadastrado com sucesso');
        //   setNewUser(false);
        //   setClient(clientInterface)
        //   refetchClients();
        console.log('bodyClient', bodyClient)
        console.log('state client', client)
        } catch (error) {
        //   // eslint-disable-next-line no-debugger
        //   debugger;
        //   setAlertError(true);
        //   setMessageError('Erro ao Cadastrar o cliente');
          console.log('Erro ao Cadastrar o cliente:', error);
        }
      };

      const handleSubmitEdit = async () => {
        // try {
        //   // eslint-disable-next-line no-debugger
        //   debugger;
        //   const nonEmptyState = Object.fromEntries(
        //     Object.entries(client).map(([key, value]) => [key, value || ''])
        //   );
        //   const bodyClientEdit = {
        //     name: nonEmptyState.name,
        //     pixType: nonEmptyState.pixType,
        //     pixKey: nonEmptyState.pixKey,
        //     partnerId: Number(nonEmptyState.partner.id),
        //     phone: nonEmptyState.phone,
        //     cpf: nonEmptyState.cpf,
        //     documents: '',
        //   };
        //   const response = await updateClient(bodyClientEdit, clientId);
        //   console.log('Resposta da API:', response);
        //   setNewUser(false);
        //   setClientId(null);
        //   setAlert(true);
        //   setMessageAlert('Cliente editado com sucesso');
        //   setStateClient(clientInterface)
        //   refetchClients();
        // } catch (error) {
        //   setAlertError(true);
        //   setMessageError('Erro ao Editar o cliente');
        //   setNewUser(true);
        //   console.log('Erro ao Editar o cliente:', error);
        // }
      };

    const handleBack = () => {
        setClientId(null);
        setClient(clientInterface);
        setRenderForm(false);
    }

    const handleClientChange = (event) => {
        const { name, value } = event.target;
        setClient({
          ...client,
          [name]: value,
        });
      };

    return (
        <>
            <Stack spacing={{ xs: 1, sm: 2 }}>
                <Box width="100%">
                    <Typography mt={4} variant="subtitle1"  sx={{ color: 'text.secondary' }} >
                       {clientId === null  ? 'Novo usário' : 'Editar usuário'} 
                    </Typography>
                    <Typography mb={4} variant="body1"  sx={{ color: 'text.common' }} >
                    {clientId === null  ? 'Informe os campos a seguir para criar novo usuário' : 'Informe os campos a seguir para editar o usuário'} 
                    </Typography>
                </Box>
                <Stack direction="column" spacing={{ xs: 1, sm: 2 }} width="40%">
                    <Box width="100%">
                        <TextField
                            name="name"
                            label="Nome"
                            type="text"
                            sx={{ color: 'text.common' }}
                              value={client.name}
                              onChange={handleClientChange}
                            fullWidth
                        />
                    </Box>
                    <Box width="100%">
                        <TextField
                            name="email"
                            label="E-mail"
                            type="text"
                            sx={{ color: 'text.common' }}
                              value={client.email}
                              onChange={handleClientChange}
                            fullWidth
                        />
                    </Box>
                    <Box width="100%">
                        <MaskFields
                            mask="999.999.999-99"
                            name="cpf"
                            label="CPF"
                            type="text"
                          value={client.cpf}
                          handleChange={handleClientChange}
                        />
                    </Box>
                    <Box width="100%">
                        <MaskFields
                            mask="(99) 99999-9999"
                            name="phone"
                            label="Telefone"
                            type="text"
                          value={client.phone}
                          handleChange={handleClientChange}
                        />
                    </Box>
                    <Box component="form" noValidate autoComplete="off">
                        <div>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label"  sx={{ color: 'text.common' }}>Status</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={client.status}
                                    label="Status"
                                    name='status'
                                    sx={{ color: 'text.common' }}
                                    onChange={handleClientChange}
                                >
                                    {statusCurrencies.map((option) => (
                                    <MenuItem key={option.value} value={option.value}  sx={{ color: 'text.common' }}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </div>
                    </Box>
                </Stack>
            </Stack>
            <Stack
                direction="row"
                alignItems=""
                justifyContent="space-between"
                mt={10}
                width="40%"
            >
                {clientId === null && ( 
                <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    className='btn-client'
                    onClick={handleSubmit}
                    sx={{ width: "45%" }}
                >
                    Criar
                </Button>
                )}
                {clientId !== null && ( 
                <Button
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                    className='btn-client'
                   onClick={handleSubmitEdit}
                    sx={{ width: "45%" }}
                >
                    Editar
                </Button>
                )}
                <Button
                    size="large"
                    type="submit"
                    variant="outlined"
                    color="primary"
                    className='btn-back'
                    sx={{ width: "45%" }}
                    onClick={handleBack}
                >
                    Voltar
                </Button>
            </Stack>
        </>
    );
}

FormNewClient.propTypes = {
    setNewClient: PropTypes.func,
    setAlert: PropTypes.func,
    setAlertError: PropTypes.func,
    setNextStep: PropTypes.func,
    setMessageError: PropTypes.func,
    setMessageAlert: PropTypes.func,
    setClientId: PropTypes.func,
    clientId: PropTypes.any,
    refetchClients: PropTypes.func,
    // stateClient: PropTypes.any,
    setStateClient: PropTypes.func,
    setRenderForm: PropTypes.func,
};
