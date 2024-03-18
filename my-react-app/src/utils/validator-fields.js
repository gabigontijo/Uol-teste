import { validate } from "gerador-validador-cpf";

import { regexEmail, regexPhone } from "./constants";

export const validatorFields = (
  clientBody,
  setMessageAlert,
  setAlert,
  setFieldClass
) => {
  const { name, email, cpf, phone, status } = clientBody;
  const isErrorFields = {
    name: false,
    email: false,
    cpf: false,
    phone: false,
    status: false,
  };
  if (name.length < 4) {
    isErrorFields.name = true;
  }
  if (!regexEmail.test(email)) {
    isErrorFields.email = true;
  }
  if (!validate(cpf)) {
    isErrorFields.cpf = true;
  }
  if (!regexPhone.test(phone)) {
    isErrorFields.phone = true;
  }
  if (status === "") {
    isErrorFields.status = true;
  }
  setFieldClass(isErrorFields);
  if (Object.values(isErrorFields).some((v) => v)) {
    setAlert(true);
    setMessageAlert("Verifique campos inválidos");
    return false;
  }

  return true;
};
