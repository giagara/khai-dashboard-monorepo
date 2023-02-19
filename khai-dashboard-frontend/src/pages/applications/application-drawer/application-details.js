import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import Edit02Icon from '@untitled-ui/icons-react/build/esm/Edit02';
import {
  Button,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { PropertyList } from '../../../components/property-list';
import { PropertyListItem } from '../../../components/property-list-item';
import { SeverityPill } from '../../../components/severity-pill';
import { Scrollbar } from '../../../components/scrollbar';
import { useMounted } from '../../../hooks/use-mounted';
import { useCallback, useEffect, useState } from 'react';
import { applicationApi } from '../../../api/applications/application.api';
import Loader from '../../../components/Loader';

const statusMap = {
  canceled: 'warning',
  1: 'success',
  pending: 'info',
  0: 'error',
};

const typeMap = {
  lite: 'warning',
  premium: 'success',
  standard: 'info',
};

const useApplication = (application) => {
  const isMounted = useMounted();
  const [users, setUSers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getApplicationUsers = useCallback(async () => {
    try {
      const response = await applicationApi.getApplicationUsers(application);

      if (isMounted()) {
        setUSers(response);
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted, application]);

  useEffect(
    () => {
      setLoading(true);
      getApplicationUsers();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [application]
  );

  return [users, loading];
};

export const ApplicationDetails = (props) => {
  const { onApprove, onEdit, onReject, application } = props;

  const [users, usersLoading] = useApplication(application);
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

  const align = lgUp ? 'horizontal' : 'vertical';
  const items = application.items || [];
  //const createdAt = format(application.createdAt, 'dd/MM/yyyy HH:mm');
  const statusColor = statusMap[application.active];
  const typeColor = typeMap[application.tipo];

  //const totalAmount = numeral(application.totalAmount).format(`${application.currency}0,0.00`);

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={3}>
          <Typography variant="h6">Details</Typography>
          <Button
            color="inherit"
            onClick={onEdit}
            size="small"
            startIcon={
              <SvgIcon>
                <Edit02Icon />
              </SvgIcon>
            }
          >
            Edit
          </Button>
        </Stack>
        <PropertyList>
          <PropertyListItem align={align} disableGutters divider label="Nome" value={application.name} />
          <PropertyListItem align={align} disableGutters divider label="UUID" value={application.uuid} />
          <PropertyListItem align={align} disableGutters divider label="Tipo">
            <Typography color="text.secondary" variant="body2">
              <SeverityPill color={typeColor}>{application.tipo}</SeverityPill>
            </Typography>
          </PropertyListItem>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="Utenti totali"
            value={application.users_count}
          />
          <PropertyListItem align={align} disableGutters divider label="Status">
            <SeverityPill color={statusColor}>{application.active ? 'ATTIVA' : 'DISATTIVA'}</SeverityPill>
          </PropertyListItem>
        </PropertyList>
        {/* <Stack alignItems="center"
direction="row"
flexWrap="wrap"
justifyContent="flex-end"
spacing={2}>
          <Button onClick={onApprove}
size="small"
variant="contained">
            Approve
          </Button>
          <Button color="error"
onClick={onReject}
size="small"
variant="outlined">
            Reject
          </Button>
        </Stack>*/}
      </Stack>

      {usersLoading && <Loader />}
      {!usersLoading && (
        <Stack spacing={3}>
          <Typography variant="h6">Utenti associati</Typography>
          <Scrollbar>
            <Table sx={{ minWidth: 400 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Attivo</TableCell>
                  <TableCell>Tipo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => {
                  return (
                    <TableRow key={user.id_user}>
                      <TableCell>
                        {user.firstname} {user.lastname}
                      </TableCell>
                      <TableCell>{user.active}</TableCell>
                      <TableCell>{user.type}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Scrollbar>
        </Stack>
      )}
    </Stack>
  );
};

ApplicationDetails.propTypes = {
  onApprove: PropTypes.func,
  onEdit: PropTypes.func,
  onReject: PropTypes.func,
  // @ts-ignore
  application: PropTypes.object,
};
