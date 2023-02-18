import { useCallback, useMemo, useState } from 'react';
import CheckIcon from '@untitled-ui/icons-react/build/esm/Check';
import { Avatar, Step, StepContent, StepLabel, Stepper, SvgIcon, Typography } from '@mui/material';
import { ApplicationCategoryStep } from './application-category-step';
import { ApplicationApiKeyStep } from './application-apikey-step';
import { ApplicationDetailsStep } from './application-details-step';
import { ApplicationPreview } from './application-preview';
import { applicationApi } from '../../../api/applications/application.api';

const StepIcon = (props) => {
  const { active, completed, icon } = props;

  const highlight = active || completed;

  return (
    <Avatar
      sx={{
        height: 40,
        width: 40,
        ...(highlight && {
          backgroundColor: 'primary.main',
          color: 'primary.contrastText',
        }),
      }}
      variant="rounded"
    >
      {completed ? (
        <SvgIcon>
          <CheckIcon />
        </SvgIcon>
      ) : (
        icon
      )}
    </Avatar>
  );
};

export const ApplicationCreateForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [complete, setComplete] = useState(false);

  const [applicationDetail, setApplicationDetail] = useState({
    tipo: 'standard',
    name: '',
    users_count: 10,
    api_key: '',
  });

  const [savedApplication, setSavedApplication] = useState({});

  const handleNext = useCallback(() => {
    setActiveStep((prevState) => prevState + 1);
  }, []);

  const handleBack = useCallback(() => {
    setActiveStep((prevState) => prevState - 1);
  }, []);

  const handleComplete = useCallback(() => {
    try {
      applicationApi.save(applicationDetail).then((response) => {
        setSavedApplication(response);
        setComplete(true);
      });
    } catch (err) {
      console.error(err);
    }
  }, [applicationDetail]);

  const steps = useMemo(() => {
    return [
      {
        label: 'Tipo',
        content: (
          <ApplicationCategoryStep
            onBack={handleBack}
            onNext={handleNext}
            setApplicationDetail={setApplicationDetail}
            applicationDetail={applicationDetail}
          />
        ),
      },
      {
        label: 'Dettagli',
        content: (
          <ApplicationDetailsStep
            onBack={handleBack}
            onNext={handleNext}
            setApplicationDetail={setApplicationDetail}
            applicationDetail={applicationDetail}
          />
        ),
      },
      {
        label: 'Api key',
        content: (
          <ApplicationApiKeyStep
            onBack={handleBack}
            onNext={handleComplete}
            setApplicationDetail={setApplicationDetail}
            applicationDetail={applicationDetail}
          />
        ),
      },
    ];
  }, [handleBack, handleNext, handleComplete, applicationDetail]);

  if (complete) {
    return <ApplicationPreview applicationDetail={savedApplication} />;
  }

  return (
    <Stepper
      activeStep={activeStep}
      orientation="vertical"
      sx={{
        '& .MuiStepConnector-line': {
          borderLeftColor: 'divider',
          borderLeftWidth: 2,
          ml: 1,
        },
      }}
    >
      {steps.map((step, index) => {
        const isCurrentStep = activeStep === index;

        return (
          <Step key={step.label}>
            <StepLabel StepIconComponent={StepIcon}>
              <Typography sx={{ ml: 2 }} variant="overline">
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent
              sx={{
                borderLeftColor: 'divider',
                borderLeftWidth: 2,
                ml: '20px',
                ...(isCurrentStep && {
                  py: 4,
                }),
              }}
            >
              {step.content}
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
};
