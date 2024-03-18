export const rows = [
  {
    id: 1,
    name: "John Doe 1",
    email: "JohnDoe@gmail.com",
    cpf: "123.456.789-00",
    phone: "(11)9998-8866",
    status: 1,
  },
  {
    id: 2,
    name: "Margaret",
    email: "margaret@gmail.com",
    cpf: "987.654.321-00",
    phone: "(11)9998-8866",
    status: 2,
  },
  {
    id: 3,
    name: "Jane Doe 3",
    email: "JaneDoe@gmail.com",
    cpf: "987.654.321-00",
    phone: "(11)9998-8866",
    status: 3,
  },
  {
    id: 4,
    name: "Kate 4",
    email: "kate@gmail.com",
    cpf: "987.654.321-00",
    phone: "(11)9998-8866",
    status: 4,
  },
  {
    id: 5,
    name: "John Doe",
    email: "JohnDoe@gmail.com",
    cpf: "123.456.789-00",
    phone: "(11)9998-8866",
    status: 1,
  },
  {
    id: 6,
    name: "Margaret 6",
    email: "margaret@gmail.com",
    cpf: "987.654.321-00",
    phone: "(11)9998-8866",
    status: 2,
  },
  {
    id: 7,
    name: "Jane Doe 7",
    email: "JaneDoe@gmail.com",
    cpf: "987.654.321-00",
    phone: "(11)9998-8866",
    status: 3,
  },
  {
    id: 8,
    name: "Kate",
    email: "kate@gmail.com",
    cpf: "987.654.321-00",
    phone: "(11)9998-8866",
    status: 4,
  },
  {
    id: 9,
    name: "Kate 9",
    email: "kate@gmail.com",
    cpf: "987.654.321-00",
    phone: "(11)9998-8866",
    status: 4,
  },
];

export const enumStatus = {
  Ativo: 1,
  Inativo: 2,
  "Aguardando ativação": 3,
  Desativado: 4,
  1: "Ativo",
  2: "Inativo",
  3: "Aguardando ativação",
  4: "Desativado",
};

export const statusCurrencies = [
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

export const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const regexPhone =  /^(?!([0-9])\1{3})\(?([1-9]{2})\)?[-. ]?9?[0-9]{4}[-. ]?[0-9]{4}$/;

export const colorStatus = {
  ativo: "#49AD5B",
  inativo: "#D73240",
  aguardandoAtivacao: "#D4A710",
  desativado: "#D2D2D2"
}