import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

import DataRange from '.';

describe('Data range', () => {
  it('should render normal range data', async () => {
    const {container, getByDisplayValue} = render(<DataRange title="Normal Range" data={{min: 2, max: 10}} />);

    expect(container.textContent).toContain('Normal Range');
    expect(getByDisplayValue('2')).toBeDefined();
    expect(getByDisplayValue('10')).toBeDefined();
  });

  it('should render fixed range data', async () => {
    const {container, getByDisplayValue} = render(<DataRange title="Fixed Range" data={{rangeValues: [4, 10, 15]}} />);

    expect(container.textContent).toContain('Fixed Range');
    expect(getByDisplayValue('4')).toBeDefined();
    expect(getByDisplayValue('15')).toBeDefined();
  });
});
