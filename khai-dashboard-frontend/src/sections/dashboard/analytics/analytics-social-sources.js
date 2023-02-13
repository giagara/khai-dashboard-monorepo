import PropTypes from 'prop-types';
import InfoCircleIcon from '@untitled-ui/icons-react/build/esm/InfoCircle';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  SvgIcon,
  Tooltip,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Chart } from '../../../components/chart';

const useChartOptions = (labels) => {
  const theme = useTheme();

  return {
    chart: {
      background: 'transparent',
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    colors: [theme.palette.primary.main, theme.palette.warning.main, theme.palette.info.main],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
      type: 'solid',
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: 'none',
        },
      },
      hover: {
        filter: {
          type: 'none',
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

export const AnalyticsAppTypes = (props) => {
  const { applications } = props;
  const chartOptions = useChartOptions(applications.map((item) => item.tipo));

  return (
    <Card>
      <CardHeader
        title="Tipi di applicazione"
        action={
          <Tooltip title="Refresh rate is 24h">
            <SvgIcon color="action">
              <InfoCircleIcon />
            </SvgIcon>
          </Tooltip>
        }
      />
      <CardContent>
        <Chart height={200} options={chartOptions} series={applications.map((item) => item.total)} type="donut" />
        <Grid container
spacing={1}>
          {applications.map((item, index) => (
            <Grid key={index}
xs={12}
sm={6}>
              <Stack alignItems="center"
direction="row"
spacing={1}>
                <Box
                  sx={{
                    backgroundColor: chartOptions.colors[index],
                    borderRadius: '50%',
                    height: 8,
                    width: 8,
                  }}
                />
                <Typography variant="subtitle2">{item.tipo}</Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

AnalyticsAppTypes.propTypes = {
  applications: PropTypes.any.isRequired,
};
