'use client';

import classNames from 'classnames';
import {stringifyValue} from '../../utils/parsing';
import React, {useState, useRef, type CSSProperties, useEffect, useCallback, type ComponentProps} from 'react';
import {z} from 'zod';

import styles from './styles.module.css';

type Props = Omit<ComponentProps<'div'>, 'onChange'> & {
  currency?: string;
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  containerStyle?: CSSProperties;
};

/**
 * A custom component that displays a price label with an editable input.
 * @param currency The currency symbol to use for the price label. Defaults to '€'.
 * @param value The initial value of the price label.
 * @param min The minimum allowed value for the price label. Defaults to 0.
 * @param max The maximum allowed value for the price label. Defaults to Infinity.
 * @param disabled Whether the price label should be editable or not. Defaults to false.
 * @param onChange A function that will be called when the user updates the price label.
 * @param containerStyle Optional styles for the container element.
 * @param style Optional styles for the input element.
 */
const EditablePriceLabel = ({
  className,
  currency = '€',
  value,
  min = 0,
  max = Infinity,
  disabled,
  onChange,
  containerStyle,
  style,
  ...props
}: Props) => {
  const initialValue = stringifyValue(value);
  const [isEditing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateInput = useCallback((s: string) => z.coerce.number().gte(min).lte(max).safeParse(s), [min, max]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleBlur = () => {
    setEditing(false);
    setInputValue(initialValue);
  };

  const handleFocus = () => {
    if (!disabled) {
      setEditing(true);
      setInputValue(initialValue);
    }
  };

  useEffect(() => setInputValue(initialValue), [initialValue]);

  useEffect(() => {
    // Update the parent component's value if the input is valid
    const result = validateInput(inputValue);
    if (result.success && onChange) onChange(result.data);
  }, [inputValue, onChange, validateInput]);

  return (
    <div
      className={classNames(styles.container, className)}
      style={{cursor: disabled ? 'unset' : isEditing ? 'text' : 'pointer', ...containerStyle}}
      data-testid="price-container"
      {...props}
    >
      <input
        className={styles.input}
        ref={inputRef}
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{borderBottom: isEditing ? '1px solid black' : undefined, ...style}}
        data-testid="price-input"
        disabled={disabled}
      />
      <div className={styles.currency}>{currency}</div>
    </div>
  );
};

export default EditablePriceLabel;
