import {render} from '@testing-library/react';
import '@testing-library/jest-dom';

import DataRange from '.';

describe('Home component', () => {
  it('should render normal range data', async () => {
    const {container} = render(<DataRange title="Normal Range" data={{min: 2, max: 10}} />);

    expect(container.textContent).toContain('Normal Range');
    expect(container.textContent).toContain('2');
    expect(container.textContent).toContain('10');
  });

  it('should render fixed range data', async () => {
    const {container} = render(<DataRange title="Fixed Range" data={{rangeValues: [4, 15]}} />);

    expect(container.textContent).toContain('Fixed Range');
    expect(container.textContent).toContain('4');
    expect(container.textContent).toContain('15');
  });
});
