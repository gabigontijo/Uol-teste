import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import Typography from "@mui/material/Typography";
import FormControl from '@mui/material/FormControl';

import MaskFields from "../common/mask-field";
import { clientInterface } from './view/type';
import { statusCurrencies } from './constants'
import { createClient, updateClient } from '../../apis/client';

// ----------------------------------------------------------------------

export default function FormNewClient({
    setAlert,
    setAlertError,
    setMessageAlert,
    refetchClients,
    client,
    setClient,
    setRenderForm,
}) {

    const handleSubmit = async () => {
        try {
            await createClient(client);
            setAlert(true);
            setMessageAlert('Cliente cadastrado com sucesso');
            setRenderForm(false);
            setClient(clientInterface)
            refetchClients();
        } catch (error) {
            setAlertError(true);
            setMessageAlert('Erro ao Cadastrar o cliente');
            console.log('Erro ao Cadastrar o cliente:', error);
        }
    };

    const handleSubmitEdit = async () => {
        try {
            const nonEmptyState = Object.fromEntries(
                Object.entries(client).map(([key, value]) => [key, value || ''])
            );
            const bodyClientEdit = {
                name: nonEmptyState.name,
                email: nonEmptyState.email,
                cpf: nonEmptyState.cpf,
                phone: nonEmptyState.phone,
                status: +nonEmptyState.status,
            };
            await updateClient(bodyClientEdit, nonEmptyState.id);
            setAlert(true);
            setMessageAlert('Cliente editado com sucesso');
            setRenderForm(false);
            refetchClients();
        } catch (error) {
            setAlertError(true);
            setMessageAlert('Erro ao Editar o cliente');
            console.log('Erro ao Editar o cliente:', error);
        }
    };

    const handleBack = () => {
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
                    <Typography mt={4} variant="subtitle1" sx={{ color: 'text.secondary' }} >
                        {client === null ? 'Novo usário' : 'Editar usuário'}
                    </Typography>
                    <Typography mb={4} variant="body1" sx={{ color: 'text.common' }} >
                        {client === null ? 'Informe os campos a seguir para criar novo usuário' : 'Informe os campos a seguir para editar o usuário'}
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
                                <InputLabel id="demo-simple-select-label" sx={{ color: 'text.common' }}>Status</InputLabel>
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
                                        <MenuItem key={option.value} value={option.value} sx={{ color: 'text.common' }}>
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
                {client.id === undefined && (
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
                {client.id !== undefined && (
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
    setAlert: PropTypes.func,
    setAlertError: PropTypes.func,
    setMessageAlert: PropTypes.func,
    refetchClients: PropTypes.func,
    client: PropTypes.any,
    setClient: PropTypes.func,
    setRenderForm: PropTypes.func,
};
