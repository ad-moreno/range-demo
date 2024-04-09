import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

import DataRange from '.';
import {UseQueryResult} from '@tanstack/react-query';
import {NormalRangeData} from 'src/content/hooks';
import {RangeValuesProps} from '../Range';

const normalRangeQuery: UseQueryResult<NormalRangeData> = {
  data: {min: 2, max: 10},
  dataUpdatedAt: 0,
  error: null,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isError: false,
  isFetched: true,
  isFetchedAfterMount: true,
  isFetching: false,
  isLoading: false,
  isPending: false,
  isLoadingError: false,
  isInitialLoading: false,
  isPaused: false,
  isPlaceholderData: false,
  isRefetchError: false,
  isRefetching: false,
  isStale: false,
  isSuccess: true,
  refetch: jest.fn(),
  status: 'success',
  fetchStatus: 'idle',
};

const fixedRangeQuery: UseQueryResult<RangeValuesProps> = {
  data: {rangeValues: [4, 15]},
  dataUpdatedAt: 0,
  error: null,
  errorUpdatedAt: 0,
  failureCount: 0,
  failureReason: null,
  errorUpdateCount: 0,
  isError: false,
  isFetched: true,
  isFetchedAfterMount: true,
  isFetching: false,
  isLoading: false,
  isPending: false,
  isLoadingError: false,
  isInitialLoading: false,
  isPaused: false,
  isPlaceholderData: false,
  isRefetchError: false,
  isRefetching: false,
  isStale: false,
  isSuccess: true,
  refetch: jest.fn(),
  status: 'success',
  fetchStatus: 'idle',
};

describe('Home component', () => {
  it('should render normal range data', async () => {
    const {container} = render(<DataRange title="Normal Range" query={normalRangeQuery} />);

    expect(container.textContent).toContain('Normal Range');
    expect(container.textContent).toContain('2');
    expect(container.textContent).toContain('10');
  });

  it('should render fixed range data', async () => {
    const {container} = render(<DataRange title="Fixed Range" query={fixedRangeQuery} />);

    expect(container.textContent).toContain('Fixed Range');
    expect(container.textContent).toContain('4');
    expect(container.textContent).toContain('15');
  });

  it('should not render ranges until the data is loaded', async () => {
    const query: UseQueryResult<NormalRangeData> = {
      ...normalRangeQuery,
      data: undefined,
      error: null,
      isError: false,
      isPending: true,
      isLoading: true,
      isLoadingError: false,
      isRefetchError: false,
      isSuccess: false,
      status: 'pending',
    };
    const {queryByText} = render(<DataRange title="Normal Range" query={query} />);

    expect(queryByText('Normal Range')).not.toBeInTheDocument();
  });

  it('should render and log an error if the content could not be loaded', async () => {
    const error = new Error('Error loading content');
    const query: UseQueryResult<NormalRangeData> = {
      ...normalRangeQuery,
      isSuccess: false,
      status: 'error',
      isRefetchError: true,
      isError: true,
      error,
    };
    const logError = jest.spyOn(console, 'error').mockImplementation(jest.fn);

    const {container} = render(<DataRange title="Normal Range" query={query} />);
    expect(container.textContent).toContain(error.name);
    expect(container.textContent).toContain(error.message);
    expect(logError).toHaveBeenCalled();
  });
});
