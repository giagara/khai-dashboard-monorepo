import Head from 'next/head';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Box, Button, Container, Stack, SvgIcon, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { usePageView } from '../../hooks/use-page-view';
import { useSettings } from '../../hooks/use-settings';
import { Layout as DashboardLayout } from '../../layouts/dashboard';
import { AnalyticsStats } from '../../sections/dashboard/analytics/analytics-stats';
import { ApplicationsList } from '../../sections/dashboard/analytics/analytics-most-visited';
import { AnalyticsSocialSources } from '../../sections/dashboard/analytics/analytics-social-sources';
import { AnalyticsTrafficSources } from '../../sections/dashboard/analytics/analytics-traffic-sources';
import { AnalyticsVisitsByCountry } from '../../sections/dashboard/analytics/analytics-visits-by-country';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { useEffect, useState } from 'react';
import { dashboardapi } from '../../api/dashboard/dashboard.api';
import { AnalyticsStatsLoading } from '../../sections/dashboard/analytics/analytics-stats-loading';

const Page = () => {
  const settings = useSettings();

  usePageView();

  const [loadingApplication, setLoadingApplication] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    const getApplications = async () => {
      const applications = await dashboardapi.applications();
      setApplications(applications);
      setLoadingApplication(false);
    };

    const getStats = async () => {
      const stats = await dashboardapi.stats();
      setStats(stats);
      setLoadingStats(false);
    };

    getApplications();
    getStats();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | KHAI Admin</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            spacing={{
              xs: 3,
              lg: 4,
            }}
          >
            <Grid xs={12}>
              <Stack direction="row" justifyContent="space-between" spacing={4}>
                <Stack spacing={1}>
                  <Typography variant="h4">Dashboard</Typography>
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} md={4}>
              {loadingStats ? (
                <AnalyticsStatsLoading />
              ) : (
                <AnalyticsStats
                  chartSeries={[
                    {
                      data: stats.users,
                    },
                  ]}
                  title="Utenti"
                  value={stats.users_count}
                />
              )}
            </Grid>
            <Grid xs={12} md={4}>
              {loadingStats ? (
                <AnalyticsStatsLoading />
              ) : (
                <AnalyticsStats
                  chartSeries={[
                    {
                      data: stats.interventi,
                    },
                  ]}
                  title="Interventi"
                  value={stats.interventi_count}
                />
              )}
            </Grid>
            <Grid xs={12} md={4}>
              {loadingStats ? (
                <AnalyticsStatsLoading />
              ) : (
                <AnalyticsStats
                  chartSeries={[
                    {
                      data: stats.attachments,
                    },
                  ]}
                  title="Allegati"
                  value={stats.attachments_count}
                />
              )}
            </Grid>

            <Grid xs={12} lg={8}>
              {loadingApplication ? <></> : <ApplicationsList applications={applications} />}
            </Grid>
            <Grid xs={12} lg={4}>
              <AnalyticsSocialSources chartSeries={[10, 10, 20]} labels={['Linkedin', 'Facebook', 'Instagram']} />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
