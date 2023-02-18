import PropTypes from 'prop-types';
import { format } from 'date-fns';
import numeral from 'numeral';
import { Box, Table, TableBody, TableCell, TablePagination, TableRow, Typography } from '@mui/material';
import { SeverityPill } from '../../../components/severity-pill';

const statusMap = {
  1: 'success',
  // pending: 'info',
  // canceled: 'warning',
  0: 'error',
};

export const ApplicationListTable = (props) => {
  const {
    onOrderSelect,
    onPageChange,
    onRowsPerPageChange,
    applications,
    applicationsCount,
    page,
    rowsPerPage,
    ...other
  } = props;

  return (
    <div {...other}>
      <Table>
        <TableBody>
          {applications.map((application) => {
            const statusColor = statusMap[application.active] || 'warning';

            return (
              <TableRow
                hover
                key={application.uuid}
                onClick={() => onOrderSelect?.(application.uuid)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                  }}
                >
                  <Box sx={{ ml: 2 }}>
                    <Typography variant="subtitle2">{application.name}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      {application.uuid}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <SeverityPill color={statusColor}>{application.active ? 'ATTIVA' : 'DISATTIVA'}</SeverityPill>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={applicationsCount}
        onPageChange={onPageChange}
        onRowsPerPageChange={onRowsPerPageChange}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </div>
  );
};

ApplicationListTable.propTypes = {
  onOrderSelect: PropTypes.func,
  onPageChange: PropTypes.func.isRequired,
  onRowsPerPageChange: PropTypes.func,
  applications: PropTypes.array.isRequired,
  applicationsCount: PropTypes.number.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
