import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom';

import EditablePriceLabel from './';

describe('EditablePriceLabel', () => {
  it('renders correctly', () => {
    const {getByText, getByTestId} = render(<EditablePriceLabel value={10} />);

    expect(getByText('€')).toBeInTheDocument();
    expect(getByTestId('price-label').textContent).toContain('10');
  });

  it('renders another currency', () => {
    const {getByText} = render(<EditablePriceLabel value={10} currency="$" />);

    expect(getByText('$')).toBeInTheDocument();
  });

  it('updates its switches from label to input when clicked', () => {
    const {getByTestId, queryByTestId} = render(<EditablePriceLabel value={10} />);
    const container = getByTestId('price-container');

    fireEvent.click(container);

    expect(getByTestId('price-input')).toBeInTheDocument();
    expect(queryByTestId('price-label')).not.toBeInTheDocument();
  });

  it('updates its value correctly when the input is changed', async () => {
    const onChange = jest.fn();
    const {getByTestId} = render(<EditablePriceLabel value={10} onChange={onChange} />);
    const container = getByTestId('price-container');

    fireEvent.click(container);
    fireEvent.change(getByTestId('price-input'), {target: {value: 20}});
    fireEvent.blur(getByTestId('price-input'));

    expect(onChange).toHaveBeenCalledWith(20);
    expect(getByTestId('price-label').textContent).toContain('10');
  });

  it('display any input value even if it is out of bounds', () => {
    const onChange = jest.fn();
    const {getByTestId} = render(<EditablePriceLabel value={10} min={0} max={5} onChange={onChange} />);
    const container = getByTestId('price-container');

    fireEvent.click(container);
    fireEvent.change(getByTestId('price-input'), {target: {value: 20}});

    expect(getByTestId('price-input')).toHaveAttribute('value', '20');
  });

  it('ignores calling on change and switch back to initial value when input is out of bounds', () => {
    const onChange = jest.fn();
    const {getByTestId} = render(<EditablePriceLabel value={10} min={0} max={5} onChange={onChange} />);
    const container = getByTestId('price-container');

    fireEvent.click(container);
    fireEvent.change(getByTestId('price-input'), {target: {value: 20}});
    fireEvent.blur(getByTestId('price-input'));

    expect(onChange).not.toHaveBeenCalled();
    expect(getByTestId('price-label').textContent).toContain('10');
  });

  it('switches back to label when blurring', () => {
    const {getByTestId, queryByTestId} = render(<EditablePriceLabel value={10} />);
    const container = getByTestId('price-container');

    fireEvent.click(container);
    fireEvent.blur(getByTestId('price-input'));

    expect(queryByTestId('price-input')).not.toBeInTheDocument();
    expect(getByTestId('price-label')).toBeInTheDocument();
  });

  it('it does not switch to input when disabled', () => {
    const {getByTestId, queryByTestId} = render(<EditablePriceLabel value={10} disabled />);

    const container = getByTestId('price-container');

    fireEvent.click(container);

    expect(queryByTestId('price-input')).not.toBeInTheDocument();
    expect(getByTestId('price-label')).toBeInTheDocument();
  });
});
