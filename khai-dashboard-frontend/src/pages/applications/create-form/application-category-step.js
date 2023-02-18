import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@untitled-ui/icons-react/build/esm/ArrowRight';
import { Button, Card, Radio, Stack, SvgIcon, Typography } from '@mui/material';

const categoryOptions = [
  {
    description: 'Il minimo indispensabile per avviare la tua attività',
    title: 'Lite',
    value: 'lite',
  },
  {
    description: 'Applicazione standard',
    title: 'Standard',
    value: 'standard',
  },
  {
    description: 'Applicazione senza alcun limite',
    title: 'Premium',
    value: 'premium',
  },
];

export const ApplicationCategoryStep = (props) => {
  const { onBack, onNext, applicationDetail, setApplicationDetail, ...other } = props;

  const handleTipoChange = (value) => {
    setApplicationDetail((old) => {
      return { ...old, tipo: value };
    });
  };

  return (
    <Stack spacing={3} {...other}>
      <div>
        <Typography variant="h6">Tipo di applicazione...</Typography>
      </div>
      <Stack spacing={2}>
        {categoryOptions.map((option) => (
          <Card
            key={option.value}
            sx={{
              alignItems: 'center',
              cursor: 'pointer',
              display: 'flex',
              p: 2,
              ...(applicationDetail.tipo === option.value && {
                backgroundColor: 'primary.alpha12',
                boxShadow: (theme) => `${theme.palette.primary.main} 0 0 0 1px`,
              }),
            }}
            onClick={() => handleTipoChange(option.value)}
            variant="outlined"
          >
            <Stack direction="row" spacing={2}>
              <Radio checked={applicationDetail.tipo === option.value} color="primary" />
              <div>
                <Typography variant="subtitle1">{option.title}</Typography>
                <Typography color="text.secondary" variant="body2">
                  {option.description}
                </Typography>
              </div>
            </Stack>
          </Card>
        ))}
      </Stack>
      <div>
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
      </div>
    </Stack>
  );
};

ApplicationCategoryStep.propTypes = {
  onBack: PropTypes.func,
  onNext: PropTypes.func,
  applicationDetail: PropTypes.object,
  setApplicationDetail: PropTypes.func,
};
