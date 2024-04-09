'use client';

import React, {type ComponentProps, useCallback, useMemo, useState} from 'react';
import EditablePriceLabel from '../EditablePriceLabel';
import {stringifyValue} from '../../utils/parsing';

import styles from './styles.module.css';
import classNames from 'classnames';

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

/**
 * A customizable range component that allows the user to select a value within a given range.
 * The component can be used to display either a minimum and maximum value or an array of values.
 *
 * @param min The minimum value of the range. If `rangeValues` is provided, this parameter is ignored.
 * @param max The maximum value of the range. If `rangeValues` is provided, this parameter is ignored.
 * @param rangeValues An array of values within the range. If this parameter is provided, `min` and `max` are ignored.
 */
const Range = ({min, max, rangeValues, className, ...props}: RangeProps) => {
  const sortedRangeValues = useMemo(() => (rangeValues ?? []).sort((a, b) => (a > b ? 1 : -1)), [rangeValues]);

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
    <div className={classNames(styles.container, className)} {...props}>
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
      <div className={styles.track}>
        <div
          className={styles.handle}
          data-testid="start-handle"
          style={{
            left: `${((startValue - minValue) / (maxValue - minValue)) * 100}%`,
            cursor: isDragging ? 'grabbing' : 'grab',
            transform: `translate(-50%, -50%) ${selectedHandle === 'start' ? 'scale(1.2)' : ''}`,
          }}
          onMouseDown={e => handleMouseDown(e, 'start')}
        />
        <div
          className={styles['track-between']}
          style={{
            left: `${((startValue - minValue) / (maxValue - minValue)) * 100}%`,
            right: `${100 - ((endValue - minValue) / (maxValue - minValue)) * 100}%`,
          }}
        />
        <div
          className={styles.handle}
          data-testid="end-handle"
          style={{
            left: `${((endValue - minValue) / (maxValue - minValue)) * 100}%`,
            cursor: isDragging ? 'grabbing' : 'grab',
            transform: `translate(-50%, -50%) ${selectedHandle === 'end' ? 'scale(1.2)' : ''}`,
          }}
          onMouseDown={e => handleMouseDown(e, 'end')}
        />
      </div>
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
    </div>
  );
};

export default Range;
