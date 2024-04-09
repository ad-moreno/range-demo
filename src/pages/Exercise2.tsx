import DataRange from '../components/DataRange';
import {useFixedRangeData} from '../content/hooks';

const Exercise2 = () => {
  const fixedRangeDataQuery = useFixedRangeData();
  return <DataRange title="Fixed Range" query={fixedRangeDataQuery} />;
};

export default Exercise2;
