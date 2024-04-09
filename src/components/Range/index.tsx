import React, {ComponentProps, useCallback, useMemo, useState} from 'react';
import styled from 'styled-components';
import EditablePriceLabel from '../EditablePriceLabel';
import {stringifyValue} from '../../utils/parsing';

const RangeContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  user-select: none;
  padding: 20px 0;
  width: 100%;
`;

const Track = styled.div`
  height: 4px;
  background: #ddd;
  flex-grow: 1;
  position: relative;
`;

const Handle = styled.div<{$isDragging: boolean; $isSelected: boolean}>`
  width: 20px;
  height: 20px;
  background-color: #fff;
  border: 2px solid #007bff;
  border-radius: 50%;
  position: absolute;
  cursor: ${props => (props.$isDragging ? 'grabbing' : 'grab')};
  transform: translate(-50%, -50%) ${props => (props.$isSelected ? 'scale(1.2)' : '')};
  top: 50%;
`;

export interface RangeMinMaxProps {
  min: number;
  max: number;
  rangeValues?: never;
}

export interface RangeValuesProps {
  min?: never;
  max?: never;
  rangeValues: number[];
}

type RangeProps = ComponentProps<'div'> & (RangeMinMaxProps | RangeValuesProps);

type HandleType = 'start' | 'end';

const Range = ({min, max, rangeValues, ...props}: RangeProps) => {
  const sortedRangeValues = useMemo(() => (rangeValues ?? []).sort(), [rangeValues]);

  const minValue = sortedRangeValues.at(0) ?? min ?? 0;
  const maxValue = sortedRangeValues.at(-1) ?? max ?? 0;
  const [startValue, setStartValue] = useState(minValue);
  const [endValue, setEndValue] = useState(maxValue);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedHandle, setSelectedHandle] = useState<HandleType | null>(null);

  const findClosest = useCallback(
    (value: number) => {
      if (sortedRangeValues.length === 0) return value;
      return sortedRangeValues.reduce((prev, curr) => (Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev));
    },
    [sortedRangeValues]
  );

  const calculateValue = useCallback(
    (clientX: number, trackOffset: DOMRect) => {
      const ratio = (clientX - trackOffset.left) / trackOffset.width;
      const rawValue = Math.round(ratio * (maxValue - minValue) + minValue);
      return findClosest(rawValue);
    },
    [findClosest, maxValue, minValue]
  );

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>, handleType: HandleType) => {
    setIsDragging(true);
    setSelectedHandle(handleType);

    const track = event.currentTarget.parentElement!.getBoundingClientRect();

    const moveHandle = (moveEvent: MouseEvent) => {
      const newValue = calculateValue(moveEvent.clientX, track);
      if (handleType === 'start' && newValue < endValue && newValue >= minValue) {
        setStartValue(newValue);
      } else if (handleType === 'end' && newValue > startValue && newValue <= maxValue) {
        setEndValue(newValue);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setSelectedHandle(null);
      document.removeEventListener('mousemove', moveHandle);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', moveHandle);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <RangeContainer {...props}>
      <EditablePriceLabel
        value={startValue}
        min={minValue}
        max={endValue}
        disabled={!!rangeValues}
        onChange={setStartValue}
        containerStyle={{justifyContent: 'end'}}
        style={{width: `${stringifyValue(maxValue).length}ch`}}
        data-testid="start-price-label"
      />
      <Track>
        <Handle
          data-testid="start-handle"
          style={{left: `${((startValue - minValue) / (maxValue - minValue)) * 100}%`}}
          onMouseDown={e => handleMouseDown(e, 'start')}
          $isDragging={isDragging}
          $isSelected={selectedHandle === 'start'}
        />
        <Handle
          data-testid="end-handle"
          style={{left: `${((endValue - minValue) / (maxValue - minValue)) * 100}%`}}
          onMouseDown={e => handleMouseDown(e, 'end')}
          $isDragging={isDragging}
          $isSelected={selectedHandle === 'end'}
        />
      </Track>
      <EditablePriceLabel
        value={endValue}
        min={startValue}
        max={maxValue}
        disabled={!!rangeValues}
        onChange={setEndValue}
        containerStyle={{justifyContent: 'start'}}
        style={{width: `${stringifyValue(maxValue).length}ch`}}
        data-testid="end-price-label"
      />
    </RangeContainer>
  );
};

export default Range;
