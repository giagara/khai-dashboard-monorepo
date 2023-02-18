import { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import { Box, Divider, InputAdornment, OutlinedInput, Stack, SvgIcon, Tab, Tabs, TextField } from '@mui/material';
import { useUpdateEffect } from '../../../hooks/use-update-effect';

const tabOptions = [
  {
    label: 'All',
    value: 'all',
  },
];

const sortOptions = [
  {
    label: 'A-Z',
    value: 'asc',
  },
  {
    label: 'Z-A',
    value: 'desc',
  },
];

export const ApplicationListSearch = (props) => {
  const { onFiltersChange, onSortChange, sortBy = 'createdAt', sortDir = 'asc' } = props;
  const queryRef = useRef(null);
  const [currentTab, setCurrentTab] = useState('all');
  const [filters, setFilters] = useState({
    query: undefined,
    status: undefined,
  });

  const handleFiltersUpdate = useCallback(() => {
    onFiltersChange?.(filters);
  }, [filters, onFiltersChange]);

  useUpdateEffect(() => {
    handleFiltersUpdate();
  }, [filters, handleFiltersUpdate]);

  const handleTabsChange = useCallback((event, tab) => {
    setCurrentTab(tab);
    const status = tab === 'all' ? undefined : tab;

    setFilters((prevState) => ({
      ...prevState,
      status,
    }));
  }, []);

  const handleQueryChange = useCallback((event) => {
    event.preventDefault();
    const query = queryRef.current?.value || '';
    setFilters((prevState) => ({
      ...prevState,
      query,
    }));
  }, []);

  const handleSortChange = useCallback(
    (event) => {
      const sortDir = event.target.value;
      onSortChange?.(sortDir);
    },
    [onSortChange]
  );

  return (
    <div>
      <Stack alignItems="center" direction="row" flexWrap="wrap" gap={3} sx={{ p: 3 }}>
        <Box component="form" onSubmit={handleQueryChange} sx={{ flexGrow: 1 }}>
          <OutlinedInput
            defaultValue=""
            fullWidth
            inputProps={{ ref: queryRef }}
            name="orderNumber"
            placeholder="Ricerca applicazione"
            startAdornment={
              <InputAdornment position="start">
                <SvgIcon>
                  <SearchMdIcon />
                </SvgIcon>
              </InputAdornment>
            }
          />
        </Box>
        <TextField
          style={{ minWidth: '150px' }}
          label="Ordina per"
          name="sort"
          onChange={handleSortChange}
          select
          SelectProps={{ native: true }}
          value={sortDir}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </TextField>
      </Stack>
    </div>
  );
};

ApplicationListSearch.propTypes = {
  onFiltersChange: PropTypes.func,
  onSortChange: PropTypes.func,
  sortBy: PropTypes.string,
  sortDir: PropTypes.oneOf(['asc', 'desc']),
};
