import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function NotFoundView() {

  return (
    <>

      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 480,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Typography variant="h3" sx={{ mb: 3 }}>
            Desculpa, página não encontrada!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Lamentamos, mas não conseguimos encontrar a página que procura. Talvez você tenha digitado incorretamente o URL? Ser
            certifique-se de verificar sua ortografia.
          </Typography>

          <Box
            component="img"
            src="/assets/illustration_404.svg"
            sx={{
              mx: 'auto',
              height: 260,
              my: { xs: 5, sm: 10 },
            }}
          />

          <Button href="/" size="large" variant="contained" component={RouterLink}>
            Voltar ao início
          </Button>
        </Box>
      </Container>
    </>
  );
}
