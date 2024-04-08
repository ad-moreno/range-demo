import {stringifyValue} from '../../utils/parsing';
import React, {useState, useRef, CSSProperties, useEffect, useCallback} from 'react';
import styled from 'styled-components';
import {z} from 'zod';

const Container = styled.div<{disabled?: boolean}>`
  cursor: ${({disabled}) => (disabled ? 'unset' : 'pointer')};
  padding: 0 1.5rem;
  display: flex;
  flex-direction: row;
  gap: 0.4rem;
  width: fit-content;
  flex-wrap: nowrap;
  width: fit-content;
`;

const StyledInput = styled.input`
  border: none;
  border-bottom: 1px solid black;
  padding: 0 5px;
  outline: none;
  text-align: end;
`;

type Props = {
  currency?: string;
  value: number;
  min?: number;
  max?: number;
  disabled?: boolean;
  onChange: (value: number) => void;
  containerStyle?: CSSProperties;
  style?: CSSProperties;
};

const EditablePriceLabel = ({
  currency = '€',
  value,
  min = 0,
  max = Infinity,
  disabled,
  onChange,
  containerStyle,
  style,
}: Props) => {
  const initialValue = stringifyValue(value);
  const [isEditing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateInput = useCallback((s: string) => z.coerce.number().gte(min).lte(max).safeParse(s), [min, max]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value);

  const handleBlur = () => setEditing(false);

  const handleClick = () => {
    setEditing(true);
    setInputValue(initialValue);
    // Move the cursor to the end of the text in the input
    if (inputRef.current) {
      const length = inputRef.current.value.length;
      inputRef.current.focus();
      inputRef.current.setSelectionRange(length, length);
    }
  };

  useEffect(() => setInputValue(initialValue), [initialValue]);

  useEffect(() => {
    // Update the parent component's value if the input is valid
    const result = validateInput(inputValue);
    if (result.success) onChange(result.data);
  }, [inputValue, onChange, validateInput]);

  return (
    <Container onClick={disabled ? undefined : handleClick} disabled={disabled} style={containerStyle}>
      {isEditing ? (
        <StyledInput
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoFocus
          style={style}
        />
      ) : (
        <div style={{textAlign: 'end', ...style}}>{value}</div>
      )}
      <div>{currency}</div>
    </Container>
  );
};

export default EditablePriceLabel;
