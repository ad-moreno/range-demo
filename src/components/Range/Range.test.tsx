import {render, cleanup, fireEvent} from '@testing-library/react';
import '@testing-library/jest-dom';

import Range from './';

afterEach(cleanup);

describe('Range', () => {
  const props = {
    min: 0,
    max: 100,
  };

  it('renders without crashing', () => {
    const {getByTestId} = render(<Range {...props} />);

    // Expect two handles
    expect(getByTestId('start-handle')).toBeInTheDocument();
    expect(getByTestId('end-handle')).toBeInTheDocument();

    // Expect two price labels
    expect(getByTestId('start-price-label')).toBeInTheDocument();
    expect(getByTestId('end-price-label')).toBeInTheDocument();
  });

  it('should render with the correct styles for the start handle', () => {
    const {getByTestId} = render(<Range {...props} />);
    const startHandle = getByTestId('start-handle');

    expect(startHandle.style.left).toEqual('0%');
  });

  it('should render the correct labels for the price range', () => {
    const {getByTestId} = render(<Range {...props} />);

    expect(getByTestId('start-price-label').querySelector('input')).toHaveAttribute('value', '0');
    expect(getByTestId('end-price-label').querySelector('input')).toHaveAttribute('value', '100');
  });

  it('should move the start handle when dragged', async () => {
    const {getByTestId} = render(<Range {...props} />);
    const startHandle = getByTestId('start-handle');
    const trackElement = startHandle.parentElement!;

    // Mock getBoundingClientRect only for the track element
    trackElement.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 100,
      height: 10,
      x: 0,
      y: 0,
      toJSON() {},
    }));

    fireEvent.mouseDown(startHandle);
    fireEvent.mouseMove(startHandle, {clientX: 50});
    fireEvent.mouseUp(startHandle);

    expect(startHandle.style.left).toEqual('50%');

    expect(getByTestId('start-price-label').querySelector('input')).toHaveAttribute('value', '50');
  });

  it('should move the end handle when dragged', async () => {
    const {getByTestId} = render(<Range {...props} />);
    const endHandle = getByTestId('end-handle');
    const trackElement = endHandle.parentElement!;

    trackElement.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 100,
      height: 10,
      x: 0,
      y: 0,
      toJSON() {},
    }));

    fireEvent.mouseDown(endHandle);
    fireEvent.mouseMove(endHandle, {clientX: 25});
    fireEvent.mouseUp(endHandle);

    expect(endHandle.style.left).toEqual('25%');
    expect(getByTestId('end-price-label').querySelector('input')).toHaveAttribute('value', '25');
  });

  it('works with rangeValues props', () => {
    const {getByTestId} = render(<Range rangeValues={[10, 20, 30, 40]} />);
    const startHandle = getByTestId('start-handle');
    const endHandle = getByTestId('end-handle');
    const trackElement = endHandle.parentElement!;

    trackElement.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 100,
      height: 10,
      x: 0,
      y: 0,
      toJSON() {},
    }));

    fireEvent.mouseDown(startHandle);
    fireEvent.mouseMove(startHandle, {clientX: 33});
    fireEvent.mouseUp(startHandle);

    fireEvent.mouseDown(endHandle);
    fireEvent.mouseMove(endHandle, {clientX: 66});
    fireEvent.mouseUp(endHandle);

    expect(Math.floor(parseFloat(startHandle.style.left.split('%')[0]))).toEqual(33);
    expect(Math.floor(parseFloat(endHandle.style.left.split('%')[0]))).toEqual(66);

    expect(getByTestId('start-price-label').querySelector('input')).toHaveAttribute('value', '20');
    expect(getByTestId('end-price-label').querySelector('input')).toHaveAttribute('value', '30');
  });

  it('approximates the user input to rangeValues props', () => {
    const {getByTestId} = render(<Range rangeValues={[10, 20, 30, 40]} />);
    const startHandle = getByTestId('start-handle');
    const endHandle = getByTestId('end-handle');
    const trackElement = endHandle.parentElement!;

    trackElement.getBoundingClientRect = jest.fn(() => ({
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: 100,
      height: 10,
      x: 0,
      y: 0,
      toJSON() {},
    }));

    fireEvent.mouseDown(startHandle);
    fireEvent.mouseMove(startHandle, {clientX: 30});
    fireEvent.mouseUp(startHandle);

    fireEvent.mouseDown(endHandle);
    fireEvent.mouseMove(endHandle, {clientX: 80});
    fireEvent.mouseUp(endHandle);

    expect(Math.floor(parseFloat(startHandle.style.left.split('%')[0]))).toEqual(33);
    expect(Math.floor(parseFloat(endHandle.style.left.split('%')[0]))).toEqual(66);

    expect(getByTestId('start-price-label').querySelector('input')).toHaveAttribute('value', '20');
    expect(getByTestId('end-price-label').querySelector('input')).toHaveAttribute('value', '30');
  });
});
