import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Head from 'next/head';
import PlusIcon from '@untitled-ui/icons-react/build/esm/Plus';
import { Box, Button, Divider, Stack, SvgIcon, Typography } from '@mui/material';
import { applicationApi } from '../../api/applications/application.api';
import { useMounted } from '../../hooks/use-mounted';
import { usePageView } from '../../hooks/use-page-view';
import { Layout as DashboardLayout } from '../../layouts/dashboard';
import { ApplicationDrawer } from './application-drawer';
import { ApplicationListContainer } from './application-list-container';
import { ApplicationListSearch } from './application-list-search';
import { ApplicationListTable } from './application-list-table';

const useSearch = () => {
  const [search, setSearch] = useState({
    filters: {
      query: undefined,
      status: undefined,
    },
    page: 0,
    rowsPerPage: 10,
    sortBy: 'name',
    sortDir: 'desc',
  });

  return {
    search,
    updateSearch: setSearch,
  };
};

const useOrders = (search) => {
  const isMounted = useMounted();
  const [state, setState] = useState({
    applications: [],
    applicationCount: 0,
  });

  const getApplications = useCallback(async () => {
    try {
      const response = await applicationApi.getApplications(search);

      if (isMounted()) {
        setState({
          applications: response.applications.data,
          applicationCount: response.total,
        });
      }
    } catch (err) {
      console.error(err);
    }
  }, [search, isMounted]);

  useEffect(
    () => {
      getApplications();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [search]
  );

  return state;
};

const Page = () => {
  const rootRef = useRef(null);
  const { search, updateSearch } = useSearch();
  const { applications, applicationCount } = useOrders(search);
  const [drawer, setDrawer] = useState({
    isOpen: false,
    data: undefined,
  });
  const currentApplication = useMemo(() => {
    if (!drawer.data) {
      return undefined;
    }

    return applications.find((application) => application.uuid === drawer.data);
  }, [drawer, applications]);

  // usePageView();

  const handleFiltersChange = useCallback(
    (filters) => {
      updateSearch((prevState) => ({
        ...prevState,
        filters,
      }));
    },
    [updateSearch]
  );

  const handleSortChange = useCallback(
    (sortDir) => {
      updateSearch((prevState) => ({
        ...prevState,
        sortDir,
      }));
    },
    [updateSearch]
  );

  const handlePageChange = useCallback(
    (event, page) => {
      updateSearch((prevState) => ({
        ...prevState,
        page,
      }));
    },
    [updateSearch]
  );

  const handleRowsPerPageChange = useCallback(
    (event) => {
      updateSearch((prevState) => ({
        ...prevState,
        rowsPerPage: parseInt(event.target.value, 10),
        page: 0,
      }));
    },
    [updateSearch]
  );

  const handleOrderOpen = useCallback(
    (orderId) => {
      // Close drawer if is the same order

      if (drawer.isOpen && drawer.data === orderId) {
        setDrawer({
          isOpen: false,
          data: undefined,
        });
        return;
      }

      setDrawer({
        isOpen: true,
        data: orderId,
      });
    },
    [drawer]
  );

  const handleOrderClose = useCallback(() => {
    setDrawer({
      isOpen: false,
      data: undefined,
    });
  }, []);

  return (
    <>
      <Head>
        <title>Elenco applicazioni | KHAI ADMIN</title>
      </Head>
      <Divider />
      <Box
        component="main"
        ref={rootRef}
        sx={{
          display: 'flex',
          flex: '1 1 auto',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <Box
          ref={rootRef}
          sx={{
            bottom: 0,
            display: 'flex',
            left: 0,
            position: 'absolute',
            right: 0,
            top: 0,
          }}
        >
          <ApplicationListContainer open={drawer.isOpen}>
            <Box sx={{ p: 3 }}>
              <Stack alignItems="flex-start" direction="row" justifyContent="space-between" spacing={4}>
                <div>
                  <Typography variant="h4">Applicazioni</Typography>
                </div>
                <div>
                  <Button
                    startIcon={
                      <SvgIcon>
                        <PlusIcon />
                      </SvgIcon>
                    }
                    variant="contained"
                  >
                    Aggiungi
                  </Button>
                </div>
              </Stack>
            </Box>

            <Divider />
            <ApplicationListSearch
              onFiltersChange={handleFiltersChange}
              onSortChange={handleSortChange}
              sortBy={search.sortBy}
              sortDir={search.sortDir}
            />
            <Divider />
            <ApplicationListTable
              onOrderSelect={handleOrderOpen}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPageChange}
              applications={applications}
              applicationsCount={applicationCount}
              page={search.page}
              rowsPerPage={search.rowsPerPage}
            />
          </ApplicationListContainer>
          <ApplicationDrawer
            container={rootRef.current}
            onClose={handleOrderClose}
            open={drawer.isOpen}
            application={currentApplication}
          />
        </Box>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
