import PropTypes from 'prop-types';
import numeral from 'numeral';
import InfoCircleIcon from '@untitled-ui/icons-react/build/esm/InfoCircle';
import LinkExternal01Icon from '@untitled-ui/icons-react/build/esm/LinkExternal01';
import {
  Card,
  CardHeader,
  Link,
  Stack,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material';
import { Scrollbar } from '../../../components/scrollbar';
import { SeverityPill } from '../../../components/severity-pill';

export const ApplicationsList = (props) => {
  const { applications } = props;

  return (
    <Card>
      <CardHeader title="Elenco applicazioni" />
      <Scrollbar>
        <Table sx={{ minWidth: 600 }}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Api key</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Tot users</TableCell>
              <TableCell>Attiva</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => {
              return (
                <TableRow key={application.apikey}
sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Link color="text.primary"
href="#">
                      <Stack alignItems="center"
direction="row"
spacing={2}>
                        <SvgIcon fontSize="small">
                          <LinkExternal01Icon />
                        </SvgIcon>
                        <Typography variant="body2">{application.url}</Typography>
                      </Stack>
                    </Link>
                  </TableCell>
                  <TableCell>{application.name}</TableCell>
                  <TableCell>{application.apikey}</TableCell>
                  <TableCell>{application.tipo}</TableCell>
                  <TableCell>{application.users_count}</TableCell>
                  <TableCell>
                    <SeverityPill color={application.active ? 'success' : 'danger'}>
                      {application.active ? 'YES' : 'NO'}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Scrollbar>
    </Card>
  );
};

ApplicationsList.propTypes = {
  applications: PropTypes.array.isRequired,
};
