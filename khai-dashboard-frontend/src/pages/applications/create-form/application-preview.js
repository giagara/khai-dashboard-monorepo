import PropTypes from 'prop-types';
import CheckIcon from '@untitled-ui/icons-react/build/esm/Check';
import { Avatar, Button, Card, Stack, SvgIcon, Typography } from '@mui/material';

export const ApplicationPreview = ({ applicationDetail }) => (
  <Stack spacing={2}>
    <div>
      <Avatar
        sx={{
          backgroundColor: 'success.main',
          color: 'success.contrastText',
          height: 40,
          width: 40,
        }}
      >
        <SvgIcon>
          <CheckIcon />
        </SvgIcon>
      </Avatar>
      <Typography variant="h6"
sx={{ mt: 2 }}>
        Applicazione creata!
      </Typography>
      <Typography color="text.secondary"
variant="body2">
        Ecco i dati dell'applicazione
      </Typography>
    </div>
    <Card variant="outlined">
      <Stack
        alignItems="center"
        direction="row"
        flexWrap="wrap"
        justifyContent="space-between"
        sx={{
          px: 2,
          py: 1.5,
        }}
      >
        <div>
          <Typography variant="subtitle1">{applicationDetail.name}</Typography>
          <Typography color="text.secondary"
variant="caption">
            {applicationDetail.uuid}
          </Typography>
        </div>
        <Stack alignItems="center"
direction="row"
spacing={2}>
          <Typography color="text.secondary"
variant="caption">
            {applicationDetail.api_key}
          </Typography>
          <Button size="small">Dettagli</Button>
        </Stack>
      </Stack>
    </Card>
  </Stack>
);

ApplicationPreview.propTypes = {
  applicationDetail: PropTypes.object,
};
