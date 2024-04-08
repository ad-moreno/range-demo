import styled from 'styled-components';
import Range, {RangeMinMaxProps, RangeValuesProps} from '../components/Range';
import {useFixedRangeData, useNormalRangeData} from '../content/hooks';
import {useEffect} from 'react';
import {UseQueryResult} from '@tanstack/react-query';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 2rem;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 5rem;
`;

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

type DataRangeProps = {
  title: string;
  query: UseQueryResult<RangeMinMaxProps | RangeValuesProps>;
};

const DataRange = ({title, query}: DataRangeProps) => {
  useEffect(() => {
    if (query.isError) console.error(query.error);
  }, [query.error, query.isError]);

  return (
    <>
      {query.isSuccess && (
        <RangeContainer>
          <div>{title}</div>
          <Range {...query.data} />
        </RangeContainer>
      )}
      {query.isError && <Error>{`${query.error.name}: ${query.error.message}`}</Error>}
    </>
  );
};

const Home = () => {
  const normalRangeDataQuery = useNormalRangeData();
  const fixedRangeDataQuery = useFixedRangeData();

  return (
    <Container>
      <DataRange title="Normal Range" query={normalRangeDataQuery} />
      <DataRange title="Fixed Range" query={fixedRangeDataQuery} />
    </Container>
  );
};

export default Home;
