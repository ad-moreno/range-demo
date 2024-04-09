import {useNormalRangeData} from '../content/hooks';
import DataRange from '../components/DataRange';

const Exercise1 = () => {
  const normalRangeDataQuery = useNormalRangeData();
  return <DataRange title="Normal Range" query={normalRangeDataQuery} />;
};

export default Exercise1;
