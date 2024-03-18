import { apiFetch } from '..';

const URlClients = 'http://localhost:8080/clients';

export const createClient = async (client) => {
  const apiOpts = {
    method: 'post',
    body: JSON.stringify(client),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = await apiFetch(URlClients, apiOpts);
  return res.json();
};

export const allClients = async () => {
  const response = await fetch(URlClients);
  const result = await response.json();
  return result;
};

export const clientById = async (clientId) => {
  const ENDPOINT = `${URlClients}/${clientId}`;
  const response = await fetch(ENDPOINT);
  const result = await response.json();
  return result;
};

export const updateClient = async (client, clientId) => {
  const apiOpts = {
    method: 'put',
    body: JSON.stringify(client),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const res = await apiFetch(`${URlClients}/${clientId}`, apiOpts);
  return res.json();
};
