import Head from 'next/head';
import { Box, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from '../../layouts/dashboard';
import { ApplicationCreateForm } from './create-form/application-create-form';

const Page = () => {
  return (
    <>
      <Head>
        <title>Crea applicazione | KHAI ADMIN</title>
      </Head>
      <Box
        component="main"
        sx={{
          display: 'flex',
          flexGrow: 1,
        }}
      >
        <Grid container sx={{ flexGrow: 1 }}>
          <Grid
            xs={12}
            sm={4}
            sx={{
              backgroundImage: 'url(/assets/people-talking.png)',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              display: {
                xs: 'none',
                md: 'block',
              },
            }}
          />
          <Grid
            xs={12}
            md={8}
            sx={{
              p: {
                xs: 4,
                sm: 6,
                md: 8,
              },
            }}
          >
            <Stack maxWidth="sm" spacing={3}>
              <Typography variant="h4">Nuonva applicazione</Typography>
              <ApplicationCreateForm />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
