import { Helmet } from 'react-helmet-async';

import { ClientView } from '../sections/client/view';

// ----------------------------------------------------------------------

export default function ClientPage() {
  return (
    <>
      <Helmet>
        <title> Clientes </title>
      </Helmet>
      <ClientView />
    </>
  );
}
