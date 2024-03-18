import { useState } from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";

import MaskFields from "../common/mask-field";
import { clientInterface } from "./view/type";
import { statusCurrencies } from "../../utils/constants";
import { createClient, updateClient } from "../../apis/client";
import { validatorFields } from "../../utils/validator-fields";


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

  const [fieldClass, setFieldClass] = useState({name: false, email: false, cpf: false, phone: false, status: false})

  const handleSubmit = async () => {
    try {
      if (!validatorFields(client, setMessageAlert, setAlertError, setFieldClass, setFieldClass)) {
        return
      }
      await createClient(client);
      setAlert(true);
      setMessageAlert("Cliente cadastrado com sucesso");
      setRenderForm(false);
      setClient(clientInterface);
      refetchClients();
    } catch (error) {
      const textError = await error.json();
      const errorMessage = textError.message.split(": ")[1];
      setAlertError(true);
      setMessageAlert(`${errorMessage}`);
    }
  };

  const handleSubmitEdit = async () => {
    try {
      const bodyClientEdit = {
        name: client.name,
        email: client.email,
        cpf: client.cpf,
        phone: client.phone,
        status: +client.status,
      };
      if (!validatorFields(bodyClientEdit, setMessageAlert, setAlertError, setFieldClass, setFieldClass)) {
        return
      }
      await updateClient(bodyClientEdit, client.id);
      setAlert(true);
      setMessageAlert("Cliente editado com sucesso");
      setRenderForm(false);
      refetchClients();
    } catch (error) {
      const textError = await error.json();
      const errorMessage = textError.message.split(":")[1];
      setAlertError(true);
      setMessageAlert(`${errorMessage}`);
    }
  };

  const handleBack = () => {
    setClient(clientInterface);
    setRenderForm(false);
  };

  const handleClientChange = (event) => {
    const { name, value } = event.target;
    setClient({
      ...client,
      [name]: value,
    });
    setFieldClass({
      ...fieldClass,
      [name]: false,
    })
  };

  return (
    <>
      <Stack spacing={{ xs: 1, sm: 2 }}>
        <Box width="100%">
          <Typography
            mt={4}
            variant="subtitle1"
            sx={{ color: "text.secondary" }}
          >
            {client.id === undefined ? "Novo usário" : "Editar usuário"}
          </Typography>
          <Typography mb={4} variant="body1" sx={{ color: "text.common" }}>
            {client.id === undefined
              ? "Informe os campos a seguir para criar novo usuário"
              : "Informe os campos a seguir para editar o usuário"}
          </Typography>
        </Box>
        <Stack direction="column" spacing={{ xs: 1, sm: 2 }} width="40%">
          <Box width="100%">
            <TextField
              name="name"
              label="Nome"
              type="text"
              sx={{ color: "text.common", backgroundColor: fieldClass.name && 'rgba(233, 151, 151, 0.3)' }}
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
              sx={{ color: "text.common", backgroundColor: fieldClass.email && 'rgba(233, 151, 151, 0.3)' }}
              value={client.email}
              onChange={handleClientChange}
              fullWidth
            />
          </Box>
          <Box width="100%">
            <MaskFields
              mask="999.999.999-99"
              nameMask="cpf"
              label="CPF"
              type="text"
              value={client.cpf}
              fieldClass={fieldClass}
              handleChange={handleClientChange}
            />
          </Box>
          <Box width="100%">
            <MaskFields
              mask="(99) 99999-9999"
              nameMask="phone"
              label="Telefone"
              type="text"
              value={client.phone}
              fieldClass={fieldClass}
              handleChange={handleClientChange}
            />
          </Box>
          <Box component="form" noValidate autoComplete="off">
            <div>
              <FormControl fullWidth >
                <InputLabel
                  id="demo-simple-select-label"
                  sx={{ color: "text.common"}}
                >
                  Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={client.status}
                  label="Status"
                  name="status"
                  sx={{backgroundColor: fieldClass.status && 'rgba(233, 151, 151, 0.3)' }}
                  onChange={handleClientChange}
                >
                  {statusCurrencies.map((option) => (
                    <MenuItem
                      key={option.value}
                      value={option.value}
                      sx={{ color: "text.common" }}
                    >
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
            className="btn-client"
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
            className="btn-client"
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
          className="btn-back"
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
