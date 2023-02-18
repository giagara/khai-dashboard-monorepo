import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Button, Stack, SvgIcon, TextField, Typography } from '@mui/material';

export const ApplicationApiKeyStep = (props) => {
  const { onBack, onNext, applicationDetail, setApplicationDetail, ...other } = props;

  const handleChangeApplication = (prop_name, value) => {
    setApplicationDetail((old) => {
      return { ...old, [prop_name]: value };
    });
  };

  return (
    <Stack spacing={3} {...other}>
      <div>
        <Typography variant="h6">Vuoi impostare un'api key specifica per questa applicazione?</Typography>
      </div>
      <Stack spacing={3}>
        <TextField
          autoComplete="off"
          fullWidth
          label="Api key"
          name="api_key"
          placeholder="95421589"
          onChange={(e) => handleChangeApplication(e.target.name, e.target.value)}
          value={applicationDetail.api_key}
        />
      </Stack>
      <Stack alignItems="center" direction="row" spacing={2}>
        <Button
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          onClick={onNext}
          variant="contained"
        >
          Create Job
        </Button>
        <Button color="inherit" onClick={onBack}>
          Back
        </Button>
      </Stack>
    </Stack>
  );
};

ApplicationApiKeyStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  applicationDetail: PropTypes.object,
  setApplicationDetail: PropTypes.func,
};
