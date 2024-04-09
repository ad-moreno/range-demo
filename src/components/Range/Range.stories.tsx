import React from 'react';
import {type StoryFn, type Meta} from '@storybook/react';
import Range from './';

export default {
  title: 'Example/Range',
  component: Range,
  argTypes: {
    min: {control: 'number'},
    max: {control: 'number'},
  },
} as Meta;

type RangeProps = React.ComponentProps<typeof Range>;
const Template: StoryFn<RangeProps> = args => <Range {...args} style={{width: '500px'}} />;

export const NormalRange = Template.bind({});
NormalRange.args = {
  min: 1,
  max: 100,
};

export const FixedValuesRange = Template.bind({});
FixedValuesRange.args = {
  rangeValues: [1.99, 5.99, 10.99, 30.99, 50.99, 70.99],
};
