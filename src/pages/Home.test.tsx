import {render} from '@testing-library/react';
import {mocked} from 'jest-mock';
import '@testing-library/jest-dom';

import * as hooks from '../content/hooks';
import Home from './Home';

jest.mock('../content/hooks');
const mockedHooks = mocked(hooks);

describe('Home component', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should render normal range data', async () => {
    const mockUseNormalRangeData = jest.fn().mockReturnValue({
      isSuccess: true,
      data: {min: 2, max: 10},
    });
    mockedHooks.useNormalRangeData.mockImplementationOnce(mockUseNormalRangeData);

    const mockUseFixedRangeData = jest.fn().mockReturnValue({
      isSuccess: true,
      data: {rangeValues: [4, 15]},
    });
    mockedHooks.useFixedRangeData.mockImplementationOnce(mockUseFixedRangeData);

    const {getByTestId} = render(<Home />);

    expect(getByTestId('normal-range').textContent).toContain('Normal Range');
    expect(getByTestId('normal-range').textContent).toContain('2');
    expect(getByTestId('normal-range').textContent).toContain('10');

    expect(getByTestId('fixed-range').textContent).toContain('Fixed Range');
    expect(getByTestId('fixed-range').textContent).toContain('4');
    expect(getByTestId('fixed-range').textContent).toContain('15');
  });

  it('should not render ranges until the data is loaded', async () => {
    const mockUseNormalRangeData = jest.fn().mockReturnValue({
      isSuccess: false,
    });
    mockedHooks.useNormalRangeData.mockImplementationOnce(mockUseNormalRangeData);

    const mockUseFixedRangeData = jest.fn().mockReturnValue({
      isSuccess: true,
      data: {rangeValues: [4, 15]},
    });
    mockedHooks.useFixedRangeData.mockImplementationOnce(mockUseFixedRangeData);

    const {getByTestId, queryByText} = render(<Home />);

    expect(queryByText('Normal Range')).not.toBeInTheDocument();
    expect(getByTestId('fixed-range')).toBeInTheDocument();
  });

  it('should render and log an error if the content could not be loaded', async () => {
    const error = new Error('Error loading content');

    const logError = jest.spyOn(console, 'error').mockImplementation(jest.fn);
    const mockUseNormalRangeData = jest.fn().mockReturnValue({
      isSuccess: false,
      isError: true,
      error,
    });
    mockedHooks.useNormalRangeData.mockImplementationOnce(mockUseNormalRangeData);

    const mockUseFixedRangeData = jest.fn().mockReturnValue({
      isSuccess: true,
      error: null,
      data: {rangeValues: [5, 15]},
    });
    mockedHooks.useFixedRangeData.mockImplementationOnce(mockUseFixedRangeData);

    const {getByTestId} = render(<Home />);
    const normalRangeText = getByTestId('normal-range').textContent;
    expect(normalRangeText).toContain(error.name);
    expect(normalRangeText).toContain(error.message);
    expect(logError).toHaveBeenCalled();
  });
});
