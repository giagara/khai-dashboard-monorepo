import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Button, Chip, InputAdornment, Stack, SvgIcon, TextField, Typography } from '@mui/material';

export const ApplicationDetailsStep = (props) => {
  const { onBack, onNext, applicationDetail, setApplicationDetail, ...other } = props;

  const handleChangeApplication = (prop_name, value) => {
    setApplicationDetail((old) => {
      return { ...old, [prop_name]: value };
    });
  };

  return (
    <Stack spacing={3}
{...other}>
      <div>
        <Typography variant="h6">Qualche dettaglio dell'applicazione</Typography>
      </div>
      <Stack spacing={3}>
        <TextField
          autoComplete="off"
          fullWidth
          label="Nome applicazione"
          name="name"
          placeholder="Es: la mia applicazione"
          onChange={(e) => handleChangeApplication(e.target.name, e.target.value)}
          value={applicationDetail.name}
        />
        <TextField
          type={'number'}
          fullWidth
          label="Numero di utenti"
          name="users_count"
          placeholder="Es: 10"
          onChange={(e) => handleChangeApplication(e.target.name, e.target.value)}
          value={applicationDetail.users_count}
        />
      </Stack>

      <Stack alignItems="center"
direction="row"
spacing={2}>
        <Button
          endIcon={
            <SvgIcon>
              <ArrowRightIcon />
            </SvgIcon>
          }
          onClick={onNext}
          variant="contained"
        >
          Successivo
        </Button>
        <Button color="inherit"
onClick={onBack}>
          Indietro
        </Button>
      </Stack>
    </Stack>
  );
};

ApplicationDetailsStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  applicationDetail: PropTypes.object,
  setApplicationDetail: PropTypes.func,
};
