import PropTypes from 'prop-types';
import { Box, Card, CardActions, Divider, Stack, Typography } from '@mui/material';
import ContentLoader from 'react-content-loader';

export const AnalyticsTableLoading = (props) => {
  const { action, chartSeries, value, title } = props;

  return (
    <Card>
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          px: 3,
          py: 2,
        }}
      >
        <Box sx={{ width: 200 }}>
          <ContentLoader
            width={300}
            height={150}
            viewBox="0 0 300 150"
            backgroundColor="#f0f0f0"
            foregroundColor="#dedede"
          >
            <rect x="0" y="140" rx="3" ry="3" width="295" height="6" />
            <rect x="0" y="130" rx="3" ry="3" width="295" height="6" />
            <rect x="0" y="0" rx="10" ry="10" width="295" height="120" />
          </ContentLoader>
        </Box>
      </Stack>
      <Divider />
      <CardActions>{action}</CardActions>
    </Card>
  );
};

AnalyticsTableLoading.propTypes = {
  action: PropTypes.any.isRequired,
  chartSeries: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
