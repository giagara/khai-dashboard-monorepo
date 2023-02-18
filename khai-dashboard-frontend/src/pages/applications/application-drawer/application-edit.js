import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { Button, Stack, TextField, Typography } from '@mui/material';

const statusOptions = [
  {
    label: 'Canceled',
    value: 'canceled',
  },
  {
    label: 'Complete',
    value: 'complete',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Rejected',
    value: 'rejected',
  },
];

export const ApplicationEdit = (props) => {
  const { onCancel, onSave, application } = props;

  const createdAt = format(application.createdAt, 'dd/MM/yyyy HH:mm');

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Typography variant="h6">Details</Typography>
        <Stack spacing={3}>
          <TextField disabled fullWidth label="ID" name="id" value={application.id} />
          <TextField disabled fullWidth label="Number" name="number" value={application.number} />
          <TextField disabled fullWidth label="Customer name" name="customer_name" value={application.customer.name} />
          <TextField disabled fullWidth label="Date" name="date" value={createdAt} />
          <TextField fullWidth label="Address" name="address" value={application.customer.address1} />
          <TextField fullWidth label="Country" name="country" value={application.customer.country} />
          <TextField fullWidth label="State/Region" name="state_region" value={application.customer.city} />
          <TextField fullWidth label="Total Amount" name="amount" value={application.totalAmount} />
          <TextField
            fullWidth
            label="Status"
            name="status"
            select
            SelectProps={{ native: true }}
            value={application.status}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </Stack>
        <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={2}>
          <Button color="primary" onClick={onSave} size="small" variant="contained">
            Save changes
          </Button>
          <Button color="inherit" onClick={onCancel} size="small">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Stack>
  );
};

ApplicationEdit.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  // @ts-ignore
  application: PropTypes.object,
};
