import styled from 'styled-components';
import Range, {RangeMinMaxProps, RangeValuesProps} from '../Range';
import {ComponentProps, useEffect} from 'react';
import {UseQueryResult} from '@tanstack/react-query';

const RangeContainer = styled.div`
  display: flex;
  flex-direction: column;
  column-gap: 1rem;
  justify-content: start;
  align-items: start;
  width: 40rem;
`;

const Error = styled.div`
  background-color: #e9d8d8;
  color: black;
  border: 1px solid #9f2020;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
`;

type Props = ComponentProps<'div'> & {
  title: string;
  query: UseQueryResult<RangeMinMaxProps | RangeValuesProps>;
};

const DataRange = ({title, query, ...props}: Props) => {
  useEffect(() => {
    if (query.isError) console.error(query.error);
  }, [query.error, query.isError]);

  return (
    <div {...props}>
      {query.isSuccess && (
        <RangeContainer>
          <div>{title}</div>
          <Range {...query.data} />
        </RangeContainer>
      )}
      {query.isError && <Error>{`${query.error.name}: ${query.error.message}`}</Error>}
    </div>
  );
};

export default DataRange;
