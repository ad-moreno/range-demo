import React, {useState} from 'react';
import {StoryFn, Meta} from '@storybook/react';
import EditablePriceLabel from './';

export default {
  title: 'Example/EditablePriceLabel',
  component: EditablePriceLabel,
  argTypes: {
    value: {control: 'number'},
    min: {control: 'number'},
    max: {control: 'number'},
  },
} as Meta;

const Template: StoryFn<React.ComponentProps<typeof EditablePriceLabel>> = args => {
  const [value, setValue] = useState(args.value);
  return (
    <EditablePriceLabel
      value={value}
      min={args.min}
      max={args.max}
      onChange={setValue}
      disabled={args.disabled}
      style={{width: '3rem'}}
    />
  );
};

export const NormalRange = Template.bind({});
NormalRange.args = {
  value: 0,
  min: -10,
  max: 10,
};

export const DisabledRange = Template.bind({});
DisabledRange.args = {
  value: 5,
  disabled: true,
};
