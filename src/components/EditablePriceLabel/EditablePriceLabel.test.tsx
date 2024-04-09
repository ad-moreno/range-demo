import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom';

import EditablePriceLabel from './';

describe('EditablePriceLabel', () => {
  it('renders correctly', () => {
    const {getByText, getByTestId} = render(<EditablePriceLabel value={10} />);

    expect(getByText('€')).toBeInTheDocument();
    expect(getByTestId('price-input')).toHaveAttribute('value', '10');
  });

  it('renders another currency', () => {
    const {getByText} = render(<EditablePriceLabel value={10} currency="$" />);

    expect(getByText('$')).toBeInTheDocument();
  });

  it('updates its switches from label to input when clicked', () => {
    const {getByTestId} = render(<EditablePriceLabel value={10} />);
    const priceInput = getByTestId('price-input');

    fireEvent.focus(priceInput);

    expect(priceInput).toHaveStyle('border-bottom-width: 1px');
  });

  it('updates its value correctly when the input is changed', async () => {
    const onChange = jest.fn();
    const {getByTestId} = render(<EditablePriceLabel value={10} onChange={onChange} />);
    const priceInput = getByTestId('price-input');

    fireEvent.focus(priceInput);
    fireEvent.change(priceInput, {target: {value: 20}});
    fireEvent.blur(priceInput);

    expect(onChange).toHaveBeenCalledWith(20);
    expect(priceInput).toHaveAttribute('value', '10');
  });

  it('display any input value even if it is out of bounds', () => {
    const onChange = jest.fn();
    const {getByTestId} = render(<EditablePriceLabel value={10} min={0} max={5} onChange={onChange} />);
    const priceInput = getByTestId('price-input');

    fireEvent.focus(priceInput);
    fireEvent.change(priceInput, {target: {value: 20}});

    expect(priceInput).toHaveAttribute('value', '20');
  });

  it('ignores calling on change and switch back to initial value when input is out of bounds', () => {
    const onChange = jest.fn();
    const {getByTestId} = render(<EditablePriceLabel value={10} min={0} max={5} onChange={onChange} />);
    const priceInput = getByTestId('price-input');

    fireEvent.focus(priceInput);
    fireEvent.change(priceInput, {target: {value: 20}});
    fireEvent.blur(priceInput);

    expect(onChange).not.toHaveBeenCalled();
    expect(priceInput).toHaveAttribute('value', '10');
  });

  it('switches back to label when blurring', () => {
    const {getByTestId} = render(<EditablePriceLabel value={10} />);
    const priceInput = getByTestId('price-input');

    fireEvent.focus(priceInput);
    fireEvent.blur(priceInput);

    expect(priceInput).not.toHaveStyle('border-bottom-width: 1px');
  });

  it('it does not switch to input when disabled', () => {
    const {getByTestId} = render(<EditablePriceLabel value={10} disabled />);
    const priceInput = getByTestId('price-input');

    fireEvent.focus(priceInput);

    expect(priceInput).not.toHaveStyle('border-bottom-width: 1px');
  });
});
